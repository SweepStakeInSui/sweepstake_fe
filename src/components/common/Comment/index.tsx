'use client';

import React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import Svg from '../Svg';

export interface ICommentProps {
  author: string;
  avatar?: string;
  timestamp: string;
  content: string;
  onReply: () => void;
  onLike: () => void;
  onSave: () => void;
  onShare: () => void;
}

const Comment = ({
  author,
  avatar,
  timestamp,
  content,
  onReply,
  onLike,
  onSave,
  onShare,
}: ICommentProps) => {
  return (
    <div className="flex space-x-4 mb-4">
      <Avatar>
        <AvatarImage src={avatar} alt={author} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <h4 className="font-bold mr-2">{author}</h4>
          <span className="text-sm text-gray-500">
            {new Date(timestamp).toLocaleString()}
          </span>
        </div>
        <p className="mb-2">{content}</p>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={onReply}>
            <Svg src="/icons/chat_bubble_outline.svg" />
            Reply
          </Button>
          <Button variant="ghost" size="sm" onClick={onLike}>
            <Svg src="/icons/favorite_border.svg" />
            Like
          </Button>
          <Button variant="ghost" size="sm" onClick={onSave}>
            <Svg src="/icons/bookmark_border.svg" />
            Save
          </Button>
          <Button variant="ghost" size="sm" onClick={onShare}>
            <Svg src="/icons/launch.svg" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Comment;
