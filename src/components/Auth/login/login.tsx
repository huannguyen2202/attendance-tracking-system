'use client';

//**next */
import Image from 'next/image';
import { useRouter } from 'next/navigation';

//**React */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

//**Toast message */
import toast from 'react-hot-toast';

//**icon */
import { FaEye, FaEyeSlash } from 'react-icons/fa';

//**Types */
import { LoginPayload } from '@/types/auth.type';

import { handleApiError } from '@/ultils/errorHandler';
import { loginAndSaveSession } from '@/services/auth/auth.manager';

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [, setErrorMsg] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginPayload>();

    const onSubmit = async (data: LoginPayload) => {
        try {
            await loginAndSaveSession(data);
            toast.success("Đăng nhập thành công!");
            router.push("/home");
        } catch (error) {
            const msg = handleApiError(error);
            setErrorMsg(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="relative min-h-screen bg-[url('/images/comon/home-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
            <div
                data-aos="zoom-in"
                className="bg-white rounded-[12px] shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden lg:w-[60vw] w-full mx-6 lg:h-[80vh]"
            >
                {/* Left Side - Illustration */}
                <div className="hidden md:flex items-center justify-center bg-[#F4F9FF] p-10">
                    <Image
                        src="/svg-images/comon/login-illustration.svg"
                        alt="Login Illustration"
                        width={400}
                        height={400}
                        className="max-w-full h-auto"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="flex flex-col justify-center px-6 sm:px-10 md:px-12 py-12 bg-white">
                    {/* Logo */}
                    <div className="flex justify-center mb-4">
                        <Image
                            src="/svg-images/comon/5sao-logo.svg"
                            alt="5Sao Logo"
                            width={180}
                            height={120}
                            className="h-auto"
                        />
                    </div>

                    {/* Tiêu đề + cảnh báo */}
                    <p className="text-center text-sm text-red-600 mb-6">
                        Lưu ý: Bạn sử dụng tài khoản App 5Sao để đăng nhập!
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Tài khoản */}
                        <div>
                            <label className="text-[15px] font-medium text-gray-700">
                                Tài khoản<span className='text-red-600'>*</span>
                            </label>
                            <input
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                {...register('soDienThoai', {
                                    required: 'Số điện thoại không được để trống',
                                    pattern: {
                                        value: /^(0|\+84)[0-9]{9,10}$/,
                                        message: 'Số điện thoại không hợp lệ',
                                    },
                                })}
                                className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 text-[14px] focus:outline-none ${errors.soDienThoai
                                    ? 'border-red-500'
                                    : 'focus:ring-1 focus:ring-blue-600'
                                    }`}
                            />
                            {errors.soDienThoai && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.soDienThoai.message}
                                </p>
                            )}
                        </div>

                        {/* Mật khẩu */}
                        <div>
                            <label className="text-[15px] font-medium text-gray-700">
                                Mật khẩu<span className='text-red-600'>*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    {...register('matKhau', {
                                        required: 'Mật khẩu không được để trống',
                                        minLength: {
                                            value: 6,
                                            message: 'Mật khẩu phải có ít nhất 6 ký tự',
                                        },
                                    })}
                                    className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 pr-10 text-[14px] focus:outline-none ${errors.matKhau
                                        ? 'border-red-500'
                                        : 'focus:ring-1 focus:ring-blue-600'
                                        }`}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-3.5 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.matKhau && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.matKhau.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="shine-effect cursor-pointer w-full mt-10 text-white py-2 rounded-full font-semibold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#6EE7B7] hover:opacity-90 transition"
                        >
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
