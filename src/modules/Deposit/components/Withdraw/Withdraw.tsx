'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { isValidSuiAddress } from '@mysten/sui.js/utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { z } from 'zod';

import Flex from '@/components/common/Flex';
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
import { Separator } from '@/components/ui/separator';
import { selectProfile } from '@/store/profileSlice';

const withdrawOptions = [
  {
    title: 'To connected wallet',
    address: '0x123',
    values: 'connected_wallet',
  },
  {
    title: 'To address',
    address: '',
    values: 'address',
  },
];
const Withdraw = ({ children }: { children: React.ReactNode }) => {
  const [selectedOption, setSelectedOption] = useState(
    withdrawOptions[0].values,
  );
  const { profile } = useSelector(selectProfile);
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
    defaultValues: {
      amount: undefined,
      address: '',
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success(values.amount);
  }
  console.log(profile);
  return (
    <Dialog>
      <DialogTrigger className="w-full" asChild>
        <div className="w-full">{children}</div>
      </DialogTrigger>
      <DialogContent className="w-[500px] gap-5" hideCloseButton>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
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
                          <SelectItem key={option.values} value={option.values}>
                            {option.title}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={selectedOption === 'connected_wallet'}
                      placeholder={`${selectedOption === 'connected_wallet' ? profile.address : 'Input amount'}`}
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
                    <FormLabel className="text-text-subtle">Amount</FormLabel>
                    <Flex>
                      <Typography.Text size={13} className="text-text-subtle">
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
  );
};

export default Withdraw;
