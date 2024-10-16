'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDebounce } from '@/hooks';
import { marketService } from '@/services/markets';
import type { TBetItem } from '@/services/markets/types';

import { SkeletonSearch } from '../common/Skeleton';
import Svg from '../common/Svg';
import Typography from '../common/Typography';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { ScrollArea } from '../ui/scroll-area';

interface ResultsItemProps {
  content?: string;
  avatar?: string;
  price?: string;
}
export const ResultsItem = ({
  content,
  avatar = 'https://github.com/shadcn.png',
  price,
}: Readonly<ResultsItemProps>) => {
  return (
    <Flex className="cursor-pointer justify-between hover:bg-bg-hovered px-2 py-2.5 rounded-sm w-full">
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
// interface SearchResult {
//   content: string;
//   price: string;
// }
// const searchResults = [
//   {
//     content: 'Roaring Kitty charged in 2024?',
//     price: '$123,90',
//   },
//   {
//     content: 'Richest person in the world at the end year?',
//     price: '$323,90',
//   },
//   {
//     content: 'Roaring Kitty charged in 2002?',
//     price: '$1993,20',
//   },
// ];
interface SearchResultsProps {
  isLoading: boolean;
  results?: TBetItem[];
}

const SearchResults = ({ isLoading, results }: SearchResultsProps) => {
  if (isLoading) {
    return <SkeletonSearch />;
  }

  if (results?.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500">No results found</p>
    );
  }

  return (
    <div className="w-full">
      {results?.map((result) => (
        <ResultsItem
          key={result.id}
          content={result.name}
          price="0" // TODO: update later
        />
      ))}
    </div>
  );
};
interface SearchHeaderProps {
  handleCloseDrawer?: () => void;
}
const SearchHeader: React.FC<SearchHeaderProps> = ({ handleCloseDrawer }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [valueSearch, setValueSearch] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useDebounce(valueSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(e.target.value);
  };

  const {
    mutate: searchMutate,
    isPending: isSearchLoading,
    data: searchData,
  } = useMutation({
    mutationFn: (params: FilterParams) =>
      marketService.getSearchMarketService(params),
  });

  useEffect(() => {
    if (debouncedSearch) {
      searchMutate({ name: debouncedSearch });
    }
  }, [debouncedSearch, searchMutate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full">
      <Flex className="justify-end">
        <Button
          variant="terriary"
          size="icon"
          className="hidden-PC flex-grow-0"
          onClick={handleCloseDrawer}
        >
          <Svg src="/icons/arrow_back_ios.svg" />
        </Button>
        <div className="relative w-full flex-1 lg:max-w-[380px]">
          <Svg
            src="/icons/Search.svg"
            className="absolute top-1/2 -translate-y-1/2 left-3"
          />
          <Input
            placeholder="Search all of SweepStakes"
            autoComplete="off"
            type="text"
            value={valueSearch}
            className="placeholder:text-sm h-11 pl-7"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleSearch}
            ref={inputRef}
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
            className={`max-h-[328px] min-h-[200px] hidden-mobile overflow-y-auto p-2 rounded-md shadow-search-header overflow-x-hidden absolute bg-bg-surface w-full top-13 transition-all duration-300 ${
              isFocused ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          >
            <SearchResults isLoading={isSearchLoading} results={searchData} />
          </div>
        </div>
      </Flex>
      <ScrollArea className="hidden-PC ">
        <Flex className="mt-4 mb-2">
          <Typography.Text
            size={13}
            weight="semibold"
            className="text-text-subtle "
          >
            Search result
          </Typography.Text>
        </Flex>
        <SearchResults isLoading={isSearchLoading} results={searchData} />
      </ScrollArea>
    </div>
  );
};
export default SearchHeader;
