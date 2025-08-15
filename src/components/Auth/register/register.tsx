'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { AuthService } from '@/services/auth/auth.service';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // 👈 THÊM ICON

type RegisterForm = { hoTen: string; email: string; password: string; confirm: string };

export default function RegisterPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  // 👇 THÊM 2 state để toggle hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterForm>({ mode: 'onSubmit' });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setSubmitting(true);
      await AuthService.registerStaff({ hoTen: data.hoTen, email: data.email, password: data.password });
      toast.success('Đăng ký thành công. Tài khoản đang chờ admin duyệt.');
      router.replace('/login'); // quay lại login
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      const msg = err?.response?.data?.message || 'Đăng ký thất bại';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[url('/images/comon/home-bg.jpg')] bg-cover bg-center bg-no-repeat flex items-center justify-center">
      <div className="bg-white rounded-[12px] shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden lg:w-[60vw] w-full mx-6">
        {/* Left Side - Illustration */}
        <div className="hidden md:flex items-center justify-center bg-[#F4F9FF] p-10">
          <Image src="/svg-images/comon/login-illustration.svg" alt="Login Illustration" width={400} height={400} className="max-w-full h-auto" priority />
        </div>

        {/* Right Side - Register Form */}
        <div className="flex flex-col justify-center px-6 sm:px-10 md:px-12 py-12 bg-white">
          <div className="flex justify-center mb-4">
            <Image src="/svg-images/comon/5sao-logo.svg" alt="5Sao Logo" width={180} height={120} className="h-auto" />
          </div>

          <p className="text-center text-sm text-blue-600 mb-6">Đăng ký <b>tài khoản nhân viên</b></p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Họ tên */}
            <div>
              <label className="text-[15px] font-medium text-gray-700">Họ tên<span className="text-red-600">*</span></label>
              <input
                type="text"
                placeholder="Nguyễn Văn A"
                {...register('hoTen', { required: 'Họ tên không được để trống', minLength: { value: 2, message: 'Họ tên quá ngắn' } })}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 text-[14px] focus:outline-none ${errors.hoTen ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'}`}
              />
              {errors.hoTen && <p className="text-red-500 text-sm mt-1">{errors.hoTen.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="text-[15px] font-medium text-gray-700">Email<span className="text-red-600">*</span></label>
              <input
                type="email"
                placeholder="email@domain.com"
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
                  type={showPassword ? 'text' : 'password'} // 👈 toggle
                  placeholder="Tối thiểu 6 ký tự"
                  autoComplete="new-password"
                  {...register('password', { required: 'Mật khẩu không được để trống', minLength: { value: 6, message: 'Ít nhất 6 ký tự' } })}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 pr-10 text-[14px] focus:outline-none ${errors.password ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            {/* Nhập lại mật khẩu */}
            <div>
              <label className="text-[15px] font-medium text-gray-700">Nhập lại mật khẩu<span className="text-red-600">*</span></label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'} // 👈 toggle
                  placeholder="Nhập lại mật khẩu"
                  autoComplete="new-password"
                  {...register('confirm', {
                    required: 'Vui lòng nhập lại mật khẩu',
                    validate: (v) => v === watch('password') || 'Mật khẩu nhập lại không khớp',
                  })}
                  className={`w-full border border-gray-300 rounded-lg px-4 py-2.5 mt-1 pr-10 text-[14px] focus:outline-none ${errors.confirm ? 'border-red-500' : 'focus:ring-1 focus:ring-blue-600'}`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-500"
                  onClick={() => setShowConfirm(s => !s)}
                  aria-label={showConfirm ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.confirm && <p className="text-red-500 text-sm mt-1">{errors.confirm.message}</p>}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="shine-effect cursor-pointer w-full mt-6 text-white py-2 rounded-full font-semibold bg-gradient-to-r from-[#6D28D9] via-[#3B82F6] to-[#6EE7B7] hover:opacity-90 transition disabled:opacity-60"
            >
              {submitting ? 'Đang tạo tài khoản...' : 'ĐĂNG KÝ'}
            </button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Đã có tài khoản? <a href="/login" className="text-blue-600 hover:underline">Đăng nhập</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
