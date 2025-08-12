import React from 'react'

const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white px-4">
            <div className="max-w-md w-full space-y-6">
                <h2 className="text-center text-3xl font-bold text-gray-900">Đăng nhập vào tài khoản</h2>
                <form className="mt-8 space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Mật khẩu
                        </label>
                        <input
                            id="password"
                            type="password"
                            required
                            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700"
                    >
                        Đăng nhập
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600">
                    Chưa có tài khoản? <a href="/register" className="text-blue-600 hover:underline">Đăng ký</a>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage