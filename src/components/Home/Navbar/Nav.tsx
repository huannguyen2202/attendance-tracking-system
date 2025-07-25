'use client';
import { navLinks } from '@/constants/Constant';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // 👈 Nhớ cài: npm install js-cookie
import toast from 'react-hot-toast';
import Image from 'next/image';

type Props = {
    openNav: () => void
}

type UserInfo = {
    hoTen: string;
    // bạn có thể thêm các field khác như id, soDienThoai,... nếu cần
};

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 👈 Thêm state userInfo
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) setNavBg(true);
            if (window.scrollY < 90) setNavBg(false);
        };

        window.addEventListener("scroll", handler);
        return () => {
            window.removeEventListener("scroll", handler);
        };
    }, []);

    // 👇 Khi mounted, đọc từ cookie
    useEffect(() => {
        const token = Cookies.get("accessToken");
        setIsLoggedIn(!!token);
        const userInfoCookie = Cookies.get("userInfo");
        if (userInfoCookie) {
            try {
                const parsedUser = JSON.parse(userInfoCookie);
                setUserInfo(parsedUser);
            } catch (error) {
                console.error("Không thể parse userInfo từ cookie:", error);
            }
        }
    }, []);

    const handleButtonClick = () => {
        if (isLoggedIn) {
            toast.success('Đăng xuất thành công!');
            Cookies.remove("accessToken");
            Cookies.remove("userInfo");
            router.push("/login");
        } else {
            router.push("/login");
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const dropdown = document.getElementById("user-dropdown");
            if (dropdown && !dropdown.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`fixed ${navBg ? 'bg-white shadow-md' : "fixed"} w-full transition-all duration-200 h-[8vh] z-[1001]`}>
            <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
                {/* LOGO */}
                {/* <h1 className="text-xl md:text-3xl font-bold">
                    <span className="text-3xl md:text-4xl text-pink-700">A</span>
                    ppify
                </h1> */}
                <Image src="/svg-images/comon/star.svg" alt='hero' width={70} height={70}></Image>

                {/* NavLinks */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => (
                        <Link href={link.url} key={link.id}>
                            <p className="nav__link">{link.label}</p>
                        </Link>
                    ))}
                </div>

                {/* User Name & Button */}
                <div className="flex items-center space-x-4">
                    {isLoggedIn && userInfo && (
                        <div className="relative" id="user-dropdown">
                            <div
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-blue-700 text-xl">
                                    {userInfo.hoTen.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-base font-semibold text-gray-700 hidden md:inline">
                                    {userInfo.hoTen}
                                </span>
                            </div>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                                    <button
                                        onClick={() => {
                                            router.push('/profile');
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm1 2H9a4 4 0 00-4 4v1h10v-1a4 4 0 00-4-4z" />
                                        </svg>
                                        Thông tin cá nhân
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleButtonClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6 2a1 1 0 011 1v1h6V3a1 1 0 112 0v1a2 2 0 012 2v10a2 2 0 01-2 2v1a1 1 0 11-2 0v-1H7v1a1 1 0 11-2 0v-1a2 2 0 01-2-2V6a2 2 0 012-2V3a1 1 0 011-1zM5 6v10h10V6H5z" />
                                        </svg>
                                        Đăng xuất
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Burger menu */}
                <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-black md:hidden" />
            </div>
        </div>
    );
};

export default Nav;
