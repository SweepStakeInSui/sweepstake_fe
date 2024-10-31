'use client';

import { DatePicker } from '@components/common/DatePicker';
import { ImageUploader } from '@components/common/ImageUploader';
import { OptionsOutsideSelect } from '@components/common/OptionsOutsideSelect';
import { TimePicker } from '@components/common/TimePicker';
import { Input } from '@components/ui/input';
import { Textarea } from '@components/ui/textarea';
import { useMutation, useQuery } from '@tanstack/react-query';
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
import { fileService } from '@/services/fileService';
import type { IFormattedCreateBetData } from '@/services/markets/types';

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
  const { control, setValue, getValues, formState } =
    useFormContext<IFormattedCreateBetData>();
  const { errors } = formState;
  const startDate = useWatch({ control, name: 'startDate' });

  // QUERIES
  const { mutate: updateFileMutate, isPending: isUpdateFileLoading } =
    useMutation({
      mutationFn: (file: File) => fileService.uploadFile(file),
      onSuccess: (data) => {
        if (data) {
          setValue('image', data, {
            shouldValidate: true,
          });
        }
      },
    });

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
    <Stack className="relative lg:sticky gap-y-0 lg:border-l border-solid border-borderSubtle p-4 lg:p-6 lg:pt-10 lg:pb-24 lg:top-[4.75rem] w-full lg:w-[22.8125rem] h-full lg:h-[calc(100vh-4.75rem)] no-scrollbar overflow-auto bg-bg-surface rounded-lg lg:rounded-none">
      <Stack className="gap-y-5">
        <Typography.Heading size={20}>Bet Details</Typography.Heading>
        <Controller
          control={control}
          name="image"
          render={({ field }) => (
            <div className="flex items-center justify-center">
              <ImageUploader
                {...field}
                variant="big"
                customKey="thumbnail"
                onChange={(file) => {
                  if (file) {
                    field.onChange(file);
                    updateFileMutate(file);
                  } else {
                    field.onChange(null);
                  }
                }}
                isLoading={isUpdateFileLoading}
              />
            </div>
          )}
        />
        <Stack className="gap-y-2">
          <Typography.Text size={15}>Bet Title</Typography.Text>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <>
                <Input {...field} placeholder="Input bet title" />
                {errors.name && (
                  <Typography.Text
                    size={13}
                    className="text-text-support-red"
                    weight="medium"
                  >
                    {errors.name.message}
                  </Typography.Text>
                )}
              </>
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
          {errors.startTime && (
            <Typography.Text
              size={13}
              className="text-text-support-red"
              weight="medium"
            >
              {errors.startTime.message}
            </Typography.Text>
          )}
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
          {errors.endTime && (
            <Typography.Text
              size={13}
              className="text-text-support-red"
              weight="medium"
            >
              {errors.endTime.message}
            </Typography.Text>
          )}
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Category</Typography.Text>
          {categoryData && (
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <OptionsOutsideSelect
                  {...field}
                  isMulti
                  options={categoryData}
                  placeholder="Select category"
                />
              )}
            />
          )}
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
          <Typography.Text size={15}>Rule</Typography.Text>
          <Controller
            control={control}
            name="conditions"
            render={({ field }) => (
              <>
                <Textarea {...field} />
                {errors.conditions && (
                  <Typography.Text
                    size={13}
                    className="text-text-support-red"
                    weight="medium"
                  >
                    {errors.conditions.message}
                  </Typography.Text>
                )}
              </>
            )}
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>About</Typography.Text>
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <>
                <Textarea {...field} />
                {errors.description && (
                  <Typography.Text
                    size={13}
                    className="text-text-support-red"
                    weight="medium"
                  >
                    {errors.description.message}
                  </Typography.Text>
                )}
              </>
            )}
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
