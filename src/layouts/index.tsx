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
