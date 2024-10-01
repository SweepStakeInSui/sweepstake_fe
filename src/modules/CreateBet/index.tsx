'use client';

import { addWeeks } from 'date-fns';
import React, { useDeferredValue } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';

import Flex from '../../components/common/Flex';
import { StatusModal } from '../../components/common/StatusModal';
import { Button } from '../../components/ui/button';
import type { IFormattedCreateBetData } from '../../services/markets/types';
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
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'success' | 'fail'>(
    'idle',
  );
  const [step, setStep] = React.useState(false);
  const [txsString, setTxsString] = React.useState('');

  const methods = useForm<IFormattedCreateBetData>({
    defaultValues: {
      title: '',
      startDate: new Date(),
      startClock: epochToDate(toEpoch(new Date())),
      startTime: dateToMilliseconds(new Date()),
      endDate: addWeeks(new Date(), 1),
      endClock: epochToDate(toEpoch(addWeeks(new Date(), 1))),
      endTime: dateToMilliseconds(addWeeks(new Date(), 1)),
      categories: [],
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
      rule: '',
      about: '',
      sources: [],
    },
  });
  const formValues = methods.watch();
  const deferredFormData = useDeferredValue(formValues);

  // FUNCTIONS
  const handleCreateBet = (data: IFormattedCreateBetData) => {
    const { startClock, startDate, endClock, endDate } = data;
    const startTimeFormatted =
      dateToMilliseconds(startDate, true) + timeToMilliseconds(startClock);
    const endTimeFormatted =
      dateToMilliseconds(endDate, true) + timeToMilliseconds(endClock);

    const formattedData = {
      ...data,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
    };

    setConfirmCreateBetModalOpen(true);
    console.log('Data before loading:', formattedData);

    setLoading(true);
    setStatus('idle');

    // Mock sending data
    setTimeout(() => {
      setLoading(false);
      // Randomly set success or fail
      const isSuccess = Math.random() > 0.5;
      setStatus(isSuccess ? 'success' : 'fail');

      if (isSuccess) {
        setTxsString('success');
      }
    }, 1000);
  };

  return (
    <>
      <FormProvider {...methods}>
        <Container size="sm" className="bg-bg-sublest py-5 block lg:hidden">
          <Stack className="gap-y-5">
            <Typography.Heading size={28}>Create Bet</Typography.Heading>
            <Flex>
              <div className="flex-1 h-1 w-full bg-bg-red rounded-lg" />
              <div
                className={`flex-1 h-1 w-full ${step ? ' bg-bg-red' : 'bg-bg-dyb'} rounded-lg`}
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
        isLoading={loading}
        status={status}
        title={(() => {
          if (loading) return 'Your Bet Being Created';
          if (status === 'success') return 'Bet Created';
          if (status === 'fail') return 'Bet Creation Failed';
          return '';
        })()}
        message={(() => {
          if (loading) return 'Your bet is being created.';
          if (status === 'success') return 'Your bet has been created.';
          if (status === 'fail') return 'Your bet has not been created.';
          return '';
        })()}
        txs={txsString}
      />
    </>
  );
};
export default CreateBetModule;
