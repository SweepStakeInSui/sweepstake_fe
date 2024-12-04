'use client';

import { usePathname } from 'next/navigation';

import MainFooter from './MainFooter';

const Footer = () => {
  const pathname = usePathname();

  const footerMap: Record<string, React.FC | null> = {
    '/create-bet': null, // No footer for this path
  };

  const FooterDisplay =
    footerMap[pathname] !== undefined ? footerMap[pathname] : MainFooter;

  return FooterDisplay ? <FooterDisplay /> : null;
};

export default Footer;
