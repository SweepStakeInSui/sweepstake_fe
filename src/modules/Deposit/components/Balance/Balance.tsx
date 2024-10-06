'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useSignTransaction } from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
import { StatusModal } from '@/components/common/StatusModal';
import Svg from '@/components/common/Svg';
import Typography from '@/components/common/Typography';
import { useWallet } from '@/components/connectWallet/useWallet';
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
import { Separator } from '@/components/ui/separator';
import { Tooltip } from '@/components/ui/tooltip';
import configs from '@/configs';
import { ConnectionType } from '@/enums/ConnectionType';
import useBalance from '@/hooks/useBalance';
import { UserService } from '@/services/userService';
import type { ProfileTypes } from '@/types/profile';
import { handleBignumber } from '@/utils/handleBignumber';
import SuiRPC from '@/utils/SuiRPC';

import type { ActionProps } from '../Action/Action';
import { createRequestDepositSchema } from './schema/requestDepositSchema';

const Balance: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const balance = useBalance();
  const { walletType, provider } = useWallet();
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<ProfileTypes>(['user-infor']);
  const [depositModalOpen, setDepositModalOpen] = useState(false);
  const [txsString, setTxsString] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'fail'>('idle');
  const [confirmDepositModalOpen, setConfirmDepositModalOpen] = useState(false);
  const { mutateAsync: signTransaction } = useSignTransaction();
  const options = [
    {
      title: 'Your Wallet',
    },
    {
      title: 'Portfolio',
    },
  ];
  const requestDepositSchema = createRequestDepositSchema(balance!);
  const form = useForm<z.infer<typeof requestDepositSchema>>({
    resolver: zodResolver(requestDepositSchema),
    defaultValues: {
      amount: '',
    },
  });
  const {
    mutate: depositMutation,
    isPending: isDepositLoading,
    isSuccess: isDepositSuccess,
    isError: isDepositError,
    data: depositData,
  } = useMutation({
    mutationFn: async (values: { amount: string }) => {
      try {
        // Prepare the deposit request
        const dataRequest = await UserService.requestDeposit({
          amount: handleBignumber.powDecimal(values.amount),
        });

        let bytes: string;
        let signature: string;

        // Determine wallet type and sign transaction accordingly
        if (walletType === ConnectionType.SuiWallet) {
          const tx = Transaction.from(dataRequest.data.txBytes);
          // Sign the transaction
          const signedTransaction = await signTransaction({
            transaction: tx,
            chain: configs.chain,
          });
          bytes = signedTransaction.bytes;
          signature = signedTransaction.signature;
        } else if (provider) {
          const rpc = new SuiRPC(provider);
          const signedTransaction = await rpc.requestDeposit(
            dataRequest.data.txBytes,
          );
          bytes = signedTransaction.bytes;
          signature = signedTransaction.signature;
        } else {
          throw new Error('Provider is not available');
        }
        // Execute deposit with the signed transaction
        const dataDeposit = await UserService.deposit({
          txBytes: bytes,
          signature: [dataRequest.data.signature, signature],
        });

        return dataDeposit; // Return final deposit data
      } catch (error) {
        console.error('Error during deposit:', error);
        throw error; // Propagate error for handling in onError
      }
    },
    onSuccess: (data) => {
      setStatus('success');
      setTxsString('fakeTXSString');
      setDepositModalOpen(false);
      queryClient.refetchQueries({
        queryKey: [['useBalance', profile?.address], ['user-infor']],
      });
      console.log('Deposit successful:', data);
    },
    onError: (error) => {
      setStatus('fail');
      console.error('Deposit failed:', error);
    },
  });
  async function onDeposit(values: z.infer<typeof requestDepositSchema>) {
    setConfirmDepositModalOpen(true);
    depositMutation(values);
  }
  const { isValid } = form.formState;
  console.log({
    balance,
    profile,
  });

  return (
    <div className="px-5 pb-4 pt-5 bg-dyb-5 rounded-lg w-[283px] border border-borderSubtle">
      <Flex className="justify-between">
        <Flex className="gap-x-1">
          <Typography.Text className="text-text-subtle" size={13}>
            Wallet balance
          </Typography.Text>
          <Tooltip content="Refresh balance">
            <div className="cursor-pointer">
              <Svg src="/icons/refresh.svg" />
            </div>
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
        $<FormatNumber number={balance || 0} />
      </Typography.Heading>

      <Dialog open={depositModalOpen} onOpenChange={setDepositModalOpen}>
        <DialogTrigger className="w-full mt-4" asChild>
          <div className="w-full">
            <Button variant="secondary" className="w-full" size="medium">
              <Typography.Text className="text-text-inverse">
                Transfer
              </Typography.Text>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[500px] " hideCloseButton>
          <DialogHeader>
            <DialogTitle>Transfer USDT (Sui)</DialogTitle>
            <DialogDescription>
              Transfer USDT between portfolio and your wallet
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onDeposit)} className="space-y-2">
              <div className="p-4 lg:px-6 lg:py-3">
                <div className="rounded-md border border-borderSubtle overflow-hidden relative">
                  {options.map((option, index) => (
                    <Fragment key={option.title}>
                      <Flex className="p-4 bg-dyb-0 gap-x-4" key={option.title}>
                        <Typography.Text
                          size={13}
                          className="text-text-sublest font-normal w-8"
                        >
                          {index === 0 ? 'From' : 'To'}
                        </Typography.Text>
                        <Typography.Text size={13} className="text-text">
                          {option.title}
                        </Typography.Text>
                      </Flex>
                      {options.length - 1 > index && <Separator />}
                    </Fragment>
                  ))}
                  <div className="rounded-full border border-borderSubtle bg-bg-surface size-8 flex items-center justify-center absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                    <Svg
                      src="/icons/arrow_downward.svg"
                      className="fill-black"
                    />
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <Flex className="justify-between mt-7">
                        <FormLabel className="text-text-subtle">
                          Amount
                        </FormLabel>
                        <Flex>
                          <Typography.Text
                            size={13}
                            className="text-text-subtle"
                          >
                            Available: {balance} USDT
                          </Typography.Text>
                          <button
                            onClick={() => {
                              form.setValue('amount', balance?.toString()!, {
                                shouldValidate: true,
                              });
                            }}
                            type="button"
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
              </div>
              <DialogFooter className="bg-dyb-0">
                <DialogClose asChild>
                  <Button type="button" variant="terriary" size="lg">
                    Cancel
                  </Button>
                </DialogClose>
                <Button disabled={!isValid} type="submit">
                  Transfer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <StatusModal
        open={confirmDepositModalOpen}
        onOpenChange={setConfirmDepositModalOpen}
        isLoading={isDepositLoading}
        status={status}
        title={(() => {
          if (isDepositLoading) return 'Your Deposit Is Being Processed';
          if (isDepositSuccess && depositData.statusCode === 200)
            return 'Deposit Successful';
          if (isDepositError) return 'Deposit Failed';
          return '';
        })()}
        message={(() => {
          if (isDepositLoading)
            return 'Your deposit is currently being processed.';
          if (isDepositSuccess && depositData.statusCode === 200)
            return 'Your deposit has been successfully processed.';
          if (isDepositError)
            return 'There was an error processing your deposit.';
          return '';
        })()}
        txs={txsString}
      />
    </div>
  );
};
export default Balance;
