import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { CommentForm, CommentList } from '@/components/common/NestedComments';
import { MarketService } from '@/services/markets';
import { selectProfile } from '@/store/profileSlice';
import { formatComments } from '@/utils/formatCommentList';

interface ICommentsProps {
  id: string;
}

const MarketsComments = ({ id }: ICommentsProps) => {
  // HOOKS
  const queryClient = useQueryClient();
  const { profile } = useSelector(selectProfile);

  // QUERIES
  const { data: commentsData } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => MarketService.getCommentList(id),
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
      {profile && (
        <CommentForm
          marketId={id}
          onCreate={createCommentMutate}
          isPending={isCreateCommentPending}
        />
      )}
      <CommentList
        marketId={id}
        comments={formattedComments}
        isMinimal
        onCreate={createCommentMutate}
        onLike={likeCommentMutate}
        isPending={isCreateCommentPending || isLikeCommentPending}
      />
    </section>
  );
};

export default MarketsComments;
