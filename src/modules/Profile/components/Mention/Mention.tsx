import React from 'react';

import { CommentList } from '@/components/common/NestedComments';

const Mention = () => {
  return (
    <div>
      <CommentList comments={[]} isForDisplay />
    </div>
  );
};

export default Mention;
