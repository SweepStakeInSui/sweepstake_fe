import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React from 'react';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import { ROUTE } from '@/constants/routes';
import { MarketService } from '@/services/markets';
import { truncate } from '@/utils/truncate';

// import { Badge } from '@/components/ui/badge';
import Flex from '../Flex';
import IconButton from '../IconButton';
import { LinkBox } from '../LinkBox';
import Svg from '../Svg';
import Typography from '../Typography';

export interface ICommentProps {
  id: string;
  marketId: string;
  username?: string;
  userId?: string;
  avatar?: string;
  timestamp: string;
  content: string;
  likeCount?: number;
  replyCount?: number;
  likedByMe?: boolean;
  onReply: () => void;
  onLike: () => void;
  onShare: () => void;
  replyTo?: string;
  isMinimal?: boolean;
  isReplies?: boolean;
  isForDisplay?: boolean;
}

const Comment = ({
  id,
  marketId,
  username,
  userId,
  avatar,
  timestamp,
  content,
  likeCount,
  replyCount,
  likedByMe,
  onReply,
  onLike,
  onShare,
  replyTo,
  isMinimal = false,
  isReplies = false,
  isForDisplay = false,
}: ICommentProps) => {
  const { data: marketData } = useQuery({
    queryKey: ['market', id],
    queryFn: () => MarketService.getMarketDetails(marketId),
  });

  return (
    <div className="flex space-x-4 mb-4" key={id}>
      <CustomAvatar src={avatar} isRounded />
      <div className="flex-1">
        <Flex className="flex-col lg:flex-row items-start lg:items-center mb-1">
          <Flex className="justify-between">
            <h4 className="font-bold">{username || truncate(userId)}</h4>
            <span className="text-13 text-text-subtle">
              {format(new Date(timestamp), 'dd MMM')}
            </span>
          </Flex>
          {/* {isMinimal && !isReplies && (
            <Badge variant="bet_yes">Yes • Micheal Jack • 62% Chance</Badge>
          )} */}
        </Flex>
        <Typography.Text size={15} className="mb-2">
          {replyTo && <span className="font-bold">@{replyTo} </span>}
          {content}
        </Typography.Text>

        {!isMinimal && !isReplies && (
          <LinkBox
            href={`${ROUTE.MARKETS}/${marketId}`}
            title={marketData?.name}
            // bet={{
            //   type: 'no',
            //   subject: 'Micheal Jack',
            //   chance: 62,
            // }}
          />
        )}

        {!isForDisplay && (
          <Flex className="space-x-2">
            <Flex className="gap-1">
              <IconButton isRounded onClick={onLike}>
                {likedByMe ? (
                  <Svg
                    key={`${id}_liked`}
                    src="/icons/favorite_filled.svg"
                    className="text-r-50"
                  />
                ) : (
                  <Svg
                    key={`${id}_like`}
                    src="/icons/favorite_border.svg"
                    className="text-icon-subtle"
                  />
                )}
              </IconButton>

              <Typography.Text className="text-text-subtle">
                {likeCount}
              </Typography.Text>
            </Flex>
            <Flex className="gap-1">
              <IconButton isRounded onClick={onReply}>
                <Svg
                  src="/icons/chat_bubble_outline.svg"
                  className="text-text-subtle"
                />
              </IconButton>
              <Typography.Text className="text-text-subtle">
                {replyCount}
              </Typography.Text>
            </Flex>
            <IconButton isRounded onClick={onShare}>
              <Svg src="/icons/launch.svg" className="text-text-subtle" />
            </IconButton>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default Comment;
