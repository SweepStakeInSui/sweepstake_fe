import { useSelector } from 'react-redux';

import { CustomAvatar } from '@/components/common/CustomAvatar';
import Flex from '@/components/common/Flex';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { selectProfile } from '@/store/profileSlice';
import { briefDocument } from '@/utils/formatText';
import { truncate } from '@/utils/truncate';

import { EditProfile } from '../EditProfile';

const Information = () => {
  const { profile } = useSelector(selectProfile);

  return (
    <Flex className="justify-between items-start">
      <Flex className="gap-x-6">
        <CustomAvatar
          address={profile?.address}
          src={profile?.avatar}
          size="xl"
          isRounded
        />
        <Stack className="justify-between">
          <Stack className="gap-y-0.5">
            <Typography.Heading>
              {profile?.username && truncate(profile?.username, 50)}
            </Typography.Heading>
            <div className="bg-bg-sublest rounded-full py-0.5 px-2 flex justify-center w-fit">
              <Typography.Text size={13}>
                {profile?.address && briefDocument(profile.address, 5, 5)}
              </Typography.Text>
            </div>
          </Stack>
          <Flex>
            <Typography.Text
              size={13}
              className="text-text-support-yellow"
              weight="medium"
            >
              Rank:
            </Typography.Text>
            <Typography.Text
              size={13}
              className="text-text-support-yellow"
              weight="medium"
            >
              #{profile?.rank}
            </Typography.Text>
          </Flex>
        </Stack>
      </Flex>
      {profile && <EditProfile />}
    </Flex>
  );
};

export default Information;
