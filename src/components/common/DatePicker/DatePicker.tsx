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

function CDatePicker() {
  const [date, setDate] = React.useState<Date>(new Date());

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
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
          {date ? format(date, 'P') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
      {/* 
      <div className="customDatePicker">
      <ReactDatePicker
        showIcon
        icon={
          <Svg
            src="/icons/calendar.svg"
            className="mr-2 h-4 w-4 top-[50%] translate-y-[-50%]"
          />
        }
        customInput={
          <Button
            variant="ghost"
            className={cn(
              'w-full justify-start text-left font-normal rounded-md border border-field-border bg-field-background px-3 pl-8 py-2 h-[3.375rem]',
              !date && 'text-muted-foreground',
            )}
          >
            {date ? format(date, 'P') : <span>Pick a date</span>}
          </Button>
        }
        wrapperClassName="datePicker"
        selected={date}
        onChange={(date) => setDate(date!)}
      />
    </div> */}
    </Popover>
  );
}

export default CDatePicker;
