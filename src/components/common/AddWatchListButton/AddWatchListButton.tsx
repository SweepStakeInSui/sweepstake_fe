import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IconButton from '@/components/common/IconButton';
import { Tooltip } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import type { TBetItem } from '@/services/markets/types';
import {
  addWatchList,
  removeWatchList,
  selectWatchList,
} from '@/store/watchListSlice';

import Svg from '../Svg';
import Typography from '../Typography';

const AddWatchListButton = ({
  bet,
  showIcon = true,
  showText = true,
  size = 14,
  ...props
}: {
  bet: TBetItem;
  showIcon?: boolean;
  showText?: boolean;
  size?: number;
}) => {
  const dispatch = useDispatch();
  const { items } = useSelector(selectWatchList);

  const isInCart = useMemo(
    () => !!items.find((i: TBetItem) => i.id === bet?.id),
    [items, bet],
  );
  if (isInCart) {
    return (
      <Tooltip
        content="Remove from watchlist"
        className={cn(showText && 'hidden')}
      >
        <IconButton
          isRounded
          variant="ghost"
          className="gap-0.5 p-1"
          onClick={(e) => {
            e.stopPropagation();
            dispatch(removeWatchList({ id: bet.id }));
          }}
          {...props}
        >
          {showIcon && (
            <Svg src="/icons/highlight_off.svg" width={size} height={size} />
          )}
          {showText && (
            <Typography.Text size={12} className="text-text-sublest">
              Remove from WL
            </Typography.Text>
          )}
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip content="Add to watchlist" className={cn(showText && 'hidden')}>
      <IconButton
        isRounded
        variant="ghost"
        className="gap-0.5 p-1"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addWatchList({ item: bet }));
        }}
        {...props}
      >
        {showIcon && (
          <Svg src="/icons/add_circle_outline.svg" width={size} height={size} />
        )}
        {showText && (
          <Typography.Text size={12} className="text-text-sublest">
            Add to watchlist
          </Typography.Text>
        )}
      </IconButton>
    </Tooltip>
  );
};

export default AddWatchListButton;
