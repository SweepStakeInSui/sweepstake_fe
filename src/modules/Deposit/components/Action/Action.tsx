'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { EffectCards } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
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
import { Tooltip } from '@/components/ui/tooltip';
import useBalance from '@/hooks/useBalance';

import { Withdraw } from '../Withdraw';

interface ActionProps {
  handleNextSlide: () => void;
}
const Balance: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const balance = useBalance();
  const options = [
    {
      title: 'Portfolio',
      address: '0x123',
    },
    {
      title: 'Your Wallet',
      address: '0x456',
    },
  ];
  const formSchema = z.object({
    amount: z.coerce
      .number({
        required_error: 'Amount is required',
        invalid_type_error: 'Amount must be a number',
      })
      .gt(0, { message: 'Amount must be greater than 0' }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: undefined,
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    toast.success(values.amount);
  }
  const { isValid } = form.formState;

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

      <Dialog>
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 mt-5"
            >
              <div className="rounded-md border border-borderSubtle overflow-hidden relative">
                {options.map((option, index) => (
                  <>
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
                  </>
                ))}
                <div className="rounded-full border border-borderSubtle bg-bg-surface size-8 flex items-center justify-center absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                  <Svg src="/icons/swap_vert.svg" />
                </div>
              </div>
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <Flex className="justify-between mt-7">
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
                <Button disabled={!isValid} type="submit">
                  Transfer
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
const PortfolioDeposit: React.FC<ActionProps> = ({ handleNextSlide }) => {
  const balance = useBalance();
  return (
    <div className="px-5 pb-4 pt-5 bg-dyb-5 rounded-lg w-[283px] border border-borderSubtle">
      <Flex className="justify-between">
        <Flex className="gap-x-1">
          <Typography.Text className="text-text-subtle" size={13}>
            Portfolio
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
      <Withdraw>
        <Button variant="secondary" className="w-full" size="medium">
          <Typography.Text className="text-text-inverse">
            Withdraw
          </Typography.Text>
        </Button>
      </Withdraw>
    </div>
  );
};
const ActionDeposit = () => {
  const swiperRef = useRef<any>(null);
  const handleNextSlide = () => {
    console.log(swiperRef.current);

    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };
  return (
    <div className="py-5 sticky top-16">
      <Swiper
        effect="cards"
        modules={[EffectCards]}
        direction="vertical"
        slidesPerView={1}
        ref={swiperRef}
        loop
        className="mySwiper swiper-deposit"
      >
        <SwiperSlide className="swiper-action">
          <Balance handleNextSlide={handleNextSlide} />
        </SwiperSlide>
        <SwiperSlide className="swiper-action">
          <PortfolioDeposit handleNextSlide={handleNextSlide} />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default ActionDeposit;
