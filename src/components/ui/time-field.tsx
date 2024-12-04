/* eslint-disable */
'use client';

import { useRef } from 'react';
import type { AriaTimeFieldProps, TimeValue } from 'react-aria';
import { useLocale, useTimeField } from 'react-aria';
import { useTimeFieldState } from 'react-stately';

import { cn } from '@/lib/utils';

import Svg from '../common/Svg';
import { DateSegment } from './date-segment';

function TimeField(props: Readonly<AriaTimeFieldProps<TimeValue>>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const {
    fieldProps: { ...fieldProps },
  } = useTimeField(props, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex items-center w-full flex-1 rounded-md border border-field-border bg-field-background px-3 py-2 h-[3.375rem]',
        props.isDisabled ? 'cursor-not-allowed opacity-50' : '',
      )}
    >
      <Svg src="/icons/clock.svg" className="mr-1" />
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

export { TimeField };
