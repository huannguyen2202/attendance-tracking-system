'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaFacebook, FaGoogle } from 'react-icons/fa';
import { Login } from '@/services/auth.service';
import { LoginPayload } from '@/types/auth.type';
import { handleApiError } from '@/ultils/errorHandler';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation'; // với App Router

const LoginPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginPayload>();

    const onSubmit = async (data: LoginPayload) => {
        try {
            const res = await Login(data);
            toast.success('Đăng nhập thành công!');
            console.log('Login thành công:', res);
            // TODO: lưu token, chuyển hướng
            router.push('/home');
        } catch (error: unknown) {
            const msg = handleApiError(error);
            setErrorMsg(msg);
            toast.error(msg);
        }
    };

    return (
        <div className="min-h-screen flex bg-white py-12 pl-12 w-full h-full">
            {/* Bên trái: Hình ảnh minh họa */}
            <div className="w-1/2 bg-gray-100 flex items-center justify-center rounded-2xl">
                <Image
                    src="/svg-images/comon/login-illustration.svg"
                    alt="Login Illustration"
                    width={500}
                    height={700}
                />
            </div>

            {/* Bên phải: Form đăng nhập */}
            <div className="w-1/2 flex flex-col justify-center px-32 py-12">
                <h2 className="text-3xl font-bold mb-6 text-center">Đăng nhập</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Số điện thoại */}
                    <div>
                        <label className="text-sm">Số điện thoại *</label>
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
                            className={`w-full border border-gray-300 rounded-[8px] px-4 py-2 mt-1 focus:outline-none ${errors.soDienThoai ? 'border-red-500' : 'focus:ring-2 focus:ring-purple-500'
                                }`}
                        />
                        {errors.soDienThoai && (
                            <p className="text-red-500 text-sm mt-1">{errors.soDienThoai.message}</p>
                        )}
                    </div>

                    {/* Mật khẩu */}
                    <div>
                        <label className="text-sm">Mật khẩu *</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'matKhau'}
                                placeholder="Nhập mật khẩu"
                                {...register('matKhau', {
                                    required: 'Mật khẩu không được để trống',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu phải có ít nhất 6 ký tự',
                                    },
                                })}
                                className={`w-full border border-gray-300 rounded-[8px] px-4 py-2 mt-1 pr-10 focus:outline-none ${errors.matKhau ? 'border-red-500' : 'focus:ring-2 focus:ring-purple-500'
                                    }`}
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-3 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        {errors.matKhau && (
                            <p className="text-red-500 text-sm mt-1">{errors.matKhau.message}</p>
                        )}
                    </div>

                    {/* Thông báo lỗi */}
                    {errorMsg && (
                        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
                    )}

                    {/* Ghi nhớ và Quên mật khẩu */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" />
                            <span>Ghi nhớ đăng nhập</span>
                        </label>
                        <a href="#" className="text-purple-600 hover:underline">Quên mật khẩu?</a>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full text-white py-2 rounded-full font-semibold shadow-md bg-gradient-to-r from-blue-600 to-pink-400 hover:opacity-90 transition"
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

                {/* Mạng xã hội */}
                <div className="text-center mt-4 text-sm text-gray-400">Hoặc đăng nhập bằng</div>

                <div className="flex justify-center space-x-6 mt-4">
                    <button className="text-2xl"><FaFacebook className="text-blue-600" /></button>
                    <button className="text-2xl"><FaGoogle className="text-red-500" /></button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
