import { GiftIcon, MessageCircleIcon, PinIcon, Star } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

const Card = () => {
  return (
    <div className="p-4 bg-elevation-a100 rounded-lg relative">
      <div className="relative">
        <div className="flex gap-x-4 sticky top-0">
          <Image
            src="/images/avatar.png"
            width={300}
            height={300}
            alt="avatar"
            className="object-cover w-6 h-6"
          />
          <p className="text-lg font-medium text-elevation-a700">Torkaholic</p>
        </div>
        <div className="max-h-[120px] overflow-y-scroll flex flex-col gap-y-4 pb-10">
          <div className="flex justify-between text-base items-center">
            <p className="text-elevation-a700 font-medium">Donald Trump</p>
            <div className="flex gap-x-2 items-center">
              <span>59%</span>
              <Button variant="accent_green" className="py-[10px] group w-16">
                <p className="group-hover:hidden">Yes</p>
                <p className="group-hover:block hidden">21%</p>
              </Button>
              <Button variant="accent_red" className="py-[10px] group w-16">
                <p className="group-hover:hidden">No</p>
                <p className="group-hover:block hidden">12%</p>
              </Button>
            </div>
          </div>
          <div className="flex justify-between text-base items-center ">
            <p className="text-elevation-a700 font-medium">Donald Trump</p>
            <div className="flex gap-x-2 items-center">
              <span>59%</span>
              <Button variant="accent_green" className="py-[10px] group w-16">
                <p className="group-hover:hidden">Yes</p>
                <p className="group-hover:block hidden">21%</p>
              </Button>
              <Button variant="accent_red" className="py-[10px] group w-16">
                <p className="group-hover:hidden">No</p>
                <p className="group-hover:block hidden">12%</p>
              </Button>
            </div>
          </div>
          <div className="flex justify-between text-base items-center ">
            <p className="text-elevation-a700 font-medium">Donald Trump</p>
            <div className="flex gap-x-2 items-center">
              <span>59%</span>
              <Button variant="accent_green" className="py-[10px] group w-16">
                <p className="group-hover:hidden">Yes</p>
                <p className="group-hover:block hidden">21%</p>
              </Button>
              <Button variant="accent_red" className="py-[10px] group w-16">
                <p className="group-hover:hidden">No</p>
                <p className="group-hover:block hidden">12%</p>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-elevation-a200 rounded-lg p-2 text-xs text-elevation-a500 flex justify-between">
          <div className="flex items-center">
            <PinIcon width={16} height={16} />
            <p>$101.5m Bet</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <GiftIcon width={16} height={16} />
            <MessageCircleIcon width={16} height={16} />
            287
            <Star width={16} height={16} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
