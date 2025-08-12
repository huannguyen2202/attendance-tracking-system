'use client'

//**React */
import React, { useEffect, useState } from 'react'

//**Next */
import Image from 'next/image'

//**Icon */
import { BsArrowRight } from "react-icons/bs";

const DownloadApp = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 300);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="w-full bg-[#F4F9FF] dark:bg-[#09090B] transition-colors duration-300">
            <div className="flex justify-center flex-col w-[90%] lg:w-[75%] md:w-[90%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-10 mb-10 gap-10">
                    {/* Text Content */}
                    <div data-aos="fade-right">
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                                <div className="flex gap-6 mt-8">
                                    <div className="h-12 w-52 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                                </div>
                                <div className="flex gap-10 mt-10">
                                    <div className="h-16 w-36 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                                    <div className="h-16 w-36 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
                                </div>
                                <div className="flex items-center gap-8 mt-6">
                                    <div className="h-20 w-20 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                    <div className="hidden md:block space-y-2">
                                        <div className="h-8 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                        <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h1 className="text-2xl sm:text-4xl mt-6 mb-6 font-bold text-justify text-black dark:text-white">
                                    Ứng dụng số 1 ngành xây dựng, chăm sóc nhà, sửa chữa vặt, gọi thợ thầu.
                                </h1>

                                <p className="text-gray-700 dark:text-gray-300">
                                    Tải ngay App 5Sao Partner để nhận việc làm và trải nghiệm các tiện ích trên ứng dụng!
                                </p>

                                <div className="flex mt-8 mb-8 items-center space-x-4 justify-between">
                                    <div>
                                        <button
                                            className="shine-effect font-semibold text-md sm:text-sm md:text-xl py-2 px-3 md:px-6 rounded-full shadow-lg cursor-pointer group flex items-center gap-2 border 
                                            bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#6EE7B7] transition-all duration-200 hover:scale-105
                                            text-white"
                                        >
                                            Tải App 5Sao Partner ngay
                                            <BsArrowRight
                                                size={22}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </button>

                                        <div className='flex gap-10 mt-10'>
                                            <Image src="/images/gp.png" alt='Play store' width={150} height={150} className="object-contain" />
                                            <Image src="/images/as.png" alt='App store' width={150} height={150} className="object-contain" />
                                        </div>
                                    </div>

                                    <Image className='hidden md:block' src="/images/comon/qr.png" alt='qr' width={150} height={150} />
                                </div>

                                <div className='flex items-center gap-8'>
                                    <Image src="/images/comon/avatar.png" alt='avatar' width={100} height={100} />
                                    <div className='text-md text-gray-900 dark:text-white font-medium'>
                                        <p>5000+</p>
                                        <p>Thợ thầu, đại lý hài lòng</p>
                                    </div>
                                    <div className='text-center hidden md:block'>
                                        <p>
                                            <span className='text-red-600 text-5xl font-semibold'>4.8</span>
                                            <span className='font-medium text-gray-900 dark:text-white text-xl'>/5</span>
                                        </p>
                                        <div>
                                            <button className="shine-effect text-yellow-400 text-3xl rounded-full">★★★★★★</button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Image App */}
                    <div
                        style={{ animation: 'wiggleX 2s ease-in-out infinite' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="hidden lg:flex justify-end"
                    >
                        {loading ? (
                            <div className="w-[400px] h-[500px] bg-gray-300 dark:bg-gray-700 rounded-xl animate-pulse" />
                        ) : (
                            <Image src="/images/app-partner.png" alt='hero' width={400} height={500} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadApp;
