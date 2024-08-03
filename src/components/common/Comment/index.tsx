'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import Flex from '../Flex';
import IconButton from '../IconButton';
import Svg from '../Svg';

export interface ICommentProps {
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  onReply: () => void;
  onLike: () => void;
  onShare: () => void;
}

const Comment = ({
  author,
  avatar,
  timestamp,
  content,
  onReply,
  onLike,
  onShare,
}: ICommentProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Avatar isRounded={false}>
        <AvatarImage src={avatar} alt={author} />
        <AvatarFallback className="rounded-sm">{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Flex className="items-center gap-2">
          <h4 className="font-bold">{author}</h4>
          <span className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </span>
          <Badge variant="bet_yes">Yes • Micheal Jack • 62% Chance</Badge>
        </Flex>
        <p className="mb-2">{content}</p>
        <div className="flex space-x-2">
          <IconButton isRounded onClick={onLike}>
            <Svg src="/icons/favorite_border.svg" />
          </IconButton>
          <IconButton isRounded onClick={onReply}>
            <Svg src="/icons/chat_bubble_outline.svg" />
          </IconButton>
          <IconButton isRounded onClick={onShare}>
            <Svg src="/icons/launch.svg" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Comment;
