'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');

    if (accessToken) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [router]); // 👈 Thêm router vào dependencies
}