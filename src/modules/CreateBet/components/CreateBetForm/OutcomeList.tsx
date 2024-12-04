import { ImageUploader } from '@components/common/ImageUploader';
import Stack from '@components/common/Stack';
import Svg from '@components/common/Svg';
import Typography from '@components/common/Typography';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import React from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';

interface IOutcomePanelProps {
  index: number;
}

const OutcomePanel = ({ index }: IOutcomePanelProps) => {
  const { control, setValue } = useFormContext();
  const [showUploadImg, setShowUploadImg] = React.useState(false);

  const handleSwitchChange = (checked: boolean) => {
    setShowUploadImg(checked);
    if (!checked) {
      setValue(`outcomes.${index}.picture`, null);
    }
  };

  return (
    <Stack className="border border-borderSubtle rounded-md rounded-br-none rounded-bl-none p-4 gap-4 bg-bg-container relative z-[1]">
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Outcome#{index + 1}
        </Typography.Text>
        <Controller
          name={`outcomes.${index}.outcome`}
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Input outcome" />
          )}
        />
      </Stack>
      <Stack className="gap-1">
        <Typography.Text size={13} className="text-text-subtle">
          Sub Outcome
        </Typography.Text>
        <Controller
          name={`outcomes.${index}.subOutcome`}
          control={control}
          render={({ field }) => (
            <Input {...field} placeholder="Input sub outcome" />
          )}
        />
      </Stack>

      <div className="flex items-center space-x-2">
        <Switch
          id={index.toString()}
          checked={showUploadImg}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor={index.toString()} className="text-13 text-text-subtle">
          With Image
        </Label>
      </div>

      <div className={`${showUploadImg ? 'block' : 'hidden'}`}>
        <Controller
          name={`outcomes.${index}.picture`}
          control={control}
          render={({ field }) => (
            <ImageUploader
              {...field}
              desc="Image maximum 10MB"
              customKey={`image-uploader-${index}`}
            />
          )}
        />
      </div>
    </Stack>
  );
};

const OutcomeList = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'outcomes',
  });

  return (
    <Stack className="gap-4">
      {fields.map((item, index) => {
        return (
          <div key={item.id} className="group">
            <Controller
              control={control}
              name={`outcomes.${index}`}
              render={({ field }) => <OutcomePanel index={index} {...field} />}
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
          append({ outcome: '', subOutcome: '', picture: null });
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
