'use client';

import { useRouter } from 'next-nprogress-bar';
import type { FC } from 'react';
import { useSelector } from 'react-redux';

import { selectProfile } from '../store/profileSlice';

const withAuth = <P extends object>(Component: FC<P>) => {
  const Auth: FC<P> = (props: P) => {
    const router = useRouter();
    const { isLoggedIn } = useSelector(selectProfile);

    // Nếu người dùng chưa đăng nhập, điều hướng về trang chủ
    if (!isLoggedIn) {
      router.push('/');
      return null; // Ngăn việc render component khi chưa đăng nhập
    }

    // Nếu đã đăng nhập, render component gốc với các props
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
