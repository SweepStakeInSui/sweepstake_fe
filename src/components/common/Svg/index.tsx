'use client';

import React from 'react';
import type { Props } from 'react-inlinesvg';
import SVG from 'react-inlinesvg';

import { cn } from '@/lib/utils';

interface SvgProps extends Props {
  className?: string;
}

export default function Svg({ className, ...props }: SvgProps) {
  return <SVG {...props} className={cn(className, 'text-icon')} />;
}
