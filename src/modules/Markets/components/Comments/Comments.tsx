import { CommentForm, CommentList } from '@/components/common/NestedComments';
import { mockNestedComments } from '@/mocks/mockComments';

const MarketsComments = () => {
  return (
    <section>
      <CommentForm />
      <CommentList comments={mockNestedComments} />
    </section>
  );
};

export default MarketsComments;
