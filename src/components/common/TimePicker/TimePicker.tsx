import './index.scss';

import React from 'react';
import DatePicker from 'react-datepicker';

import { Input } from '../../ui/input';
import Svg from '../Svg';

interface ITimePickerProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

const TimePicker = ({ value, onChange }: ITimePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date());

  React.useEffect(() => {
    if (value) {
      setDate(value);
    }
  }, [value]);

  const handleSelect = (selectedDate: Date | null) => {
    const newDate = selectedDate || new Date();
    setDate(newDate);
    if (onChange) {
      onChange(selectedDate || undefined);
    }
  };

  return (
    <div className="customTimePicker_wrapper">
      <DatePicker
        selected={date}
        showIcon
        showTimeSelectOnly
        showTimeSelect
        showPopperArrow={false}
        icon={
          <Svg
            src="/icons/clock.svg"
            className="top-[50%] translate-y-[-50%]"
          />
        }
        onChange={handleSelect}
        timeIntervals={30}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={<Input className="customTimePicker_input" />}
        popperPlacement="bottom-end"
        popperClassName="customTimePicker_popper"
        wrapperClassName="customTimePicker"
        minDate={new Date()}
      />
    </div>
  );
};
export default TimePicker;