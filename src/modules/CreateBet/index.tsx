import React from 'react';

import Flex from '../../components/common/Flex';
import { Button } from '../../components/ui/button';
import { CreateBetFormModule } from './components/CreateBetForm';
import { PreviewBetModule } from './components/PreviewBet';

const CreateBetModule = () => {
  return (
    <>
      <Flex className="relative transition-all shrink-[100] items-start w-full gap-0">
        <PreviewBetModule />
        <CreateBetFormModule />
      </Flex>
      <div className="sticky bottom-0 flex justify-end w-full p-4 bottom-0 bg-bg-surface shadow-create-bet-shadow">
        <Button variant="ghost">Clear All</Button>
        <Button>Create Bet</Button>
      </div>
    </>
  );
};

export default CreateBetModule;
