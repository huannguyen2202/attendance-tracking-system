'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import '../../styles/nprogress.css';

const PageLoading = () => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 300); // Bạn có thể thay đổi hoặc bỏ delay này

    return () => clearTimeout(timer);
  }, [pathname]);

  return null; // Không render gì nếu chỉ xử lý loading bar
};

export default PageLoading;