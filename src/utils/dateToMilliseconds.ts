import { setHours, setMilliseconds, setMinutes, setSeconds } from 'date-fns';

import { toEpoch } from './toEpoch';

export const dateToMilliseconds = (date: Date, justDate = false) => {
  if (justDate) {
    return toEpoch(
      setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), 0),
    );
  }
  return toEpoch(setSeconds(setMilliseconds(date, 0), 0));
};
