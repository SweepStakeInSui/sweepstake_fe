import { useTheme } from 'next-themes';
import React from 'react';

import { Button } from '@/components/ui/button';
import { TabsSub, TabsSubList, TabsSubTrigger } from '@/components/ui/tabSub';

import Svg from '../Svg';

interface ThemeToggleProps {
  option: 'switch' | 'toggle';
}
const ThemeToggle: React.FC<ThemeToggleProps> = ({ option }) => {
  const { setTheme, theme } = useTheme();
  const onChangeTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  if (option === 'toggle') {
    return (
      <Button variant="ghost" onClick={onChangeTheme}>
        <Svg src="/icons/Moon.svg" width={24} height={24} />
      </Button>
    );
  }
  console.log(theme);

  return (
    <div>
      <TabsSub defaultValue={theme} className="w-fit ">
        <TabsSubList className="h-7 p-[1px]">
          <TabsSubTrigger
            value="dark"
            className="p-1"
            onClick={() => setTheme('dark')}
          >
            <Svg src="/icons/Moon.svg" />
          </TabsSubTrigger>
          <TabsSubTrigger
            value="light"
            className="p-1"
            onClick={() => setTheme('light')}
          >
            <Svg src="/icons/Sun.svg" />
          </TabsSubTrigger>
        </TabsSubList>
      </TabsSub>
    </div>
  );
};

export default ThemeToggle;
