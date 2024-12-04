import 'swiper/css';
import 'swiper/css/effect-cards';
import 'swiper/css/navigation';

import Footer from './components/Footer';
import NavBar from './components/NavBar';

interface IMyLayout {
  children: React.ReactElement;
}

export default function MyLayout({ children }: IMyLayout) {
  return (
    <div className="relative">
      <NavBar />

      <main>{children}</main>

      <Footer />
    </div>
  );
}
