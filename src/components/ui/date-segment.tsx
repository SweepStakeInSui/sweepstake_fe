'use client';

import { useRef } from 'react';
import { useDateSegment } from 'react-aria';
import type {
  DateFieldState,
  DateSegment as IDateSegment,
} from 'react-stately';

import { cn } from '@/lib/utils';

interface DateSegmentProps {
  segment: IDateSegment;
  state: DateFieldState;
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = useRef(null);

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-text focus:outline-none text-15',
        segment.type !== 'literal' ? 'px-[1px]' : '',
        segment.isPlaceholder ? 'text-text-sublest' : '',
      )}
    >
      {segment.text}
    </div>
  );
}

export { DateSegment };
