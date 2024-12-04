import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-10',
        'text-12',
        'text-13',
        'text-14',
        'text-15 leading-5',
        'text-16',
        'text-18',
        'text-20',
        'text-24',
        'text-28 leading-8',
        'text-32',
        'text-48',
        'text-64',
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
