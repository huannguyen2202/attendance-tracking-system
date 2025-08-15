// src/app/login/page.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { AuthService } from '@/services/auth/auth.service';

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({ mode: 'onSubmit' });
  const router = useRouter();
  const searchParams = useSearchParams();

  const onSubmit = async (data: LoginForm) => {
    try {
      const { user } = await AuthService.login({ email: data.email, password: data.password });
      toast.success('Đăng nhập thành công');

      // Nếu có ?next=... thì ưu tiên, ngược lại điều hướng theo role
      const next = searchParams.get('next');
      if (next && next.startsWith('/')) return router.replace(next);

      router.replace(user.role === 'admin' ? '/admin' : '/home');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Đăng nhập thất bại';
      toast.error(msg); // Nếu status=pending sẽ báo: "Tài khoản đang chờ admin duyệt."
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/images/comon/home-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden lg:w-[60vw] w-full mx-6 lg:h-[80vh]">
        {/* Left Side */}
        <div className="hidden md:flex items-center justify-center bg-[#F4F9FF] p-10">
          <Image src="/svg-images/comon/login-illustration.svg" alt="Login Illustration" width={400} height={400} className="max-w-full h-auto" priority />
        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-12 py-12 bg-white">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <Image src="/svg-images/comon/5sao-logo.svg" alt="5Sao Logo" width={180} height={120} className="h-auto" priority />
          </div>

          <p className="text-center text-sm text-blue-600 mb-6">Đăng nhập hệ thống</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-[15px] font-medium text-gray-700">Email<span className="text-red-600">*</span></label>
              <input
                type="email"
                placeholder="nhap-email@domain.com"
                autoComplete="username"
                {...register('email', {
                  required: 'Email không được để trống',
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email không hợp lệ' },
                })}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 text-[14px] focus:outline-none ${errors.email ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'}`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            {/* Mật khẩu */}
            <div>
              <label className="text-[15px] font-medium text-gray-700">Mật khẩu<span className="text-red-600">*</span></label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  autoComplete="current-password"
                  {...register('password', { required: 'Mật khẩu không được để trống', minLength: { value: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' } })}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 pr-10 text-[14px] focus:outline-none ${errors.password ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'}`}
                />
                <button type="button" className="absolute right-3 top-3.5 text-gray-500" onClick={() => setShowPassword(s => !s)} aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="shine-effect cursor-pointer w-full mt-10 text-white py-2 rounded-full font-semibold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#6EE7B7] hover:opacity-90 transition disabled:opacity-60">
              {isSubmitting ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
            </button>
          </form>

          {/* Link đăng ký */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản nhân viên? <Link href="/register" className="text-blue-600 hover:underline">Đăng ký ngay</Link>
          </p>

          {/* (Tuỳ chọn) Link riêng cho admin */}
          <p className="mt-2 text-center text-xs text-gray-500">
            Bạn là quản trị? <Link href="/admin/login" className="text-blue-600 hover:underline">Đăng nhập khu vực Admin</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
