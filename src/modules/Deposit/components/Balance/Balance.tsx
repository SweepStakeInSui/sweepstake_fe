'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import Flex from '@/components/common/Flex';
import { FormatNumber } from '@/components/common/FormatNumber';
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
import { Separator } from '@/components/ui/separator';
import type { ProfileTypes } from '@/types/profile';

const Balance = () => {
  const queryClient = useQueryClient();
  const profile = queryClient.getQueryData<ProfileTypes>(['user-infor']);
  const formSchema = z.object({
    amount: z.coerce
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .gte(0, { message: 'Amount must be greater than 0' }),
    address: z
      .string({
        required_error: 'Address is required',
      })
      .refine((address) => isValidSuiAddress(address), {
        message: 'Invalid Sui address',
      }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success(values.amount);
  }
  return (
    <div className="py-5 sticky top-16">
      <div className="px-5 pb-4 pt-5 bg-dyb-5 rounded-lg w-[283px]">
        <Flex className="gap-x-1">
          <Typography.Text className="text-text-subtle" size={13}>
            Balance
          </Typography.Text>
          <Svg src="/icons/refresh.svg" />
        </Flex>
        <Typography.Heading
          size={28}
          weight="semibold"
          className="flex mb-5 mt-2"
        >
          $<FormatNumber number={profile?.volume || 0} />
        </Typography.Heading>

        <Dialog>
          <DialogTrigger className="w-full" asChild>
            <div className="w-full">
              <Button variant="secondary" className="w-full" size="medium">
                <Typography.Text className="text-text-inverse">
                  Withdraw
                </Typography.Text>
              </Button>
            </div>
          </DialogTrigger>
          <DialogContent className="w-[500px]" hideCloseButton>
            <DialogHeader>
              <DialogTitle>Withdraw USDT (Sui)</DialogTitle>
              <DialogDescription>
                Please input USDT amount and address to withdraw.
              </DialogDescription>
              <div className="pt-4">
                <Flex className="p-3 bg-b-5 rounded-sm">
                  <Svg src="/icons/info.svg" />
                  <Typography.Text className="text-text-support-blue" size={15}>
                    Only send to a USDT address on Sui network.
                  </Typography.Text>
                </Flex>
              </div>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 mt-5"
              >
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
                            Available: 124,000.00 USDT
                          </Typography.Text>
                          <Typography.Text
                            size={13}
                            className="text-text-support-blue cursor-pointer"
                            weight="semibold"
                          >
                            Max
                          </Typography.Text>
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
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-text-subtle">
                        Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Input address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Separator />

                <DialogFooter className="bg-dyb-0">
                  <DialogClose asChild>
                    <Button type="button" variant="terriary" size="lg">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Withdraw</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Balance;