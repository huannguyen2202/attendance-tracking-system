'use client'

import { navLinks } from '@/constants/Constant'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiBars3BottomRight } from 'react-icons/hi2'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { FaChevronDown } from 'react-icons/fa'
import { LogOut, UserRound, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'

type Props = {
    openNav: () => void
}

type UserInfo = {
    hoTen: string
}

const Nav = ({ openNav }: Props) => {
    const [navBg, setNavBg] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 30) setNavBg(true)
            else setNavBg(false)
        }

        window.addEventListener('scroll', handler)
        return () => window.removeEventListener('scroll', handler)
    }, [])

    useEffect(() => {
        const token = Cookies.get('accessToken')
        setIsLoggedIn(!!token)
        const userInfoCookie = Cookies.get('userInfo')
        if (userInfoCookie) {
            try {
                const parsedUser = JSON.parse(userInfoCookie)
                setUserInfo(parsedUser)
            } catch (error) {
                console.error('Không thể parse userInfo từ cookie:', error)
            }
        }
    }, [])

    const handleButtonClick = () => {
        if (isLoggedIn) {
            toast.success('Đăng xuất thành công!')
            Cookies.remove('accessToken')
            Cookies.remove('refreshToken')
            Cookies.remove('userInfo')
            router.push('/login')
        } else {
            router.push('/login')
        }
    }

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const dropdown = document.getElementById('user-dropdown')
            if (dropdown && !dropdown.contains(e.target as Node)) {
                setIsMenuOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark')
    }

    return (
        <div
            className={`fixed w-full transition-all duration-200 h-[8vh] z-[1001] ${navBg
                ? 'backdrop-blur-xl bg-white/50 dark:bg-background shadow-md border border-b-gray-100 dark:border-b-neutral-800'
                : 'border border-b-gray-200 dark:border-b-neutral-800 dark:bg-background'
                }`}
        >
            <div className="flex items-center h-full justify-between w-[90%] lg:w-[75%] mx-auto">
                {/* LOGO */}
                <Image
                    data-aos="zoom-in"
                    className="hidden md:block"
                    src="/svg-images/comon/5sao-logo-horizoltal.svg"
                    alt="logo"
                    width={1000}
                    height={70}
                    style={{ height: '80%', width: 'auto' }}
                />
                <Image
                    data-aos="zoom-in"
                    className="block md:hidden"
                    src="/svg-images/comon/star.svg"
                    alt="logo"
                    width={250}
                    height={70}
                    style={{ height: '80%', width: 'auto' }}
                />

                {/* NavLinks */}
                <div
                    data-aos="zoom-in"
                    className="hidden lg:flex items-center space-x-10"
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.url
                        return (
                            <Link href={link.url} key={link.id}>
                                <p
                                    className={`nav__link ${isActive ? 'active' : ''
                                        } dark:text-white`}
                                >
                                    {link.label}
                                </p>
                            </Link>
                        )
                    })}
                </div>

                {/* User + Theme + Burger */}
                <div data-aos="zoom-in" className="flex items-center gap-6">
                    {isLoggedIn && userInfo && (
                        <div className="relative" id="user-dropdown">
                            <div
                                onClick={() => setIsMenuOpen((prev) => !prev)}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-300 flex items-center justify-center text-blue-700 text-xl">
                                    {userInfo.hoTen.charAt(0).toUpperCase()}
                                </div>
                                <div className="flex items-center gap-2 text-base font-medium text-gray-700 dark:text-white">
                                    <div>{userInfo.hoTen}</div>
                                    <FaChevronDown
                                        className={`text-sm transition-transform duration-200 ${isMenuOpen ? 'rotate-180' : ''
                                            }`}
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
                                            router.push('/profile')
                                            setIsMenuOpen(false)
                                        }}
                                        className="flex items-center w-full text-left px-4 py-2 text-[15px] text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-neutral-800 font-medium"
                                    >
                                        <UserRound size={20} className="mr-2 text-blue-500" />
                                        Thông tin cá nhân
                                    </button>
                                    <hr className="my-2 border-gray-100 dark:border-neutral-700" />
                                    <button
                                        onClick={() => {
                                            handleButtonClick()
                                            setIsMenuOpen(false)
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

                    {/* Dark Mode Toggle */}
                    <Button variant="outline" size="icon" onClick={toggleTheme} className='cursor-pointer'>
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>

                    {/* Burger menu */}
                    <HiBars3BottomRight className="w-8 h-8 cursor-pointer text-black dark:text-white md:hidden" onClick={openNav} />
                </div>
            </div>
        </div>
    )
}

export default Nav
