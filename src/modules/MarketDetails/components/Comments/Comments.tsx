import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import Empty from '@/components/common/Empty';
import { CommentForm, CommentList } from '@/components/common/NestedComments';
import { MarketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';
import { formatComments } from '@/utils/formatCommentList';

const MarketsComments = () => {
  const params = useParams<{ id: string }>();

  // HOOKS
  const queryClient = useQueryClient();
  const { profile } = useSelector(selectProfile);

  // QUERIES
  const { data: commentsData } = useQuery({
    queryKey: ['comments', params],
    queryFn: async () => MarketService.getCommentList(params.id),
  });

  const { mutate: createCommentMutate, isPending: isCreateCommentPending } =
    useMutation({
      mutationFn: MarketService.createComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
    });

  const { mutate: likeCommentMutate, isPending: isLikeCommentPending } =
    useMutation({
      mutationFn: MarketService.postLikeComment,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] });
      },
    });

  // FUNCTIONS
  const formattedComments = useMemo(
    () => formatComments(commentsData?.items || []),
    [commentsData],
  );

  return (
    <section>
      <CommentForm
        marketId={params.id}
        onCreate={createCommentMutate}
        isPending={isCreateCommentPending}
      />

      {formattedComments.length > 0 ? (
        <CommentList
          userId={profile?.id}
          marketId={params.id}
          comments={formattedComments}
          isMinimal
          onCreate={createCommentMutate}
          onLike={likeCommentMutate}
          isPending={isCreateCommentPending || isLikeCommentPending}
        />
      ) : (
        <Empty content="No comments yet" />
      )}
    </section>
  );
};

export default MarketsComments;
