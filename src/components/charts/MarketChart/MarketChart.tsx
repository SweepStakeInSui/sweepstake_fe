import Image from 'next/image';
import React from 'react';

import TimeFilter from '@/components/charts/TimeFilter/TimeFilter';

const MarketChart = () => {
  return (
    <div className="my-6">
      <div className="relative w-full aspect-[675/223] mb-10">
        <Image src="/images/mockchart.png" alt="chart" fill />
      </div>
      <TimeFilter />
    </div>
  );
};

export default MarketChart;
