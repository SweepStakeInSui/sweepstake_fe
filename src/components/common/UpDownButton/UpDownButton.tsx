import React from 'react';
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { Input } from '@/components/ui/input';

import Flex from '../Flex';
import IconButton from '../IconButton';
import Stack from '../Stack';
import Svg from '../Svg';
import Typography from '../Typography';

interface IUpDownButton<TFieldValues extends FieldValues> {
  label?: string;
  placeholder?: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  onIncrement: () => void;
  onDecrement: () => void;
}

const UpDownButton = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  onIncrement,
  onDecrement,
}: IUpDownButton<TFieldValues>) => {
  return (
    <Stack className="gap-1 relative">
      {label && (
        <Typography.Text size={13} tag="label" className="text-text-subtle">
          {label}
        </Typography.Text>
      )}
      <Input
        type="number"
        className="h-[3.375rem] flex items-center p-4 pr-20 w-full rounded-md border border-field-border bg-field-background"
        placeholder={placeholder}
        {...register(name)}
      />
      <Flex className="gap-1 absolute right-4 bottom-4">
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={onDecrement}
        >
          <Svg src="/icons/remove.svg" />
        </IconButton>
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={onIncrement}
        >
          <Svg src="/icons/add.svg" />
        </IconButton>
      </Flex>
    </Stack>
  );
};

export default UpDownButton;
