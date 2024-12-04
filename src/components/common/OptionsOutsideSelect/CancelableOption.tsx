import React from 'react';

import Svg from '../Svg';
import Typography from '../Typography';

interface ICancelableOptionProps {
  value?: string;
  label?: React.ReactNode;
  onRemove?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CancelableOption = ({
  value,
  label,
  onRemove,
}: ICancelableOptionProps) => {
  return (
    <div className="inline-flex gap-0 w-fit rounded-sm px-1 py-0.5 mr-2 mt-2 bg-transparent border border-borderMain hover:bg-bg-sublest">
      <div className="mr-1 cursor-default">
        {typeof label === 'string' ? (
          <Typography.Text size={13}>{label}</Typography.Text>
        ) : (
          label
        )}
      </div>
      <button name={value} onClick={onRemove} aria-label="Remove">
        <Svg src="/icons/close.svg" className="size-3" />
      </button>
    </div>
  );
};

export default CancelableOption;
