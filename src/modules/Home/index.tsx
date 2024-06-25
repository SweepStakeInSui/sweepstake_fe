import React from 'react';

import PopularTopic from './PopularTopic';
import SliderHero from './SliderHero';
import VoteCard from './VoteCards';

export default function HomeModule() {
  return (
    <div className="flex min-h-screen flex-col items-center px-10 pt-6">
      <SliderHero />
      <PopularTopic />
      <VoteCard />
    </div>
  );
}
