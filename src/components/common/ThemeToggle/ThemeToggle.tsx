import { useTheme } from 'next-themes';
import React from 'react';

import { Switch } from '@/components/ui/switch';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  return (
    <div>
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      />
    </div>
  );
};

export default ThemeToggle;
