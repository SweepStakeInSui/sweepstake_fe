'use client';

import { DatePicker } from '@components/common/DatePicker';
import { ImageUploader } from '@components/common/ImageUploader';
import { OptionsOutsideSelect } from '@components/common/OptionsOutsideSelect';
import { TimePicker } from '@components/common/TimePicker';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { useQuery } from '@tanstack/react-query';
import { addWeeks } from 'date-fns';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { categoryService } from '@/services/categoryService';

import OutcomeList from './OutcomeList';
import SourceList from './SourceLinkList';

const CreateBetFormModule = () => {
  // CONSTANTS
  const tabs = [
    {
      label: 'Single Yes/No Bet',
      value: 'yesno',
      panel: null,
    },
    {
      label: 'Multi-outcomes',
      value: 'multi',
      panel: <OutcomeList />,
    },
  ];

  // STATES

  // FORM HANDLERS
  const { control, setValue, getValues } = useFormContext();
  const startDate = useWatch({ control, name: 'startDate' });

  // FUNCTIONS
  const selectedTab = tabs.find((item) => item.value === getValues('betType'));

  // EFFECTS
  useEffect(() => {
    if (startDate) {
      const endDate = addWeeks(new Date(startDate), 1);
      setValue('endDate', endDate);
    }
  }, [startDate, setValue]);
  const { data: categoryData } = useQuery({
    queryKey: ['category'],
    queryFn: categoryService.getCategory,
  });
  return (
    <Stack className="sticky gap-y-0 border-l border-solid border-borderSubtle p-3 pt-10 pb-24 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto bg-bg-surface">
      
    </Stack>
  );
};

export default CreateBetFormModule;
