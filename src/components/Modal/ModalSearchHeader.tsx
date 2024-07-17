import { BadgePercentIcon, SearchIcon } from 'lucide-react';

import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { SkeletonSearch } from '../common/Skeleton';
import Typography from '../common/Typography';

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
    <Flex className="cursor-pointer justify-between p-2 overflow-hidden rounded-sm transition-colors hover:bg-elevation-a200">
      <Flex className="gap-4">
        <Avatar isRounded={false}>
          <AvatarImage src={avatar} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Stack className="gap-2">
          <Typography.Text>{content as string}</Typography.Text>
          <div className="text-elevation-a400 gap-x-1 flex items-center">
            <BadgePercentIcon width={14} height={14} />
            <Typography.Text className=" text-sm">
              {price as string}
            </Typography.Text>
          </div>
        </Stack>
      </Flex>
    </Flex>
  );
};
const ModalSearchHeader = () => {
  return (
    <div>
      <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
        <SearchIcon width={14} height={14} className="mr-2" />
        <input
          className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="Search all of Sweepstack"
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          type="text"
          value=""
        />
      </div>
      <div
        className="max-h-[300px] overflow-y-auto overflow-x-hidden"
        aria-label="Suggestions"
      >
        <div>
          <div
            className="overflow-hidden p-1 text-foreground"
            role="presentation"
          >
            <div aria-hidden="true" className="text-sm text-elevation-a800">
              Results
            </div>
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
      </div>
    </div>
  );
};

export default ModalSearchHeader;
