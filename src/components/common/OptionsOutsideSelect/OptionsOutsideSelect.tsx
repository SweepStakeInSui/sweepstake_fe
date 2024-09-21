import './index.scss';

import type { CSSProperties } from 'react';
import React from 'react';
import type { ClearIndicatorProps } from 'react-select';
import Select from 'react-select';

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

interface IOptionsOutsideSelectProps {
  isMulti?: true;
  value?: TOption[];
  options: TOption[];
  onChange?: (value: TOption[]) => void;
  placeholder?: string;
}

const OptionsOutsideSelect = ({
  isMulti,
  value,
  options,
  onChange,
  placeholder,
}: IOptionsOutsideSelectProps) => {
  const handleRemoveValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!onChange) return;
    const { name: buttonName } = e.currentTarget;
    const removedValue = value?.find((val) => val.value === buttonName);
    if (!removedValue) return;
    onChange(value?.filter((val) => val.value !== buttonName)!);
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
        value={value}
        options={options}
        onChange={(newValue) => {
          if (onChange) {
            let updatedValue;
            if (Array.isArray(newValue)) {
              updatedValue = newValue;
            } else {
              updatedValue = newValue ? [newValue] : [];
            }
            onChange(updatedValue);
          }
        }}
      />
      {isMulti
        ? value?.map((option) => (
            <CancelableOption
              key={option.value}
              value={option.value}
              label={option.label}
              onRemove={handleRemoveValue}
            />
          ))
        : null}
    </div>
  );
};
export default OptionsOutsideSelect;
