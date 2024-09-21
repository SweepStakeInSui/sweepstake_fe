'use client';

import { DatePicker } from '@components/common/DatePicker';
import { ImageUploader } from '@components/common/ImageUploader';
import { OptionsOutsideSelect } from '@components/common/OptionsOutsideSelect';
import { TimePicker } from '@components/common/TimePicker';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
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
import { mockCategories } from '@/mocks/mockCategories';

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

  return (
    <Stack className="sticky gap-y-0 border-l border-solid border-borderSubtle p-3 pt-10 pb-24 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto bg-bg-surface">
      <Stack className="gap-y-5">
        <Typography.Heading size={20}>Bet Details</Typography.Heading>
        <Controller
          control={control}
          name="thumbnail"
          render={({ field }) => (
            <ImageUploader {...field} variant="big" customKey="thumbnail" />
          )}
        />
        <Stack className="gap-y-2">
          <Typography.Text size={15}>Bet Title</Typography.Text>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Input bet title"
                defaultValue="test"
              />
            )}
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Start date</Typography.Text>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => <DatePicker {...field} />}
            />
            <Controller
              name="startClock"
              control={control}
              render={({ field }) => <TimePicker {...field} />}
            />
          </div>
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>End date</Typography.Text>
          <div className="grid grid-cols-2 gap-2">
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => <DatePicker {...field} />}
            />
            <Controller
              name="endClock"
              control={control}
              render={({ field }) => <TimePicker {...field} />}
            />
          </div>
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Category</Typography.Text>
          <Controller
            name="categories"
            control={control}
            render={({ field }) => (
              <OptionsOutsideSelect
                {...field}
                isMulti
                options={mockCategories}
                placeholder="Select category"
              />
            )}
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Bet type</Typography.Text>

          <Controller
            control={control}
            name="betType"
            render={({ field }) => (
              <Select
                defaultValue="yesno"
                onValueChange={field.onChange}
                {...field}
              >
                <SelectTrigger className="bg-field-background h-13.5 border-0">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {tabs.map((tab) => (
                      <SelectItem key={tab.value} value={tab.value}>
                        {tab.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
        </Stack>

        {selectedTab ? selectedTab.panel : null}

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Rule (Optional)</Typography.Text>
          <Controller
            control={control}
            name="rule"
            render={({ field }) => <Textarea {...field} />}
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>About (Optional)</Typography.Text>
          <Controller
            control={control}
            name="about"
            render={({ field }) => <Textarea {...field} />}
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Source (Optional)</Typography.Text>
          <SourceList />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateBetFormModule;
