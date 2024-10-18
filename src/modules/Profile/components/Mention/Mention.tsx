import React, { useMemo } from 'react';

import { CommentList } from '@/components/common/NestedComments';
import { useQuery } from '@tanstack/react-query';
import { formatComments } from '@/utils/formatCommentList';
import { marketService } from '@/services/markets';

const Mention = () => {
  const { data: mentionList } = useQuery({
    queryKey: ['mention'],
    queryFn: async () => marketService.getCommentListService(''),
  });

  const formattedMentions = useMemo(
    () => formatComments(mentionList?.items || []),
    [mentionList],
  );

  return (
    <div>
      <CommentList comments={formattedMentions} isForDisplay />
    </div>
  );
};

export default Mention;
