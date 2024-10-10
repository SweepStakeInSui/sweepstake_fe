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
  const [value, setValue] = React.useState(0);

  const handlePlus = () => {
    setValue((prev) => prev + 1);
  };

  const handleMinus = () => {
    setValue((prev) => prev - 1);
  };

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
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <Flex className="gap-1 absolute right-4 bottom-4">
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={handleMinus}
        >
          <Svg src="/icons/remove.svg" />
        </IconButton>
        <IconButton
          className="size-6 bg-bg-isublested p-0"
          isRounded={false}
          onClick={handlePlus}
        >
          <Svg src="/icons/add.svg" />
        </IconButton>
      </Flex>
    </Stack>
  );
};

export default UpDownButton;
