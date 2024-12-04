import { Suspense } from 'react';

import HomeModule from '@/modules/Home';

import Loading from './loading';

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <HomeModule />
    </Suspense>
  );
}
