'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';
import { forwardRef, useRef } from 'react';

import { useSectionIndicatorSignal } from '@/modules/MarketDetails/useSectionIndicatorSignal';
import type { TSection } from '@/types/common';

interface Props extends PropsWithChildren {
  section: TSection;
  sectionBefore?: TSection;
  children?: ReactNode;
}

const SectionIndicatorWrapper = forwardRef<HTMLDivElement, Props>(
  ({ section, sectionBefore, children }: Props, indicatorRef): ReactElement => {
    const { setActiveSection } = useSectionIndicatorSignal();
    const refTrigger = useRef<HTMLDivElement>(null);
    gsap.registerPlugin(ScrollTrigger);

    useGSAP(() => {
      ScrollTrigger.create({
        trigger: refTrigger.current,
        start: 'top center',
        end: 'bottom top',
        onToggle: (self) => {
          if (self.isActive) {
            setActiveSection(section);
          }
        },
        onLeaveBack: () => {
          if (sectionBefore) {
            setActiveSection(sectionBefore);
          }
        },
      });
    });
    return (
      <div id={section} ref={refTrigger}>
        <div ref={indicatorRef}>{children}</div>
      </div>
    );
  },
);

SectionIndicatorWrapper.displayName = 'SectionIndicatorWrapper';

export default SectionIndicatorWrapper;
