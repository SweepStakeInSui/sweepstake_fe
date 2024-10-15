import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
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
import { postOrder } from '@/modules/MarketDetails/components/ActionForm/shema';
import { orderService } from '@/services/orders';
import type { IPostOrderRequest } from '@/services/orders/types';
import { setBet } from '@/store/betSlice';
import { selectProfile } from '@/store/profileSlice';

interface ISellActionProps {
  isLimit: boolean;
}
const TooltipPrice = () => {
  return (
    <Stack className=" max-w-96">
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          What do the prices mean?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Prices reflect odds of&nbsp;
          <span className="text-text-support-match">72% Yes</span>
          &nbsp;and&nbsp;
          <span className="text-text-support-blue">29% No</span>. If you&#39;re
          right, the payout per contract is $1 (and if not, you get $0).
        </Typography.Text>
      </div>
      <div>
        <Typography.Text className="!text-[#EBEBEB]" size={15}>
          Why don&#39;t they add up to 100?
        </Typography.Text>
        <Typography.Text size={13} className="text-text-subtle">
          Slight offsets happen due to market uncertainty. Imagine selling
          lemonade at a stand. You offer $1, the highest you’d pay (ask). The
          seller sets their lowest price $1.20 (ask). The $0.20 gap leaves room
          for bargaining (spread).
        </Typography.Text>
      </div>
    </Stack>
  );
};

const SellAction = ({ isLimit }: ISellActionProps) => {
  const { profile } = useSelector(selectProfile);
  const dispatch = useDispatch();

  // STATES
  const [placeOrderModalOpen, setPlaceOrderModalOpen] = useState(false);
  const [txsString, setTxsString] = React.useState('');
  const [isSetExpiration, setIsSetExpiration] = useState(false);
  const { id, outcomeYesId, outcomeNoId, type, askPriceNo, askPriceYes } =
    useSelector((state: any) => state.bet);

  const {
    mutate: placeOrderMutation,
    isPending: isPlaceOrderLoading,
    isSuccess: isPlaceOrderSuccess,
    isError: isPlaceOrderError,
    data: placeOrderData,
  } = useMutation({
    mutationFn: (data: IPostOrderRequest) => orderService.postOrder(data),
    onSuccess: () => {
      setTxsString('fakeTXSString');
    },
  });

  // FORM HANDLERS
  const { watch, formState, setValue, register, handleSubmit } = useForm<
    z.infer<typeof postOrder>
  >({
    resolver: zodResolver(postOrder),
    defaultValues: {
      outcomeId: '',
      amount: '0',
      price: '0',
      type: EOrderType.FOK,
      side: EBetStatusOption.ASK,
      slippage: '0',
      signature: 'signature',
    },
  });
  const { errors } = formState;
  const price = watch('price');
  const amount = watch('amount');

  const onSubmit = (data: z.infer<typeof postOrder>) => {
    const orderData = {
      outcomeId: type === BetOutcomeType.YES ? outcomeYesId : outcomeNoId,
      amount: data.amount.toString(),
      price: isLimit ? '0' : data.price.toString(),
      type: isLimit ? EOrderType.GTC : EOrderType.FOK,
      side: EBetStatusOption.ASK,
      slippage: '0',
      signature: 'signature',
    };

    setPlaceOrderModalOpen(true);
    placeOrderMutation(orderData);
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
    dispatch(
      setBet({
        id,
        outcomeYesId,
        outcomeNoId,
        type: BetOutcomeType[betType],
        isBid: false,
        askPriceNo,
        askPriceYes,
      }),
    );
  };

  return (
    <div>
      <Stack className="gap-0">
        <Stack className="mb-7">
          <Flex className="items-center">
            <Typography.Text size={13} className="text-text-subtle">
              Pick a side
            </Typography.Text>
            <Tooltip content={<TooltipPrice />} side="bottom">
              <div>
                <Svg src="/icons/info_outline.svg" />
              </div>
            </Tooltip>
          </Flex>
          <Flex>
            <Button
              className="w-full"
              variant={`bet_yes${type === BetOutcomeType.YES ? '_active' : ''}`}
              onClick={(e) => onBetClick(e, 'YES')}
            >
              Yes {askPriceYes}
            </Button>
            <Button
              variant={`bet_no${type === BetOutcomeType.NO ? '_active' : ''}`}
              className="w-full"
              onClick={(e) => onBetClick(e, 'NO')}
            >
              No {askPriceNo}
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
              />
              {errors.price && (
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
                label="Amount"
                placeholder="0"
                name="amount"
                register={register}
                onIncrement={handleAmountIncrement}
                onDecrement={handleAmountDecrement}
              />
              {errors.amount && (
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
                <Typography.Text size={13}>$100</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Payout if Yes wins
                  <Tooltip
                    content="This market closes when the outcome occurs.
Projected payout 2 hours after closing."
                  >
                    <span>
                      <Svg src="/icons/info_outline.svg" />
                    </span>
                  </Tooltip>
                </Typography.Text>
                <Typography.Text size={13}>$0</Typography.Text>
              </Flex>
            </Stack>

            {profile?.address ? (
              <Button
                size="lg"
                className="w-full gap-1"
                onClick={handleSubmit(onSubmit)}
              >
                <Svg src="/icons/add_circle.svg" className="!text-white" />
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
              />
              {errors.amount && (
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
                  Contract
                </Typography.Text>
                <Typography.Text size={13}>$0</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Average Price
                  <span>
                    <Svg src="/icons/info_outline.svg" />
                  </span>
                </Typography.Text>
                <Typography.Text size={13}>$100</Typography.Text>
              </Flex>
              <Flex className="justify-between">
                <Typography.Text
                  size={13}
                  className="inline-flex items-center gap-1 text-text-subtle"
                >
                  Payout if Yes wins
                  <span>
                    <Svg src="/icons/info_outline.svg" />
                  </span>
                </Typography.Text>
                <Typography.Text size={13}>$0</Typography.Text>
              </Flex>
            </Stack>

            {profile?.address ? (
              <Button
                size="lg"
                className="w-full gap-1"
                onClick={handleSubmit(onSubmit)}
              >
                <Svg src="/icons/add_circle.svg" className="!text-white" />
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
        isSuccess={isPlaceOrderSuccess}
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
        txs={txsString}
      />
    </div>
  );
};

export default SellAction;
