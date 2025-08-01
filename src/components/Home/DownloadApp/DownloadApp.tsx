'use client'

//**React */
import React from 'react'

//**Next */
import Image from 'next/image'

//**Icon */
import { BsArrowRight } from "react-icons/bs";

const DownloadApp = () => {
    return (
        <div className="w-full bg-[#F4F9FF]">
            <div className="flex justify-center flex-col w-[90%] sm:w-[80%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap- mt-10 mb-10">
                    {/* Text Content */}
                    <div>
                        <h1 data-aos="fade-up" className="text-2xl sm:text-4xl mt-6 mb-6 font-bold text-justify">
                            Ứng dụng số 1 ngành xây dựng, chăm sóc nhà, sửa chữa vặt, gọi thợ thầu.
                        </h1>

                        <p className="text-gray-700">Tải ngay App 5Sao Partner để nhận việc làm và trải nghiệm các tiện ích trên ứng dụng!</p>

                        <div className="flex mt-8 mb-8 items-center space-x-4 justify-between">
                            <div>
                                <div
                                    data-aos="fade-up"
                                    className="shine-effect relative w-fit py-2 px-3 md:px-6 rounded-full shadow-lg flex items-center space-x-3 
                                                bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 
                                                 hover:from-purple-700 hover:to-pink-600 
                                                transition-all duration-300 backdrop-blur-sm"
                                >
                                    <p className="text-md sm:text-sm flex items-center gap-2 text-white md:text-xl font-semibold tracking-wide">
                                        Tải App 5Sao Partner ngay <BsArrowRight />
                                    </p>
                                </div>

                                <div className='flex gap-10 mt-10'>
                                    <Image src="/images/gp.png" alt='Play store' width={150} height={150} className="object-contain" />
                                    <Image src="/images/as.png" alt='App store' width={150} height={150} className="object-contain" />
                                </div>
                            </div>
                            <Image className='hidden md:block' src="/images/comon/qr.png" alt='qr' width={150} height={150} />
                        </div>

                        <div className='flex items-center gap-8'>
                            <Image src="/images/comon/avatar.png" alt='avatar' width={100} height={100} />
                            <div className='text-md text-gray-900 font-medium'>
                                <p>5000+</p>
                                <p>Thợ thầu, đại lý hài lòng</p>
                            </div>
                            <div className='text-center hidden md:block'>
                                <p >
                                    <span className='text-red-600 text-5xl font-semibold'>4.8</span>
                                    <span className='font-medium text-gray-900 text-xl'>/5</span>
                                </p>
                                <div>
                                    <span className="shine-effect text-yellow-400 text-3xl">★★★★★★</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image App */}
                    <div
                        style={{ animation: 'wiggleX 2s ease-in-out infinite' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="hidden lg:flex justify-end"
                    >
                        <Image src="/images/phone.png" alt='hero' width={250} height={450} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DownloadApp;