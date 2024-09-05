'use client';

import Image from 'next/image';
import { useState } from 'react';

import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockAvatar } from '@/mocks/mockAvatar';

import { DatePicker } from '../../../../components/common/DatePicker';
import { OptionsOutsideSelect } from '../../../../components/common/OptionsOutsideSelect';
import Svg from '../../../../components/common/Svg';
import { Input } from '../../../../components/ui/input';
import { Textarea } from '../../../../components/ui/textarea';
import { TimePicker } from '../../../../components/ui/time-picker';
import { mockCategories } from '../../../../mocks/mockCategories';
import OutcomeList from './OutcomeList';

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
  const [selectedCategories, setSelectedCategories] = useState<TOption[]>([]);

  const [select, setSelect] = useState<string>('yesno');
  const selectedTab = tabs.find((item) => item.value === select);

  const handleSelectCategories = (options: TOption[]) => {
    setSelectedCategories(options);
  };

  return (
    <Stack className="sticky gap-y-0 border-l border-solid border-borderSubtle p-3 pt-10 pb-24 top-[4.75rem] w-[22.8125rem] h-[calc(100vh-4.75rem)] overflow-auto bg-bg-surface">
      <Stack className="gap-y-5">
        <Typography.Heading size={20}>Bet Details</Typography.Heading>
        <Stack className="justify-center items-center">
          <div className="relative size-30 rounded-xl overflow-hidden">
            <Image src={mockAvatar} alt="bet thumbnail" fill />
          </div>
          <Button className="rounded-full bg-blk-a80 border-blk-a85 px-2 py-0.5 gap-1">
            <Typography>Upload</Typography>
            <Svg src="/icons/photo_camera.svg" />
          </Button>
        </Stack>
        <Stack className="gap-y-2">
          <Typography.Text size={15}>Bet Title</Typography.Text>
          <Input placeholder="Input bet title" />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Start date</Typography.Text>
          <div className="grid grid-cols-2 gap-2">
            <DatePicker />
            <TimePicker />
          </div>
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>End date</Typography.Text>
          <div className="grid grid-cols-2 gap-2">
            <DatePicker />
            <TimePicker />
          </div>
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Category</Typography.Text>
          <OptionsOutsideSelect
            isMulti
            options={mockCategories}
            selectedOptions={selectedCategories}
            onChange={handleSelectCategories}
            placeholder="Select category"
          />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Bet type</Typography.Text>
          <Select defaultValue="yesno" onValueChange={setSelect}>
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
        </Stack>

        {selectedTab ? selectedTab.panel : null}

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Rule (Optional)</Typography.Text>
          <Textarea />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>About (Optional)</Typography.Text>
          <Textarea />
        </Stack>

        <Stack className="gap-y-2">
          <Typography.Text size={15}>Source (Optional)</Typography.Text>
          <Textarea />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CreateBetFormModule;
