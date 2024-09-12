'use client';

import { useState } from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { SkeletonSearch } from '../common/Skeleton';
import Svg from '../common/Svg';
import Typography from '../common/Typography';
import { Input } from '../ui/input';

interface ResultsItemProps {
  content?: string;
  avatar?: string;
  price?: string;
}

const ResultsItem = ({
  content,
  avatar = 'https://github.com/shadcn.png',
  price,
}: Readonly<ResultsItemProps>) => {
  return (
    <Flex className="cursor-pointer justify-between hover:bg-bg-hovered px-2 py-2.5 rounded-sm">
      <Flex className="gap-4">
        <Avatar isRounded={false}>
          <AvatarImage src={avatar} />
          <AvatarFallback />
        </Avatar>
        <Stack className="gap-2">
          <Typography.Text size={14} weight="medium" className="text-text">
            {content as string}
          </Typography.Text>
          <div className="text-elevation-a400 gap-x-1 flex items-center">
            <Typography.Text className=" text-sm">
              {price as string}
            </Typography.Text>
          </div>
        </Stack>
      </Flex>
    </Flex>
  );
};
const SearchHeader = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');
  //   const debouncedSearch = useDebounce(valueSearch);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  return (
    <div className="relative max-w-[380px] w-full">
      <Svg
        src="/icons/search.svg"
        className="absolute top-1/2 -translate-y-1/2 left-3"
      />
      <Input
        placeholder="Search all of Sweepstack"
        autoComplete="off"
        type="text"
        value={valueSearch}
        className="placeholder:text-sm h-11 pl-7"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={handleSearch}
      />
      <div className="text-text-sublest absolute right-3 top-1/2 -translate-y-1/2">
        {valueSearch ? (
          <Svg
            src="/icons/cancel.svg"
            className="cursor-pointer"
            onClick={() => {
              setValueSearch('');
              setIsFocused(false);
            }}
          />
        ) : (
          <p>/</p>
        )}
      </div>
      <div
        className={`max-h-[328px] overflow-y-auto p-2 rounded-md shadow-search-header overflow-x-hidden absolute bg-bg-surface w-full top-13 transition-all duration-300 ${
          isFocused ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        aria-label="Suggestions"
      >
        <div>
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
          <SkeletonSearch />
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
          <ResultsItem
            content="June 2024 Temperature Increase (ºC)"
            price="$23.000"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
