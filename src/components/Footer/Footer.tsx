import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaClock, FaDribbble, FaEnvelope, FaFacebook, FaMapMarkedAlt, FaPhoneAlt, FaTwitter } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className='bg-white py-10'>
            <div className='w-[90%] mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8'>

                    {/* Logo and description */}
                    <div>
                        {/* Logo */}
                        {/* <h1 className='text-xl md:text-2xl font-bold'>
                            <span className='text-3xl md:text-4xl text-pink-700'>A</span>ppify
                        </h1> */}
                        <Image
                            src="/svg-images/comon/5sao-logo-horizoltal.svg"
                            alt="hero"
                            width={190}
                            height={70}
                            style={{ height: 'auto', width: '190px' }}
                        />
                        {/* Description */}
                        <p className='mt-4 text-sm font-medium leading-[2rem] w-[80%] text-gray-600'>
                            5Sao - Ứng dụng số 1 ngành xây dựng, chăm sóc nhà, sửa chữa vặt, gọi thợ thầu
                        </p>
                    </div>

                    {/* About us link */}
                    <div>
                        <h3 className='text-xl font-semibold text-gray-800'>
                            Dịch vụ
                        </h3>
                        <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'></ul>
                        <li>Sửa Điện Nước</li>
                        <li>Thợ Lắp Đặt Điện Nước</li>
                        <li>Sửa máy lạnh</li>
                        <li>Tháo lắp máy lạnh</li>
                        <li>Chống thấm</li>
                        <li>Dịch vụ vệ sinh</li>
                        <li>Dịch vụ công nghiệp</li>
                    </div>
                    {/* Our information links */}
                    {/* <div>
                        <h3 className='text-xl font-semibold text-gray-800'>
                            Thông tin về 5Sao
                        </h3>
                        <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'></ul>
                        <li>Tin cậy</li>
                        <li>Privacy Policy</li>
                        <li>Terms & Condition</li>
                        <li>Site Map</li>
                        <li>Store Hours</li>
                    </div> */}

                    {/* Contact Info */}
                    <div>
                        <h3 className='text-xl font-semibold text-gray-800'>
                            Thông tin liên hệ
                        </h3>
                        <ul className='mt-4 space-y-4 text-sm font-semibold text-gray-500'>
                            <li className='flex items-center'>
                                <FaMapMarkedAlt className='mr-2' />
                                51 Tố Hữu, Hòa Cường Nam, Hải Châu, Đà Nẵng
                            </li>
                            <li className='flex items-center'>
                                <FaPhoneAlt className='mr-2' />
                                1900.636.083
                            </li>
                            <li className='flex items-center'>
                                <FaClock className='mr-2' />
                                8h - 17h
                            </li>
                            <li className='flex items-center'>
                                <FaEnvelope className='mr-2' />
                                5sao@gmail.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div
                    className='border-t mt-8'>
                    <div 
                        className='mt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm'>
                        <p className='text-center md:text-left'>
                            &copy; 2025. Công ty cổ phần công nghệ FiveSS
                        </p>
                        <div className='flex items-center space-x-4 mt-4 md:mt-0'>
                            <span>Mạng xã hội : </span>
                            <Link href="#" className='text-gray-500 hover:text-gray-800'>
                                <FaFacebook />
                            </Link>
                            <Link href="#" className='text-gray-500 hover:text-gray-800'>
                                <FaTwitter />
                            </Link>
                            <Link href="#" className='text-gray-500 hover:text-gray-800'>
                                <FaDribbble />
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer