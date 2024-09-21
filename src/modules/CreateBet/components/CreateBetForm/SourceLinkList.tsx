import Stack from '@components/common/Stack';
import Svg from '@components/common/Svg';
import Typography from '@components/common/Typography';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface ISourcePanelProps {
  index: number;
}

const SourcePanel = ({ index }: ISourcePanelProps) => {
  const { control } = useFormContext();

  return (
    <Stack className="border border-borderSubtle rounded-md rounded-br-none rounded-bl-none p-4 gap-4 bg-bg-container relative z-[1]">
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Link title
        </Typography.Text>
        <Controller
          name={`sources.${index}.title`}
          control={control}
          render={({ field }) => <Input {...field} placeholder="Link title" />}
        />
      </Stack>
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Link URL
        </Typography.Text>
        <Controller
          name={`sources.${index}.url`}
          control={control}
          render={({ field }) => <Input {...field} placeholder="Link URL" />}
        />
      </Stack>
    </Stack>
  );
};

const SourceList = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sources',
  });

  return (
    <Stack className="gap-4">
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="group">
            <Controller
              control={control}
              name={`sources.${index}`}
              render={({ field }) => <SourcePanel index={index} {...field} />}
            />
            <Button
              variant="ghost"
              className="w-full border border-t-0 bg-r-5 hover:bg-r-10 border-borderSubtle rounded-tr-none rounded-tl-none space-x-2 overflow-hidden transition-all -translate-y-[100%] group-hover:translate-y-0"
              onClick={() => remove(index)}
            >
              <Svg
                src="/icons/delete_outline.svg"
                className="text-text-support-red"
              />
              <Typography.Text size={13} className="text-text-support-red">
                Remove Source
              </Typography.Text>
            </Button>
          </div>
        );
      })}

      <Button
        variant="terriary"
        className="px-3 py-2 gap-x-1 mx-auto"
        onClick={() => {
          append({ title: '', url: '' });
        }}
      >
        <Svg src="/icons/add.svg" className="size-4" />
        <Typography.Text size={13} className="text-text-subtle">
          Add Source
        </Typography.Text>
      </Button>
    </Stack>
  );
};

export default SourceList;
