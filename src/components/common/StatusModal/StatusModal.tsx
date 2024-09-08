import Link from 'next/link';
import React from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { Button } from '../../ui/button';
import Flex from '../Flex';
import { LoadingSpinner } from '../LoadingSpinner';
import Stack from '../Stack';
import Svg from '../Svg';
import Typography from '../Typography';

interface IStatusModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  isLoading?: boolean;
  status?: string;
  title?: string;
  message?: string;
  txs?: string;
}

const StatusModal = ({
  open,
  onOpenChange,
  isLoading,
  status,
  title,
  message,
  txs,
}: IStatusModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="mb-3">
          <DialogTitle>
            <Stack className="justify-center items-center">
              <div className="mb-4 size-15">
                {isLoading && <LoadingSpinner />}
                {status === 'success' && <Svg src="/icons/check_modal.svg" />}
                {status === 'fail' && <Svg src="/icons/cross_modal.svg" />}
              </div>
              <Typography.Heading size={24} className="text-center">
                {title}
              </Typography.Heading>
            </Stack>
          </DialogTitle>
          <DialogDescription>
            <Typography.Text size={13} className="text-center text-text-subtle">
              {message}
            </Typography.Text>
          </DialogDescription>
        </DialogHeader>

        {txs && status === 'success' && (
          <DialogFooter>
            <Flex className="w-full flex justify-center">
              <Link
                href={`https://suiscan.xyz/mainnet/tx/${txs}`}
                target="_blank"
              >
                <Button variant="ghost" className="text-text-support-blue">
                  View on Suiscan
                  <Svg src="/icons/north_east.svg" />
                </Button>
              </Link>
            </Flex>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default StatusModal;
