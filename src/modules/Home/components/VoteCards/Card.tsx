import Image from 'next/image';

import Flex from '@/components/common/Flex';
import Typography from '@/components/common/Typography';

const Card = () => {
  return (
    <div className="p-4 border border-dyb-10 rounded-lg relative">
      <div className="relative">
        <Flex className="gap-x-4 sticky top-0">
          <Image
            src="/images/avatar.png"
            width={300}
            height={300}
            alt="avatar"
            className="object-cover w-12 h-12 rounded-sm"
          />
          <div>
            <Typography.Text size={15} className="text-text">
              Richest person in the world at the end of the year?
            </Typography.Text>
            <Typography.Text size={10} className="text-dyb-50">
              32,900 vol
            </Typography.Text>
          </div>
        </Flex>
      </div>
    </div>
  );
};

export default Card;
