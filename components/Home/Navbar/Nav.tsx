'use client';
import { navLinks } from '@/constant/Constant'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { HiBars3BottomRight } from "react-icons/hi2";

type Props = {
    openNav: () => void
}

const Nav = ({ openNav }: Props) => {

    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        const handler = () => {
            if (window.scrollY >= 90) setNavBg(true);
            if (window.scrollY < 90) setNavBg(false);
        };

        window.addEventListener("scroll", handler);

        return () => {
            window.removeEventListener("scroll", handler)
        };
    }, []);

    return (
        <div className={`fixed ${navBg ? 'bg-white shadow-md' : "fixed"} w-full transition-all duration-200 h-[12vh] z-[1000]`}>
            <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
                {/* LOGO */}
                <h1 className="text-xl md:text-3xl font-bold">
                    <span className="text-3xl md:text-4xl text-pink-700">A</span>
                    ppify
                </h1>

                {/* NavLinks */}
                <div className="hidden lg:flex items-center space-x-10">
                    {navLinks.map((link) => {
                        return (
                            <Link href={link.url} key={link.id}>
                                <p className="nav__link">{link.label}</p>
                            </Link>
                        );
                    })}
                </div>

                {/* Button */}
                <div className="flex items-center space-x-4">
                    <button className="md:px-8 md:py-2.5 px-6 py-2 text-white font-semibold text-base bg-blue-700 hover:bg-blue-900 transition-all duration-200 rounded-full">Join Now</button>
                </div>

                {/* Burger menu */}
                <HiBars3BottomRight onClick={openNav} className="w-8 h-8 cursor-pointer text-black md:hidden" />
            </div>
        </div>
    )
}

export default Nav