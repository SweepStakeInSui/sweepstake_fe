import { Suspense } from 'react';

import MarketsModule from '@/modules/Markets';

import MarketsLayout from './layout';
import Loading from './loading';

export default function Election() {
  return (
    <MarketsLayout>
      <Suspense fallback={<Loading />}>
        <MarketsModule />
      </Suspense>
    </MarketsLayout>
  );
}
