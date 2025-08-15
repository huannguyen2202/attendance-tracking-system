'use client';

import { navLinks } from '@/constants/Constant';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiBars3BottomRight } from 'react-icons/hi2';
import { useRouter, usePathname } from 'next/navigation';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { FaChevronDown } from 'react-icons/fa';
import { LogOut, UserRound, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

// ✅ Dùng service thay vì js-cookie
import { getCurrentUser, postLogout, type User } from '@/server/modules/user/user.service';

type Props = {
  openNav: () => void;
};

const Nav = ({ openNav }: Props) => {
  const [navBg, setNavBg] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  // Hiệu ứng đổi nền khi scroll (UI cũ giữ nguyên)
  useEffect(() => {
    const handler = () => setNavBg(window.scrollY >= 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // ✅ Lấy thông tin user từ API (server đọc cookie HttpOnly)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const user = await getCurrentUser(); // /api/users/me
        if (!alive) return;
        setUserInfo(user);
        setIsLoggedIn(true);
      } catch {
        // 401: interceptor sẽ tự thử refresh; nếu refresh fail → rơi vào catch
        if (!alive) return;
        setUserInfo(null);
        setIsLoggedIn(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // ✅ Đăng xuất qua API (server xoá cookie HttpOnly)
  const handleLogout = async () => {
    try {
      await postLogout();
      toast.success('Đăng xuất thành công!');
      setUserInfo(null);
      setIsLoggedIn(false);
      router.push('/login'); // đổi nếu route login khác
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      toast.error('Không thể đăng xuất. Vui lòng thử lại!');
    }
  };

  // Đổi theme (UI cũ giữ nguyên)
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const backHomPage = () => router.push('/home');

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const dropdown = document.getElementById('user-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) setIsMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className={`fixed w-full transition-all duration-200 h-[8vh] z-[1001] ${
        navBg
          ? 'backdrop-blur-xl bg-white/50 dark:bg-background shadow-md border border-b-gray-100 dark:border-b-neutral-800'
          : 'border border-b-gray-200 dark:border-b-neutral-800 dark:bg-background'
      }`}
    >
      <div className="flex items-center h-full justify-between w-[90%] lg:w-[75%] mx-auto">
        {/* LOGO */}
        <Image
          onClick={backHomPage}
          data-aos="zoom-in"
          className="hidden md:block cursor-pointer"
          src="/svg-images/comon/5sao-logo-horizoltal.svg"
          alt="logo"
          width={1000}
          height={70}
          style={{ height: '80%', width: 'auto' }}
        />
        <Image
          onClick={backHomPage}
          data-aos="zoom-in"
          className="block md:hidden cursor-pointer"
          src="/svg-images/comon/star.svg"
          alt="logo"
          width={250}
          height={70}
          style={{ height: '80%', width: 'auto' }}
        />

        {/* NavLinks */}
        <div data-aos="zoom-in" className="hidden lg:flex items-center space-x-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link href={link.url} key={link.id}>
                <p className={`nav__link ${isActive ? 'active' : ''} dark:text-white`}>{link.label}</p>
              </Link>
            );
          })}
        </div>

        {/* User + Theme + Burger */}
        <div data-aos="zoom-in" className="flex items-center gap-6">
          {/* ✅ Hiển thị tên user khi đã đăng nhập */}
          {isLoggedIn && userInfo && (
            <div className="relative" id="user-dropdown">
              <div
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-blue-700 text-xl">
                  {userInfo.hoTen?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-white">
                  <div>{userInfo.hoTen}</div>
                  <FaChevronDown
                    className={`text-sm transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''}`}
                  />
                </div>
              </div>

              {isMenuOpen && (
                <div
                  data-aos="zoom-in"
                  className="absolute right-0 mt-3 w-60 rounded-md bg-white dark:bg-[#1f1f1f] shadow-md z-50 border border-gray-200 dark:border-neutral-700 py-5"
                >
                  <button
                    onClick={() => {
                      router.push('/profile');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-[15px] text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium"
                  >
                    <UserRound size={20} className="mr-2 text-blue-500" />
                    Thông tin cá nhân
                  </button>
                  <hr className="my-2 border-gray-100 dark:border-neutral-700" />
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-[15px] text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium"
                  >
                    <LogOut size={20} className="mr-2 text-blue-500" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Khi chưa đăng nhập: nút Đăng nhập (tuỳ UI bạn muốn) */}
          {!isLoggedIn && (
            <Button onClick={() => router.push('/login')} className="hidden md:inline-flex">
              Đăng nhập
            </Button>
          )}

          {/* Dark Mode Toggle */}
          <Button variant="outline" size="icon" onClick={toggleTheme} className="cursor-pointer">
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Burger menu */}
          <HiBars3BottomRight className="w-8 h-8 cursor-pointer text-black dark:text-white md:hidden" onClick={openNav} />
        </div>
      </div>
    </div>
  );
};

export default Nav;
