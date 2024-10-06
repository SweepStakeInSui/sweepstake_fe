import Link from 'next/link';

import { NotificationDropdown } from '@/components/Login/Notification';

import Flex from '../common/Flex';
import MenuHeader from '../common/Menu/MenuHeader';
import Svg from '../common/Svg';
import { SearchHeaderMobile } from '../Search';
import { Button } from '../ui/button';

const LoggedIn = () => {
  return (
    <Flex>
      <Link href="/create-bet">
        <Button className="gap-x-2" size="lg">
          <Svg src="/icons/add.svg" className="hidden-mobile" />
          Create bet
        </Button>
      </Link>
      <div className="hidden-PC">
        <SearchHeaderMobile />
      </div>

      <div className="hidden-mobile">
        <NotificationDropdown />
      </div>

      <MenuHeader />
    </Flex>
  );
};

export default LoggedIn;
