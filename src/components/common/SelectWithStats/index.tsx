import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Flex from '../Flex';
import Typography from '../Typography';

const mockOptions = [
  {
    value: 'chocolate',
    label: {
      topic: 'Donald Trump',
      chance: 15,
      percent: -5,
    },
  },
  {
    value: 'strawberry',
    label: {
      topic: 'Hilary Clinton',
      chance: 15,
      percent: 6,
    },
  },
  {
    value: 'vanilla',
    label: {
      topic: 'Joe Bidden',
      chance: 12,
      percent: 0,
    },
  },
];

interface ISelectOptionProps {
  label: {
    topic: string;
    chance: number;
    percent: number;
  };
}

function SelectOption({ label }: Readonly<ISelectOptionProps>) {
  const { topic, chance, percent } = label;
  return (
    <Flex>
      <Avatar size="sm" isRounded={false}>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback />
      </Avatar>
      <div>
        <Typography.Text>{topic}</Typography.Text>
        <Flex>
          <Typography.Text>{chance}</Typography.Text>
          <Typography.Text>{percent}</Typography.Text>
        </Flex>
      </div>
    </Flex>
  );
}

export default function SelectWithStats() {
  return (
    <Select>
      <SelectTrigger className="bg-dyb-100 border-white/15 text-dyb-5">
        <SelectValue
          placeholder={<SelectOption label={mockOptions[0].label} />}
        />
      </SelectTrigger>
      <SelectContent className="bg-dyb-100 border-white/15 text-dyb-5">
        <SelectItem value="light" className="focus:bg-dyb-90 focus:text-dyb-5">
          Light
        </SelectItem>
        <SelectItem value="dark" className="focus:bg-dyb-90 focus:text-dyb-5">
          Dark
        </SelectItem>
        <SelectItem value="system" className="focus:bg-dyb-90 focus:text-dyb-5">
          System
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
