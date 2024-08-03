import React, { Fragment } from 'react';

import { Button } from '@/components/ui/button';

import Card from './Card';

const VoteCard = () => {
  return (
    <>
      <div className="grid grid-cols-autoFill w-full gap-4 py-8">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <Button variant="primary" className="my-6 block mx-auto w-fit">
        See more
      </Button>
    </>
  );
};

export default VoteCard;
