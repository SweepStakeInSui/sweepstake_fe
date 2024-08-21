import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import Flex from '../Flex';
import IconButton from '../IconButton';
import { LinkBox } from '../LinkBox';
import Svg from '../Svg';
import Typography from '../Typography';

export interface ICommentProps {
  id: string;
  author: string;
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
  author,
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
  return (
    <div className="flex space-x-4 mb-4" key={id}>
      <Avatar>
        <AvatarImage src={avatar} alt={author} />
        <AvatarFallback className="rounded-sm">{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Flex className="items-center gap-2">
          <h4 className="font-bold">{author}</h4>
          <span className="text-sm text-text-subtle">
            {new Date(timestamp).toLocaleString()}
          </span>
          {isMinimal && !isReplies && (
            <Badge variant="bet_yes">Yes • Micheal Jack • 62% Chance</Badge>
          )}
        </Flex>
        <p className="mb-2">
          {replyTo && <span className="font-bold">@{replyTo} </span>}
          {content}
        </p>

        {!isMinimal && !isReplies && (
          <LinkBox
            href=""
            title="Richest person in the world at the end of this dang year?"
            bet={{
              type: 'no',
              subject: 'Micheal Jack',
              chance: 62,
            }}
          />
        )}

        {!isForDisplay && (
          <Flex className="space-x-2">
            <Flex className="gap-1">
              <IconButton
                isRounded
                onClick={onLike}
                className={likedByMe ? 'bg-red-50' : ''}
              >
                {likedByMe ? (
                  <Svg src="/icons/favorite_filled.svg" className="text-r-50" />
                ) : (
                  <Svg
                    src="/icons/favorite_border.svg"
                    className="text-icon-subtle"
                  />
                )}
              </IconButton>
              {likeCount && (
                <Typography.Text className="text-text-subtle">
                  {likeCount}
                </Typography.Text>
              )}
            </Flex>
            <Flex className="gap-1">
              <IconButton isRounded onClick={onReply}>
                <Svg src="/icons/chat_bubble_outline.svg" />
              </IconButton>
              {replyCount && (
                <Typography.Text className="text-text-subtle">
                  {replyCount}
                </Typography.Text>
              )}
            </Flex>
            <IconButton isRounded onClick={onShare}>
              <Svg src="/icons/launch.svg" />
            </IconButton>
          </Flex>
        )}
      </div>
    </div>
  );
};

export default Comment;
