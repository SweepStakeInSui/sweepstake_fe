import { useQuery } from '@tanstack/react-query';

import { CommentForm, CommentList } from '@/components/common/NestedComments';
import { mockNestedComments } from '@/mocks/mockComments';
import { marketService } from '@/services/markets';

interface ICommentsProps {
  id: string;
}

const MarketsComments = ({ id }: ICommentsProps) => {
  const { data: commentsData } = useQuery({
    queryKey: ['comments', id],
    queryFn: async () => marketService.getCommentListService({ marketId: id }),
  });

  // TODO: return data
  console.log(commentsData);

  return (
    <section>
      <CommentForm marketId={id} />
      <CommentList comments={mockNestedComments} isMinimal />
    </section>
  );
};

export default MarketsComments;
