import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLoading from "@/components/Comon/PageLoading";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';
import InitAOS from "@/components/Comon/initAOS";
import '../styles/animations.css';

const font = Inter({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap', // tải font mượt hơn, tránh mất chữ khi load chậm
});

export const metadata: Metadata = {
  title: "5Sao Partner | Thợ thầu 5Sao",
  description: "Ứng dụng xây dựng và chăm sóc nhà số 1 Việt Nam",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={font.className}>
      <body className={`${font.className} antialiased`}>
        <InitAOS />
        <PageLoading />
        <ToastContainer />
        <Toaster position="top-right" />
        {/* <ResponsiveNav/> */}
        {children}
        {/* <Footer/> */}
      </body>
    </html>
  );
}
