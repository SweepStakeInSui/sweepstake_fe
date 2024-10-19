'use client';

import { useMutation } from '@tanstack/react-query';
import { addWeeks } from 'date-fns';
import React, { useDeferredValue } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import withAuth from '@/components/withAuth';
import { MarketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';

import Flex from '../../components/common/Flex';
import { StatusModal } from '../../components/common/StatusModal';
import { Button } from '../../components/ui/button';
import type {
  IFormattedCreateBetData,
  IFormattedCreateBetParams,
} from '../../services/markets/types';
import { dateToMilliseconds } from '../../utils/dateToMilliseconds';
import { epochToDate } from '../../utils/epochToDate';
import { timeToMilliseconds } from '../../utils/timeToMilliseconds';
import { toEpoch } from '../../utils/toEpoch';
import { CreateBetFormModule } from './components/CreateBetForm';
import { PreviewBetModule } from './components/PreviewBet';

const CreateBetModule = () => {
  // STATES
  const [confirmCreateBetModalOpen, setConfirmCreateBetModalOpen] =
    React.useState(false);
  const [step, setStep] = React.useState(false);
  const [txsString, setTxsString] = React.useState('');

  const { isLoggedIn } = useSelector(selectProfile);

  const methods = useForm<IFormattedCreateBetData>({
    defaultValues: {
      name: '',
      startDate: new Date(),
      startClock: epochToDate(toEpoch(new Date())),
      startTime: dateToMilliseconds(new Date()),
      endDate: addWeeks(new Date(), 1),
      endClock: epochToDate(toEpoch(addWeeks(new Date(), 1))),
      endTime: dateToMilliseconds(addWeeks(new Date(), 1)),
      category: [],
      betType: 'yesno',
      outcomes: [
        {
          outcome: '',
          subOutcome: '',
          picture: undefined,
        },
        {
          outcome: '',
          subOutcome: '',
          picture: undefined,
        },
      ],
      description: '',
      sources: [],
      colaterralToken: '',
    },
  });
  const formValues = methods.watch();
  const deferredFormData = useDeferredValue(formValues);

  //
  const {
    mutate: createBetMutation,
    isPending: isCreateBetLoading,
    isSuccess: isCreateBetSuccess,
    isError: isCreateBetError,
    data: createBetData,
  } = useMutation({
    mutationFn: (data: IFormattedCreateBetParams) =>
      MarketService.createMarket(data),
    onSuccess: () => {
      setTxsString('fakeTXSString');
    },
  });

  // FUNCTIONS
  const handleCreateBet = (data: IFormattedCreateBetData) => {
    const { startClock, startDate, endClock, endDate, category } = data;

    const startTimeSeconds =
      (dateToMilliseconds(startDate, true) + timeToMilliseconds(startClock)) /
      1000;
    const endTimeSeconds =
      (dateToMilliseconds(endDate, true) + timeToMilliseconds(endClock)) / 1000;
    const categoryNames = (category ?? [{ name: 'All' }]).map(
      (item) => item.name,
    );
    const formattedData = {
      ...data,
      category: categoryNames,
      startTime: startTimeSeconds,
      endTime: endTimeSeconds,
    };
    setConfirmCreateBetModalOpen(true);
    createBetMutation(formattedData);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Container size="sm" className="bg-bg-sublest py-5 block lg:hidden">
          <Stack className="gap-y-5">
            <Typography.Heading size={28}>Create Bet</Typography.Heading>
            <Flex>
              <div className="flex-1 h-1 w-full bg-bg-r_50 rounded-lg" />
              <div
                className={`flex-1 h-1 w-full ${step ? 'bg-bg-r_50' : 'bg-bg-dyb'} rounded-lg`}
              />
            </Flex>
            {step ? (
              <PreviewBetModule data={deferredFormData} />
            ) : (
              <CreateBetFormModule />
            )}

            {!step && (
              <>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    setStep(!step);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Preview Bet
                </Button>
                <Button
                  className="w-full"
                  variant="terriary"
                  size="lg"
                  onClick={() => methods.reset()}
                >
                  Clear All
                </Button>
              </>
            )}

            {step && (
              <>
                <Button
                  className="w-full"
                  size="lg"
                  disabled={!isLoggedIn}
                  onClick={methods.handleSubmit(handleCreateBet)}
                >
                  Create Bet
                </Button>

                <Button
                  className="w-full"
                  size="lg"
                  variant="terriary"
                  onClick={() => {
                    setStep(!step);
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                >
                  Back
                </Button>
              </>
            )}
          </Stack>
        </Container>
        <div className="hidden lg:block">
          <Flex className="relative transition-all shrink-[100] items-start w-full gap-0 bg-bg-primary">
            <PreviewBetModule data={deferredFormData} />
            <CreateBetFormModule />
          </Flex>
          <div className="sticky bottom-0 flex space-x-2 justify-end w-full p-4 bg-bg-surface shadow-create-bet-shadow">
            <Button variant="terriary" onClick={() => methods.reset()}>
              Clear All
            </Button>

            <Button onClick={methods.handleSubmit(handleCreateBet)}>
              Create Bet
            </Button>
          </div>
        </div>
      </FormProvider>

      <StatusModal
        open={confirmCreateBetModalOpen}
        onOpenChange={setConfirmCreateBetModalOpen}
        isLoading={isCreateBetLoading}
        isSuccess={isCreateBetSuccess && createBetData.statusCode === 200}
        isError={isCreateBetError}
        title={(() => {
          if (isCreateBetLoading) return 'Your Bet Being Created';
          if (isCreateBetSuccess && createBetData.statusCode === 200)
            return 'Bet Created';
          if (isCreateBetError) return 'Bet Creation Failed';
          return '';
        })()}
        message={(() => {
          if (isCreateBetLoading) return 'Your bet is being created.';
          if (isCreateBetSuccess && createBetData.statusCode === 200)
            return 'Your bet has been created.';
          if (isCreateBetError) return 'Your bet has not been created.';
          return '';
        })()}
        txs={txsString}
      />
    </>
  );
};
export default withAuth(CreateBetModule);
