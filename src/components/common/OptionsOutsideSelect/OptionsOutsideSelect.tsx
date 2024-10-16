import './index.scss';

import type { CSSProperties } from 'react';
import React from 'react';
import type { ClearIndicatorProps } from 'react-select';
import Select from 'react-select';

import type { ICategoryList } from '@/services/categoryService';

import Svg from '../Svg';
import CancelableOption from './CancelableOption';

const ClearIndicator = (props: ClearIndicatorProps<TOption, true>) => {
  const {
    children = (
      <Svg
        src="/icons/close.svg"
        className="size-3 cursor-pointer text-icon-subtle"
      />
    ),
    getStyles,
    innerProps: { ref, ...restInnerProps },
  } = props;
  return (
    <div
      {...restInnerProps}
      ref={ref}
      style={getStyles('clearIndicator', props) as CSSProperties}
    >
      <div style={{ padding: '0px 5px' }}>{children}</div>
    </div>
  );
};

const DropdownIndicator = () => (
  <Svg
    src="/icons/chevron_right.svg"
    className="rotate-90 h-4 w-4 opacity-50 cursor-pointer"
  />
);
type TOption = {
  value: string;
  label: string;
};
interface IOptionsOutsideSelectProps {
  isMulti?: true;
  value?: ICategoryList[];
  options: ICategoryList[];
  onChange?: (value: ICategoryList[]) => void;
  placeholder?: string;
}

const OptionsOutsideSelect = ({
  isMulti,
  value = [],
  options,
  onChange,
  placeholder,
}: IOptionsOutsideSelectProps) => {
  const handleRemoveValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onChange) return;
    const { name: buttonName } = e.currentTarget;
    const removedValue = value?.find((val) => val.name === buttonName);
    if (!removedValue) return;
    onChange(value?.filter((val) => val.name !== buttonName)!);
  };

  return (
    <div>
      <Select
        unstyled
        className="bg-field-background h-13.5 border-0 mb-1 react-select-container"
        classNamePrefix="react-select"
        components={{ ClearIndicator, DropdownIndicator }}
        placeholder={placeholder}
        closeMenuOnSelect={false}
        isMulti={isMulti}
        controlShouldRenderValue={!isMulti}
        value={value.map((option) => ({
          value: option.id,
          label: option.name,
        }))}
        options={options.map((option) => ({
          value: option.id,
          label: option.name,
        }))}
        // TO DO Optimize
        onChange={(newValue) => {
          if (onChange) {
            type OptionType = { value: string; label: string };

            let updatedValue: ICategoryList[] = [];

            if (Array.isArray(newValue)) {
              updatedValue = newValue.map((option: OptionType) => ({
                id: option.value,
                name: option.label,
                createdAt: '',
                updatedAt: '',
                deletedAt: null,
              }));
            } else if (newValue) {
              updatedValue = [
                {
                  id: (newValue as unknown as OptionType).value,
                  name: (newValue as unknown as OptionType).label,
                  createdAt: '',
                  updatedAt: '',
                  deletedAt: null,
                },
              ];
            }

            onChange(updatedValue);
          }
        }}
      />
      {isMulti &&
        value?.map((option) => (
          <CancelableOption
            key={option.id}
            value={option.name}
            label={option.name}
            onRemove={handleRemoveValue}
          />
        ))}
    </div>
  );
};
export default OptionsOutsideSelect;
