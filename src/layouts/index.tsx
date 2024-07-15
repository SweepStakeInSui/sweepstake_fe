import { contentFont } from '@/constants/fonts';
import { cn } from '@/lib/utils';

import Footer from './components/Footer';
import NavBar from './components/NavBar';

interface IMyLayout {
  children: React.ReactElement;
}

export default function MyLayout({ children }: IMyLayout) {
  return (
    <div className={cn('relative', contentFont.className)}>
      <NavBar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
