import './index.scss';

import React from 'react';
import DatePicker from 'react-datepicker';

import Typography from '@/components/common/Typography';
import { toEST } from '@/utils/toEST';

import { Input } from '../../ui/input';
import Svg from '../Svg';

interface ITimePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

const TimePicker = ({ value, onChange }: ITimePickerProps) => {
  const [date, setDate] = React.useState<Date>(toEST(new Date()));

  React.useEffect(() => {
    if (value) {
      setDate(toEST(value));
    }
  }, [value]);

  const handleSelect = (selectedDate: Date | null) => {
    const newDate = toEST(selectedDate ?? new Date());
    setDate(newDate);
    if (onChange) {
      onChange(newDate);
    }
  };

  return (
    <div className="customTimePicker_wrapper relative">
      <DatePicker
        selected={date}
        showTimeSelectOnly
        showTimeSelect
        showPopperArrow={false}
        showIcon
        icon={
          <Svg
            src="/icons/clock.svg"
            className="top-[50%] translate-y-[-50%]"
          />
        }
        onChange={handleSelect}
        timeIntervals={30}
        timeCaption="Time (EST)"
        timeFormat="HH:mm"
        dateFormat="HH:mm"
        customInput={
          <Input
            className="customTimePicker_input pr-10"
            type="time"
            pattern="[0-9]{2}:[0-9]{2}"
          />
        }
        popperPlacement="bottom-end"
        popperClassName="customTimePicker_popper"
        wrapperClassName="customTimePicker"
        minDate={toEST(new Date())}
      />
      <Typography.Text
        size={15}
        className="text-text-sublest absolute top-[28px] right-4 -translate-y-1/2"
      >
        EST
      </Typography.Text>
    </div>
  );
};
export default TimePicker;
