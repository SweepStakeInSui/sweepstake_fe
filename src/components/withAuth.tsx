/* eslint consistent-return: off */

'use client';

import { useRouter } from 'next-nprogress-bar';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectProfile } from '../store/profileSlice';

const withAuth = <P extends object>(Component: FC<P>) => {
  const Auth: FC<P> = (props: P) => {
    const router = useRouter();
    const { isLoggedIn } = useSelector(selectProfile);
    console.log(isLoggedIn, 'withAuth');

    // If the user is not logged in, navigate to the home page
    if (!isLoggedIn) {
      router.push('/');
      return;
    }

    // If logged in, render the root component with props
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
