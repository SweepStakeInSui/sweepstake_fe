import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Empty from '@/components/common/Empty';
import { CommentList } from '@/components/common/NestedComments';
import { MarketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';
import { formatComments } from '@/utils/formatCommentList';

const Mention = () => {
  const { profile } = useSelector(selectProfile);
  const { data: mentionList } = useQuery({
    queryKey: ['mention'],
    queryFn: async () => MarketService.getUserComments(profile?.id),
    enabled: !!profile?.id,
  });

  const formattedMentions = useMemo(
    () => formatComments(mentionList?.items || []),
    [mentionList],
  );

  // console.log(mentionList)

  // console.log(formattedMentions)

  if (mentionList?.items.length === 0) {
    return <Empty content="No mention found" />;
  }

  return (
    <div>
      <CommentList comments={formattedMentions} isForDisplay />
    </div>
  );
};

export default Mention;
