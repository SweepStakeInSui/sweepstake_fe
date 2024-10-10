'use client';

import type { Signal } from '@preact-signals/safe-react';
import { signal } from '@preact-signals/safe-react';

import type { TSection } from '@/types/common';

type UseSectionIndicatorSignal = {
  activeSection: Signal<TSection>;
  openNav: Signal<boolean>;
  isScrolling: Signal<boolean>;
  setIsScrolling: (b: boolean) => void;
  setActiveSection: (section: TSection) => void;
};
export const activeSection = signal<TSection>('/');
export const isScrolling = signal(false);
export const openNav = signal(false);

export function useSectionIndicatorSignal(): UseSectionIndicatorSignal {
  return {
    activeSection,
    openNav,
    isScrolling,
    setIsScrolling: (b: boolean): void => {
      isScrolling.value = b;
    },
    setActiveSection: (section: TSection): void => {
      activeSection.value = section;
    },
  };
}
