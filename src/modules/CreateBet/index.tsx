'use client';

import { addWeeks } from 'date-fns';
import React, { useDeferredValue } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import Flex from '../../components/common/Flex';
import { Button } from '../../components/ui/button';
import type { IFormattedCreateBetData } from '../../services/markets/types';
import { dateToMilliseconds } from '../../utils/dateToMilliseconds';
import { epochToDate } from '../../utils/epochToDate';
import { timeToMilliseconds } from '../../utils/timeToMilliseconds';
import { toEpoch } from '../../utils/toEpoch';
import { CreateBetFormModule } from './components/CreateBetForm';
import { PreviewBetModule } from './components/PreviewBet';

const CreateBetModule = () => {
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
      sources: '',
    },
  });
  const formValues = methods.watch();
  const deferredFormData = useDeferredValue(formValues);

  const handleCreateBet = (data: IFormattedCreateBetData) => {
    const { startClock, startDate, endClock, endDate } = data;
    const startTimeFormatted =
      dateToMilliseconds(startDate, true) + timeToMilliseconds(startClock);
    const endTimeFormatted =
      dateToMilliseconds(endDate, true) + timeToMilliseconds(endClock);

    console.log({
      ...data,
      startTime: startTimeFormatted,
      endTime: endTimeFormatted,
    });
  };

  return (
    <FormProvider {...methods}>
      <Flex className="relative transition-all shrink-[100] items-start w-full gap-0">
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
    </FormProvider>
  );
};
export default CreateBetModule;
