import Container from '@/components/common/Container';
import Flex from '@/components/common/Flex';
import { Icons } from '@/components/common/Icon';
import Paper from '@/components/common/Paper';
import Typography from '@/components/common/Typography';
import { Avatar } from '@radix-ui/react-avatar';

export default function ElectionModule() {
  return (
    <Container className="pt-10 pb-10">
      <Paper>
        <Flex>
          <Avatar />
          <Typography.Heading size={28}>
            Despicable Me 4" Rotten Tomatoes score about ten?
          </Typography.Heading>
          <Icons.Link />
        </Flex>
      </Paper>
    </Container>
  );
}
