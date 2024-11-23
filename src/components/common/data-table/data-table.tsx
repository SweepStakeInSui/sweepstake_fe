import type {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  // HERE
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import Empty from '../Empty';

interface PageData<TData> {
  items: TData[];
  meta?: {
    totalItems: number;
  };
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  fetchNextPage: () => void;
  isFetching: boolean;
  data: {
    pages: PageData<TData>[];
  };
  title: string;
  // table: TanstackTable<TData>; //HERE
}

export function DataTable<TData, TValue>({
  columns,
  fetchNextPage,
  isFetching,
  data,
  title,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  // STATES:
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);
  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  // flatten the array of arrays from the useInfiniteQuery hook
  const flatData = useMemo(
    () => data?.pages?.flatMap((page) => page.items) ?? [],
    [data],
  );

  const totalDBRowCount = data?.pages?.[0]?.meta?.totalItems ?? 0;
  const totalFetched = flatData.length;

  // called on scroll and possibly on mount to fetch more data as the user scrolls and reaches bottom of table
  const fetchMoreOnBottomReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        // once the user has scrolled within 400px of the bottom of the table, fetch more data if we can
        if (
          scrollHeight - scrollTop - clientHeight < 400 &&
          !isFetching &&
          totalFetched < totalDBRowCount
        ) {
          fetchNextPage();
        }
      }
    },
    [fetchNextPage, isFetching, totalFetched, totalDBRowCount],
  );

  // a check on mount and after a fetch to see if the table is already scrolled to the bottom and immediately needs to fetch more data
  React.useEffect(() => {
    fetchMoreOnBottomReached(tableContainerRef.current);
  }, [fetchMoreOnBottomReached]);
  const table = useReactTable({
    data: flatData,
    columns,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    // row selection
    onRowSelectionChange: setRowSelection,
    // sorting:
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      columnOrder,
    },
    // pagination:
    getPaginationRowModel: getPaginationRowModel(),
    // Order of columns
    onColumnOrderChange: setColumnOrder,

    // filters
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),

    // Faceted filters:
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),

    // Visibility:
    onColumnVisibilityChange: setColumnVisibility,
    manualSorting: true,
    debugTable: true,
  });
  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, // estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    // measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });
  // console.log(virtualizer.getVirtualItems()?.length, columns.length);

  return (
    <div
      onScroll={(e) => fetchMoreOnBottomReached(e.target as HTMLDivElement)}
      ref={tableContainerRef}
      style={{
        overflow: 'auto', // our scrollable table container
        position: 'relative', // needed for sticky header
        height: '400px', // should be a fixed height
      }}
    >
      {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
      <Table style={{ display: 'grid' }}>
        <TableHeader
          style={{
            display: 'grid',
            position: 'sticky',
            top: 0,
            zIndex: 1,
          }}
        >
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              style={{ display: 'flex', width: '100%' }}
              key={headerGroup.id}
              className="hover:bg-inherit"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    style={{
                      display: 'flex',
                      width: header.getSize(),
                    }}
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody
          style={{
            display: 'grid',
            height: `${virtualizer.getTotalSize()}px`, // tells scrollbar how big the table is
            position: 'relative', // needed for absolute positioning of rows
          }}
        >
          {virtualizer.getVirtualItems()?.length > 0 ? (
            <>
              {virtualizer.getVirtualItems()?.map((virtualRow) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    data-index={virtualRow.index} // needed for dynamic row height measurement
                    ref={(node) => virtualizer.measureElement(node)} // measure dynamic row height
                    key={row.id}
                    style={{
                      display: 'flex',
                      position: 'absolute',
                      transform: `translateY(${virtualRow.start}px)`, // this should always be a `style` as it changes on scroll
                      width: '100%',
                    }}
                    className="hover:cursor-pointer"
                    onClick={() =>
                      // @ts-ignore:next-line
                      router.push(`/markets/${row.original.outcome.marketId}`)
                    }
                    data-state={row?.getIsSelected() && 'selected'}
                  >
                    {row?.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          display: 'flex',
                          width: cell.column.getSize(),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}

              {/* <Loader2
              ref={ref}
              className="react-table my-4 h-8 w-8 animate-spin"
            /> */}
            </>
          ) : (
            <TableRow className="hover:bg-inherit">
              <TableCell
                colSpan={columns.length}
                className="text-center grid h-fit"
              >
                <Empty content={`No ${title} found`} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    // {isFetching && <div>Fetching More...</div>}
  );
}
