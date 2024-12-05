'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import type { z } from 'zod';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import Stack from '@/components/common/Stack';
import { StatusModal } from '@/components/common/StatusModal';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tooltip } from '@/components/ui/tooltip';
import { UserService } from '@/services/userService';
import { selectProfile } from '@/store/profileSlice';
import { handleBignumber } from '@/utils/handleBignumber';

import type { ActionProps } from '../Action/Action';
import { createWithdrawSchema } from './schema/withdrawSchema';

const withdrawOptions = [
  {
    title: 'To connected wallet',
    values: 'connected_wallet',
  },
  {
    title: 'To address',
    values: 'address',
  },
];
const PortfolioDeposit: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const queryClient = useQueryClient();
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    withdrawOptions[0].values,
  );
  const [confirmWithdrawModalOpen, setConfirmWithdrawModalOpen] =
    useState(false);
  // const [txsString, setTxsString] = React.useState('');
  const { profile } = useSelector(selectProfile);
  const withdrawSchema = createWithdrawSchema(
    +handleBignumber.divideDecimal(profile?.balance),
  );
  const form = useForm<z.infer<typeof withdrawSchema>>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: '',
      address: selectedOption === 'connected_wallet' ? profile.address : '',
    },
  });
  const {
    mutate: withdrawMutation,
    isPending: isWithdrawLoading,
    isSuccess: isWithdrawSuccess,
    isError: isWithdrawError,
    data: withdrawData,
  } = useMutation({
    mutationFn: (data: any) => UserService.withdraw(data),
    onSuccess: () => {
      // setTxsString('fakeTXSString');
      setWithdrawModalOpen(false);
      queryClient.refetchQueries({
        queryKey: [
          ['useBalance', profile?.address],
          ['user-infor'],
          ['transaction-history', ''],
        ],
      });
      form.reset();
    },
  });
  async function onWithdraw(values: z.infer<typeof withdrawSchema>) {
    setConfirmWithdrawModalOpen(true);
    withdrawMutation({
      amount: handleBignumber.powDecimal(values.amount, 9),
      address: values.address,
    });
  }
  const { isValid } = form.formState;

  return (
    <div className="px-5 pb-4 pt-5 bg-bg-sublest rounded-lg w-full lg:w-[283px] border border-borderSubtle">
      <Flex className="justify-between">
        <Flex className="gap-x-1">
          <Typography.Text className="text-text-subtle" size={13}>
            Portfolio
          </Typography.Text>
          <Tooltip content="Refresh balance">
            <button
              className="cursor-pointer"
              onClick={() =>
                queryClient.refetchQueries({
                  queryKey: [['useBalance', profile?.address], ['user-infor']],
                })
              }
            >
              <Svg src="/icons/refresh.svg" />
            </button>
          </Tooltip>
        </Flex>
        <button onClick={handleNextSlide}>
          <Svg
            src="/icons/swap_vert.svg"
            width={24}
            height={24}
            className="text-[#666666]"
          />
        </button>
      </Flex>
      <Typography.Heading
        size={28}
        weight="semibold"
        className="flex mb-5 mt-2"
      >
        $
        <FormatNumber
          number={handleBignumber.divideDecimal(profile.balance) || 0}
        />
      </Typography.Heading>
      <Dialog open={withdrawModalOpen} onOpenChange={setWithdrawModalOpen}>
        <DialogTrigger className="w-full" asChild>
          <div className="w-full">
            <Button variant="secondary" className="w-full" size="medium">
              <Typography.Text className="text-text-inverse">
                Withdraw
              </Typography.Text>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[500px] gap-0" hideCloseButton>
          <DialogHeader>
            <DialogTitle>Withdraw USDT (Sui)</DialogTitle>
            <DialogDescription>
              Input withdraw options and USDT amount
            </DialogDescription>
          </DialogHeader>
          {selectedOption !== 'connected_wallet' && (
            <Flex className="p-3 bg-b-5 rounded-sm">
              <Svg src="/icons/info.svg" />
              <Typography.Text className="text-text-support-blue" size={15}>
                Only send to a USDT address on Sui network.
              </Typography.Text>
            </Flex>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onWithdraw)}
              className="space-y-2"
            >
              <Stack className="p-4 lg:px-6 lg:py-3 gap-y-5">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-subtle">
                        Withdraw Option
                      </FormLabel>
                      <Select
                        value={selectedOption}
                        onValueChange={(value) => setSelectedOption(value)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {withdrawOptions.map((option) => (
                              <SelectItem
                                key={option.values}
                                value={option.values}
                              >
                                {option.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormControl>
                        <Input
                          type="text"
                          disabled={selectedOption === 'connected_wallet'}
                          placeholder={`${selectedOption === 'connected_wallet' ? profile.address : 'Input address'}`}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <Flex className="justify-between">
                        <FormLabel className="text-text-subtle">
                          Amount
                        </FormLabel>
                        <Flex>
                          <Typography.Text
                            size={13}
                            className="text-text-subtle"
                          >
                            Available:{' '}
                            {handleBignumber.divideDecimal(profile.balance)}{' '}
                            USDT
                          </Typography.Text>
                          <button
                            type="button"
                            onClick={() => {
                              form.setValue(
                                'amount',
                                handleBignumber.divideDecimal(profile.balance),
                                {
                                  shouldValidate: true,
                                },
                              );
                            }}
                          >
                            <Typography.Text
                              size={13}
                              className="text-text-support-blue cursor-pointer"
                              weight="semibold"
                            >
                              Max
                            </Typography.Text>
                          </button>
                        </Flex>
                      </Flex>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="number"
                            placeholder="Input amount"
                            {...field}
                          />
                          <Typography.Text className="text-text-sublest absolute top-1/2 right-4 -translate-y-1/2">
                            USDT
                          </Typography.Text>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Stack>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="terriary" size="lg">
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={!isValid} type="submit">
                  Withdraw
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <StatusModal
        open={confirmWithdrawModalOpen}
        onOpenChange={setConfirmWithdrawModalOpen}
        isLoading={isWithdrawLoading}
        title={(() => {
          if (isWithdrawLoading) return 'Your Withdrawal Is Being Processed';
          if (isWithdrawSuccess && withdrawData.statusCode === 200)
            return 'Withdrawal Successful';
          if (isWithdrawError) return 'Withdrawal Failed';
          return '';
        })()}
        message={(() => {
          if (isWithdrawLoading)
            return 'Your withdrawal is currently being processed.';
          if (isWithdrawSuccess && withdrawData.statusCode === 200)
            return 'Your withdrawal has been successfully processed.';
          if (isWithdrawError)
            return 'There was an error processing your withdrawal.';
          return '';
        })()}
        // txs={txsString}
        isSuccess={isWithdrawSuccess && withdrawData.statusCode === 200}
        isError={isWithdrawError}
      />
    </div>
  );
};

export default PortfolioDeposit;
