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
        <div data-aos="zoom-in" className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white lg:py-6 px-6">
            {/* Bên trái: Hình ảnh minh họa */}
            <div className="hidden md:flex items-center justify-center bg-[#F4F9FF] rounded-xl">
                <Image
                    src="/svg-images/comon/login-illustration.svg"
                    alt="Login Illustration"
                    width={500}
                    height={700}
                    className="max-w-full h-auto"
                />
            </div>

            {/* Bên phải: Form đăng nhập */}
            <div className="flex flex-col justify-center px-4 sm:px-8 md:px-16 lg:px-32 py-12">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/svg-images/comon/5sao-logo.svg"
                        alt="hero"
                        width={180}
                        height={70}
                        style={{ height: 'auto', width: '180px' }}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Số điện thoại */}
                    <div>
                        <label className="text-md font-medium">Số điện thoại <span className='text-red-600'>*</span></label>
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
                            className={`w-full border border-gray-300 rounded-[8px] px-4 py-2.5 mt-1 focus:outline-none ${errors.soDienThoai ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'
                                }`}
                        />
                        {errors.soDienThoai && (
                            <p className="text-red-500 text-sm mt-1">{errors.soDienThoai.message}</p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label className="text-md font-medium">Mật khẩu <span className='text-red-600'>*</span></label>
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
                                className={`w-full border border-gray-300 rounded-[8px] px-4 py-2.5 mt-1 pr-10 focus:outline-none ${errors.matKhau ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-4 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.matKhau && (
                            <p className="text-red-500 text-sm mt-1">{errors.matKhau.message}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full text-white py-2 rounded-full font-semibold shadow-md bg-[linear-gradient(to_right,#0000ff,#8a2be2,#ffb6c1)] hover:opacity-90 transition mt-4"
                    >
                        ĐĂNG NHẬP
                    </button>
                </form>

                {/* Đăng ký */}
                <p className="text-center text-sm mt-4">
                    Chưa có tài khoản?{' '}
                    <a href="/auth/register" className="text-purple-600 hover:underline">
                        Đăng ký
                    </a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
