import { useQuery } from '@tanstack/react-query';

import { CommentForm, CommentList } from '@/components/common/NestedComments';
import { marketService } from '@/services/markets';

interface ICommentsProps {
  id: string;
}

const MarketsComments = ({ id }: ICommentsProps) => {
  const { data: commentsData } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => marketService.getCommentListService(id),
  });

  return (
    <section>
      <CommentForm marketId={id} />
      <CommentList comments={commentsData?.items || []} isMinimal />
    </section>
  );
};

export default MarketsComments;
