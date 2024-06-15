import { ThemeProvider } from '@/contexts/themeContext';

interface ProvidersProps {
  children: React.ReactElement;
}

export default function Providers({ children }: Readonly<ProvidersProps>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
