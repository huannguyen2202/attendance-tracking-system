'use client'; // 👈 Dòng này là bắt buộc
import Home from '@/components/Home/Home'
import React from 'react'
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';

const HomePage = () => {
    // const router = useRouter();

    // useEffect(() => {
    //     const isLoggedIn = localStorage.getItem('token'); // Hoặc kiểm tra cookie/session
    //     if (!isLoggedIn) {
    //         router.push('/login'); // Chuyển về trang login nếu chưa đăng nhập
    //     }
    // }, []);
    return (
        <div>
            <Home></Home>
        </div>
    )
}

export default HomePage