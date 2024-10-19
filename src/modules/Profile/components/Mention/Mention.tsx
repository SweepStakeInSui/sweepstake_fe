import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';

import { CommentList } from '@/components/common/NestedComments';
import { MarketService } from '@/services/markets';
import { formatComments } from '@/utils/formatCommentList';
import { selectProfile } from '@/store/profileSlice';
import { useSelector } from 'react-redux';
import Empty from '@/components/common/Empty';

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
