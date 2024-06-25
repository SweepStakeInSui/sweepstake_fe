import React, { Fragment } from 'react';

import { Button } from '@/components/ui/button';

import Card from './Card';

const VoteCard = () => {
  return (
    <>
      <div className="grid grid-cols-autoFill w-full gap-4 mt-4">
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
      <Button variant="light_outline" className="my-4">
        See more
      </Button>
    </>
  );
};

export default VoteCard;
