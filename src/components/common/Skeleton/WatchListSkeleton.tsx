import { Skeleton } from '../../ui/skeleton';
import Flex from '../Flex';
import Stack from '../Stack';

const WatchListSkeleton = () => {
  return (
    <aside className="sticky flex flex-col top-[4.75rem] px-6 pr-3 py-5 w-[5.5rem] h-[calc(100vh-4.75rem)] border-r border-solid border-borderSubtle overflow-hidden transition-all">
      <Flex className="relative justify-end pr-3 mb-6">
        <Skeleton className="rounded-full size-10" />
      </Flex>

      <div className="h-full pr-3">
        {[...Array(5)].map((_, index) => (
          <div key={index.toString()} className="mb-4">
            <Stack className="mb-4 transition-all">
              <Flex className="items-start gap-3 justify-between">
                <Skeleton className="size-10" />
              </Flex>
            </Stack>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default WatchListSkeleton;
