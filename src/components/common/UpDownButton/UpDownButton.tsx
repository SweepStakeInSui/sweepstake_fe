import React from 'react';

import { Input } from '@/components/ui/input';

import Flex from '../Flex';
import IconButton from '../IconButton';
import Stack from '../Stack';
import Svg from '../Svg';
import Typography from '../Typography';

interface IUpDownButton {
  label?: string;
  placeholder?: string;
}

const UpDownButton = ({ label, placeholder }: IUpDownButton) => {
  return (
    <Stack className="gap-1">
      {label && (
        <Typography.Text size={13} tag="label" className="text-text-subtle">
          {label}
        </Typography.Text>
      )}
      <div className="h-[3.375rem] flex items-center p-4 w-full rounded-md border border-field-border bg-field-background">
        <Input
          className="bg-transparent border-0 p-0 pl-1"
          placeholder={placeholder}
        />
        <Flex className="gap-1">
          <IconButton className="size-6 bg-dyb-10 p-0" isRounded={false}>
            <Svg src="/icons/remove.svg" />
          </IconButton>
          <IconButton className="size-6 bg-dyb-10 p-0" isRounded={false}>
            <Svg src="/icons/add.svg" />
          </IconButton>
        </Flex>
      </div>
    </Stack>
  );
};

export default UpDownButton;
