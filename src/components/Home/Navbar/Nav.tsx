'use client';
import { navLinks } from '@/constants/Constant';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiBars3BottomRight } from "react-icons/hi2";
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // 👈 Nhớ cài: npm install js-cookie
import toast from 'react-hot-toast';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { GoPerson } from "react-icons/go";
import { GoMoveToEnd } from "react-icons/go";

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
        <div className={`fixed ${navBg ? 'backdrop-blur-xl bg-white/50 shadow-md' : "fixed border-b border-b-gray-200"} w-full transition-all duration-200 h-[10vh] z-[1001]`}>
            <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
                {/* LOGO */}
                {/* <h1 className="text-xl md:text-3xl font-bold">
                    <span className="text-3xl md:text-4xl text-pink-700">A</span>
                    ppify
                </h1> */}
                <Image
                    className='hidden md:block'
                    src="/svg-images/comon/5sao-logo-horizoltal.svg"
                    alt="hero"
                    width={250}
                    height={70}
                    style={{ height: '100%', width: 'auto' }}
                />

                <Image
                    className='block md:hidden'
                    src="/svg-images/comon/star.svg"
                    alt="hero"
                    width={250}
                    height={70}
                    style={{ height: '80%', width: 'auto' }}
                />

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
                                <div className="flex items-center gap-2 text-base font-semibold text-gray-700">
                                    <div>{userInfo.hoTen}</div>
                                    <FaChevronDown className={`text-sm transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </div>

                            {isMenuOpen && (
                                <div
                                    data-aos="zoom-in"
                                    className="absolute right-0 mt-3 w-52 rounded-md bg-white shadow-md z-50 border border-gray-200 py-5"
                                >
                                    <button
                                        onClick={() => {
                                            router.push('/profile');
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-[15px] text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <GoPerson className='mr-2 text-xl text-blue-600' />
                                        Thông tin cá nhân
                                    </button>

                                    <button
                                        onClick={() => {
                                            handleButtonClick();
                                            setIsMenuOpen(false);
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-[15px] text-gray-800 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <GoMoveToEnd className='mr-2 text-xl text-blue-600' />
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
