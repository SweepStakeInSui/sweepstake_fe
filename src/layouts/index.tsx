import NavBar from './components/NavBar';

interface IMyLayout {
  children: React.ReactElement;
}

export default function MyLayout({ children }: IMyLayout) {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>{children}</main>
      <footer />
    </>
  );
}
