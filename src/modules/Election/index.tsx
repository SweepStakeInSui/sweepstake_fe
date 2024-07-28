import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';

import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import Paper from '@/components/common/Paper';
import Stack from '@/components/common/Stack';
import Typography from '@/components/common/Typography';
import { Avatar } from '@/components/ui/avatar';

export default function ElectionModule() {
  return (
    <Container>
      <div className="grid grid-cols-12">
        <Stack className="col-span-9">
          <Paper>
            <Flex>
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Typography.Heading size={28}>
                Despicable Me 4&quot; Rotten Tomatoes score about ten?
              </Typography.Heading>
            </Flex>
          </Paper>
        </Stack>
        <Stack className="col-span-3">
          <Paper>
            <Flex className="">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Typography.Heading size={28}>
                Despicable Me 4&quot; Rotten Tomatoes score about ten?
              </Typography.Heading>
            </Flex>
          </Paper>
        </Stack>
      </div>
    </Container>
  );
}
