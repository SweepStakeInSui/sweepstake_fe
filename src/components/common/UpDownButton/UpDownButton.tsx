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
  disabled?: boolean;
}

const UpDownButton = <TFieldValues extends FieldValues>({
  label,
  placeholder,
  name,
  register,
  onIncrement,
  onDecrement,
  disabled,
}: IUpDownButton<TFieldValues>) => {
  return (
    <Stack className="gap-1 relative">
      {label && (
        <Typography.Text size={13} tag="label" className="text-text-subtle">
          {label}
        </Typography.Text>
      )}
      <Input
        type="currency"
        prefix="$"
        className="h-[3.375rem] pl-4 flex items-center py-4 pr-20 w-full rounded-md border border-field-border bg-field-background"
        placeholder={placeholder}
        {...register(name, {
          onChange: (e) => {
            const { value } = e.target;
            e.target.value = value.replace(/^0+(?=\d)/, '') || '0';
          },
        })}
        disabled={disabled}
      />
      <p className="text-text absolute top-1/2 text-sm left-2">$</p>
      <Flex className="gap-1 absolute right-4 bottom-4">
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={onDecrement}
          disabled={disabled}
        >
          <Svg src="/icons/remove.svg" />
        </IconButton>
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={onIncrement}
          disabled={disabled}
        >
          <Svg src="/icons/add.svg" />
        </IconButton>
      </Flex>
    </Stack>
  );
};

export default UpDownButton;
