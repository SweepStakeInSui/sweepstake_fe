import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { z } from 'zod';

import { DatePicker } from '@/components/common/DatePicker';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { StatusModal } from '@/components/common/StatusModal';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { UpDownButton } from '@/components/common/UpDownButton';
import ConnectButton from '@/components/connectWallet/ConnectButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TimePicker } from '@/components/ui/time-picker';
import { Tooltip } from '@/components/ui/tooltip';
import {
  BetOutcomeType,
  EBetStatusOption,
  EOrderType,
} from '@/enums/bet-status';
import { postOrder } from '@/modules/MarketDetails/components/ActionForm/schema';
import type { TOrderBookResponse } from '@/services/markets/types';
import { OrderService } from '@/services/orders';
import type { IPostOrderRequest } from '@/services/orders/types';
import { UserService } from '@/services/userService';
import { setBet } from '@/store/betSlice';
import { selectOrderbook } from '@/store/orderbookSlice';
import { selectProfile } from '@/store/profileSlice';
import type { IPositionsData } from '@/types/table';
import { calculateAvgPrice } from '@/utils/calculateAvgPrice';
import { handleBignumber } from '@/utils/handleBignumber';

interface IBetActionProps {
  isBid: boolean;
  isLimit: boolean;
}

interface TooltipPriceProps {
  isBid: boolean;
}

const TooltipPrice = ({ isBid }: TooltipPriceProps) => {
  const betState = useSelector((state: any) => state.bet);

  return (
    <Stack className=" max-w-96">
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          What do the prices mean?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Prices reflect odds of&nbsp;
          <span className="text-text-support-match">
            {isBid
              ? handleBignumber.divideDecimal(betState.bidPriceYes)
              : handleBignumber.divideDecimal(betState.askPriceYes)}
            % Yes
          </span>
          &nbsp;and&nbsp;
          <span className="text-text-support-blue">
            {isBid
              ? handleBignumber.divideDecimal(betState.bidPriceNo)
              : handleBignumber.divideDecimal(betState.askPriceNo)}
            % No
          </span>
          . If you&#39;re right, the payout per contract is $1 (and if not, you
          get $0).
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          Why don&#39;t they add up to 100?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Slight offsets happen due to market uncertainty. Imagine buying
          lemonade at a stand. You offer $1, the highest you’d pay (bid). The
          seller sets their lowest price $1.20 (ask). The $0.20 gap leaves room
          for bargaining (spread).
        </Typography.Text>
      </div>
    </Stack>
  );
};

const BetAction = ({ isBid, isLimit }: IBetActionProps) => {
  const params = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const dataOrderbook = queryClient.getQueryData([
    'orderBookData',
    params.id,
  ]) as TOrderBookResponse;

  // HOOKS
  const { profile, isLoggedIn } = useSelector(selectProfile);
  const { price: limitPrice } = useSelector(selectOrderbook);
  const dispatch = useDispatch();

  // STATES
  const [placeOrderModalOpen, setPlaceOrderModalOpen] = useState(false);
  const [shares, setShares] = useState<number>(0);
  const [avgPrice, setAvgPrice] = useState<number>(0);
  // const [txsString, setTxsString] = React.useState('');
  const [isSetExpiration, setIsSetExpiration] = useState(false);
  const betState = useSelector((state: any) => state.bet);

  // QUERIES
  const {
    mutate: placeOrderMutate,
    isPending: isPlaceOrderLoading,
    isSuccess: isPlaceOrderSuccess,
    isError: isPlaceOrderError,
    data: placeOrderData,
  } = useMutation({
    mutationFn: (data: IPostOrderRequest) => OrderService.postOrder(data),
    // onSuccess: () => {
    //   setTxsString('fakeTXSString');
    // },
  });

  const { data: positionsData } = useQuery({
    queryKey: ['getPositions'],
    queryFn: async () => {
      const result: IPositionsData = await UserService.positions({
        page: 1,
        limit: 10,
      });
      return result;
    },
  });

  const askShareYes = useMemo(
    () =>
      positionsData?.items?.find(
        (pos) => pos.outcomeId === betState.outcomeYesId,
      )?.balance,
    [positionsData, betState.outcomeYesId],
  );

  const askShareNo = useMemo(
    () =>
      positionsData?.items?.find(
        (pos) => pos.outcomeId === betState.outcomeNoId,
      )?.balance,
    [positionsData, betState.outcomeNoId],
  );

  // FORM HANDLERS
  const postOrderSchema = postOrder(
    +handleBignumber.divideDecimal(profile?.balance),
    isLimit ? EOrderType.GTC : EOrderType.FOK,
    isBid,
    betState.type === BetOutcomeType.YES,
    Number(askShareYes),
    Number(askShareNo),
  );
  const {
    watch,
    formState,
    reset,
    resetField,
    setValue,
    register,
    handleSubmit,
  } = useForm<z.infer<typeof postOrderSchema>>({
    resolver: zodResolver(postOrderSchema),
    defaultValues: {
      outcomeId: '',
      amount: '0',
      price: '0',
      type: EOrderType.FOK,
      side: isBid ? EBetStatusOption.BID : EBetStatusOption.ASK,
      slippage: '0',
      signature: 'signature',
    },
    mode: 'onChange',
  });
  const { errors } = formState;
  const price = watch('price');
  const amount = watch('amount');
  const estCost = ((+amount * +price) / 100).toFixed(2);
  const payoutCost = Number(amount) - Number(estCost);
  const onSubmit = (data: z.infer<typeof postOrderSchema>) => {
    const orderData = {
      outcomeId:
        betState.type === BetOutcomeType.YES
          ? betState.outcomeYesId
          : betState.outcomeNoId,
      amount: isLimit ? amount : Math.floor(shares).toString(),
      ...(isLimit
        ? { price: handleBignumber.powDecimal(data.price, 4) }
        : { slippage: '1' }),
      type: isLimit ? EOrderType.GTC : EOrderType.FOK,
      side: isBid ? EBetStatusOption.BID : EBetStatusOption.ASK,
      signature: 'signature',
    };

    setPlaceOrderModalOpen(true);
    placeOrderMutate(orderData);
    reset();
  };

  // FUNCTIONS
  const handlePriceIncrement = () => {
    setValue('price', (Number(price) + 1).toString());
  };

  const handlePriceDecrement = () => {
    setValue('price', Math.max(0, Number(price) - 1).toString());
  };

  const handleAmountIncrement = () => {
    setValue('amount', (Number(amount) + 1).toString());
  };

  const handleAmountDecrement = () => {
    setValue('amount', Math.max(0, Number(amount) - 1).toString());
  };

  const onBetClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    betType: 'YES' | 'NO',
  ) => {
    event?.stopPropagation();
    resetField('price');
    resetField('amount');
    dispatch(
      setBet({
        ...betState,
        type: BetOutcomeType[betType],
        isBid,
      }),
    );
  };
  // const
  const bidPriceYes = Number(
    handleBignumber.divideDecimal(betState.bidPriceYes),
  );
  const askPriceYes = Number(
    handleBignumber.divideDecimal(betState.askPriceYes),
  );
  const bidPriceNo = Number(handleBignumber.divideDecimal(betState.bidPriceNo));
  const askPriceNo = Number(handleBignumber.divideDecimal(betState.askPriceNo));
  // EFFECTS

  useEffect(() => {
    if (limitPrice) {
      setValue('price', limitPrice.toString());
    }
  }, [limitPrice, setValue]);

  useEffect(() => {
    let contractPrice = 0; // Default to 0 if calculation is not possible
    let selectedPrice = 0;
    let averagePrice = 0;

    if (!dataOrderbook || !dataOrderbook.data) {
      return;
    }

    const { type: betType } = betState;
    const { bidYes, bidNo, askYes, askNo } = dataOrderbook.data;

    const calculatePrices = (
      isBidOrder: boolean,
      outcomeType: BetOutcomeType,
    ) => {
      if (isBidOrder) {
        if (outcomeType === BetOutcomeType.YES) {
          return {
            calcPrice: bidPriceYes,
            calcAvg: calculateAvgPrice(askYes, amount),
          };
        }
        return {
          calcPrice: bidPriceNo,
          calcAvg: calculateAvgPrice(askNo, amount),
        };
      }
      if (outcomeType === BetOutcomeType.YES) {
        return {
          calcPrice: askPriceYes,
          calcAvg: calculateAvgPrice(bidYes, amount),
        };
      }
      return {
        calcPrice: askPriceNo,
        calcAvg: calculateAvgPrice(bidNo, amount),
      };
    };

    const { calcPrice, calcAvg } = calculatePrices(isBid, betType);
    selectedPrice = calcPrice;
    averagePrice = calcAvg;

    // Calculate contract price only if selectedPrice is greater than zero
    if (selectedPrice > 0) {
      contractPrice = +amount / (+selectedPrice / 100);
    }

    setAvgPrice(averagePrice);
    setShares(contractPrice);
  }, [
    amount,
    bidPriceYes,
    bidPriceNo,
    askPriceYes,
    askPriceNo,
    isBid,
    betState.type,
    dataOrderbook,
  ]);

  return (
    <div>
      <Stack className="gap-0">
        <Stack className="mb-7">
          <Flex className="items-center">
            <Typography.Text size={13} className="text-text-subtle">
              Pick a side
            </Typography.Text>
            <Tooltip content={<TooltipPrice isBid={isBid} />} side="bottom">
              <div>
                <Svg src="/icons/info_outline.svg" />
              </div>
            </Tooltip>
          </Flex>
          <Flex>
            <Button
              className="w-full"
              variant={`bet_yes${betState.type === BetOutcomeType.YES ? '_active' : ''}`}
              onClick={(e) => onBetClick(e, 'YES')}
            >
              Yes {isBid ? bidPriceYes : askPriceYes}¢
            </Button>
            <Button
              variant={`bet_no${betState.type === BetOutcomeType.NO ? '_active' : ''}`}
              className="w-full"
              onClick={(e) => onBetClick(e, 'NO')}
            >
              No {isBid ? bidPriceNo : askPriceNo}¢
            </Button>
          </Flex>
        </Stack>

        {isLimit ? (
          <Stack className="gap-y-7">
            <Stack>
              <UpDownButton
                label="Limit Price"
                placeholder="0"
                name="price"
                register={register}
                onIncrement={handlePriceIncrement}
                onDecrement={handlePriceDecrement}
                isError={!isLoggedIn || !!errors.price}
                prefix="$"
              />
              {!isLoggedIn && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  Connect your wallet to place an order
                </Typography.Text>
              )}
              {isLoggedIn && errors.price && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  {errors.price.message}
                </Typography.Text>
              )}
            </Stack>

            <Stack>
              <UpDownButton
                label="Shares"
                placeholder="0"
                name="amount"
                register={register}
                onIncrement={handleAmountIncrement}
                onDecrement={handleAmountDecrement}
                isError={!isLoggedIn || !!errors.amount}
              />
              {!isLoggedIn && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  Connect your wallet to place an order
                </Typography.Text>
              )}

              {isLoggedIn && errors.amount && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  {errors.amount.message}
                </Typography.Text>
              )}
            </Stack>

            <Flex>
              <Checkbox
                id="expiration"
                aria-labelledby="expiration-label"
                onClick={() => setIsSetExpiration(!isSetExpiration)}
              />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                id="expiration-label"
                htmlFor="expiration"
                className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <Typography.Text size={15}>Set Expiration</Typography.Text>
              </label>
            </Flex>

            {isSetExpiration && (
              <Stack>
                <Select>
                  <SelectTrigger className="rounded-md border border-field-border bg-field-background h-[3.375rem]">
                    <SelectValue placeholder="End of day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="End of day">End of day</SelectItem>
                      <SelectItem value="End of day">End of day</SelectItem>
                      <SelectItem value="End of day">End of day</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <DatePicker />
                  </div>
                  <div className="col-span-1">
                    <TimePicker />
                  </div>
                </div>
              </Stack>
            )}

            <Stack className="gap-3">
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Estimated Cost
                  <Tooltip content={<p>Includes a fee of $0</p>}>
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Typography.Text size={13}>${estCost}</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Payout if
                  <span
                    className={`${betState.type === BetOutcomeType.YES ? 'text-btn-betYes-shadow' : 'text-btn-betNo-shadow'}`}
                  >
                    {betState.type}
                  </span>
                  wins
                  <Tooltip
                    content="This market closes when the outcome occurs.
Projected payout 2 hours after closing."
                  >
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Flex className="gap-x-0.5">
                  <Typography.Text size={13}>${amount}</Typography.Text>
                  {Number(amount) !== 0 && (
                    <Typography.Text
                      size={13}
                      className="text-text-support-green"
                    >
                      (+${payoutCost})
                    </Typography.Text>
                  )}
                </Flex>
              </Flex>
            </Stack>

            {isLoggedIn ? (
              <Button
                size="lg"
                className="w-full gap-1"
                onClick={handleSubmit(onSubmit)}
              >
                Place bet
              </Button>
            ) : (
              <ConnectButton
                hasIcon={false}
                content="Get Access"
                className="w-full"
              />
            )}
          </Stack>
        ) : (
          <Stack className="gap-y-7">
            <Stack>
              <UpDownButton
                label="Amount"
                placeholder="0"
                name="amount"
                register={register}
                onIncrement={handleAmountIncrement}
                onDecrement={handleAmountDecrement}
                isError={!isLoggedIn || !!errors.amount}
                prefix="$"
              />
              {!isLoggedIn && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  Connect your wallet to place an order
                </Typography.Text>
              )}

              {isLoggedIn && errors.amount && (
                <Typography.Text
                  size={13}
                  className="text-text-support-red"
                  weight="medium"
                >
                  {errors.amount.message}
                </Typography.Text>
              )}
            </Stack>

            <Stack className="gap-3">
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Shares
                </Typography.Text>
                <Typography.Text size={13}>
                  {Math.floor(shares)}
                </Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Average Price
                </Typography.Text>
                <Typography.Text size={13}>${avgPrice}</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Payout if
                  <span
                    className={`${betState.type === BetOutcomeType.YES ? 'text-btn-betYes-shadow' : 'text-btn-betNo-shadow'}`}
                  >
                    {betState.type}
                  </span>
                  wins
                  <Tooltip content="This market closes when the outcome occurs">
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Flex className="gap-x-0.5">
                  <Typography.Text size={13}>
                    ${Math.floor(shares)}
                  </Typography.Text>
                  <Typography.Text
                    size={13}
                    className="text-text-support-green"
                  >
                    (+${(shares === 0 ? 0 : shares - +amount).toFixed(2)})
                  </Typography.Text>
                </Flex>
              </Flex>
            </Stack>

            {isLoggedIn ? (
              <Button
                size="lg"
                className="w-full gap-1"
                onClick={handleSubmit(onSubmit)}
              >
                Place bet
              </Button>
            ) : (
              <ConnectButton
                hasIcon={false}
                content="Get Access"
                className="w-full"
              />
            )}
          </Stack>
        )}
      </Stack>
      <StatusModal
        open={placeOrderModalOpen}
        onOpenChange={setPlaceOrderModalOpen}
        isLoading={isPlaceOrderLoading}
        isSuccess={isPlaceOrderSuccess && placeOrderData.statusCode === 200}
        isError={isPlaceOrderError}
        title={(() => {
          if (isPlaceOrderLoading) return 'Executing...';
          if (isPlaceOrderSuccess && placeOrderData.statusCode === 200)
            return 'Success';
          if (isPlaceOrderError) return 'Fail';
          return '';
        })()}
        message={(() => {
          if (isPlaceOrderLoading) return 'Your order is being executed.';
          if (isPlaceOrderSuccess && placeOrderData.statusCode === 200)
            return 'Execute order successfully.';
          if (isPlaceOrderError) return 'Something went wrong.';
          return '';
        })()}
        // txs={txsString}
      />
    </div>
  );
};

export default BetAction;
