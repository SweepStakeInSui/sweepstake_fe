'use client';

import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';

import { format } from 'date-fns';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

import { Calendar } from '../../ui/calendar';
import Svg from '../Svg';
import Typography from '../Typography';

interface DatePickerProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}
function CDatePicker({
  value,
  onChange,
  defaultValue,
}: Readonly<DatePickerProps>) {
  const [date, setDate] = React.useState<Date | undefined>(defaultValue);

  React.useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate && (!date || selectedDate.getTime() !== date.getTime())) {
      setDate(selectedDate);
      if (onChange) {
        onChange(selectedDate);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-left font-normal rounded-md border border-field-border bg-field-background px-3 py-2 h-[3.375rem]',
            !date && 'text-muted-foreground',
          )}
        >
          <Svg src="/icons/calendar.svg" className="mr-2 h-4 w-4" />
          <Typography.Text size={15} className="text-text text-15">
            {date ? format(date, 'P') : <span>Pick a date</span>}
          </Typography.Text>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
          disabled={{
            before: new Date(),
          }}
          defaultMonth={date}
        />
      </PopoverContent>
    </Popover>
  );
}

export default CDatePicker;
