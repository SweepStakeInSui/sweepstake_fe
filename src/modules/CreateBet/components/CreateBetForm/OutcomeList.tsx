import React from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';

import Flex from '../../../../components/common/Flex';
import Stack from '../../../../components/common/Stack';
import Svg from '../../../../components/common/Svg';
import Typography from '../../../../components/common/Typography';
import { Button } from '../../../../components/ui/button';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';
import { Switch } from '../../../../components/ui/switch';

interface IOutcomePanelProps {
  index: number;
}

const OutcomePanel = ({ index }: IOutcomePanelProps) => {
  const [showUploadImg, setShowUploadImg] = React.useState(false);

  return (
    <Stack className="border border-borderSubtle rounded-md rounded-br-none rounded-bl-none p-4 gap-4 bg-bg-container relative z-[1]">
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Outcome#{index + 1}
        </Typography.Text>
        <Input placeholder="Input outcome" />
      </Stack>
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Sub Outcome
        </Typography.Text>
        <Input placeholder="Input sub outcome" />
      </Stack>

      <div className="flex items-center space-x-2">
        <Switch
          id={index.toString()}
          onClick={() => setShowUploadImg(!showUploadImg)}
        />
        <Label htmlFor={index.toString()} className="text-13 text-text-subtle">
          With Image
        </Label>
      </div>

      <Flex
        className={`overflow-hidden transition-all ${showUploadImg ? 'h-6' : 'h-0'}`}
      >
        <Button className="rounded-full bg-blk-a80 border-blk-a85 px-2 py-0.5 gap-1">
          <Typography>Upload</Typography>
          <Svg src="/icons/photo_camera.svg" />
        </Button>
        <Typography.Text size={13} className="text-text-subtle">
          Image maximum 10MB
        </Typography.Text>
      </Flex>
    </Stack>
  );
};

const OutcomeList = () => {
  const { control } = useForm({
    defaultValues: {
      test: [{ outcome: '', subOutcome: '' }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  return (
    <Stack className="gap-4">
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="group">
            <Controller
              render={({ field }) => <OutcomePanel index={index} {...field} />}
              name={`test.${index}.outcome`}
              control={control}
            />
            <Button
              variant="ghost"
              className="w-full border border-t-0 bg-bg-sublest border-borderSubtle rounded-tr-none rounded-tl-none space-x-2 overflow-hidden transition-all -translate-y-[100%] group-hover:translate-y-0"
              onClick={() => remove(index)}
            >
              <Svg src="/icons/delete_outline.svg" />
              <Typography.Text size={13} className="text-text-subtle">
                Remove Outcome
              </Typography.Text>
            </Button>
          </div>
        );
      })}

      <Button
        variant="terriary"
        className="px-3 py-2 gap-x-1 mx-auto"
        onClick={() => {
          append({ outcome: '', subOutcome: '' });
        }}
      >
        <Svg src="/icons/add.svg" className="size-4" />
        <Typography.Text size={13} className="text-text-subtle">
          Add outcome
        </Typography.Text>
      </Button>
    </Stack>
  );
};

export default OutcomeList;
