import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import PageLoading from "@/components/Comon/PageLoading";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';
import InitAOS from "@/components/Comon/initAOS";

const font = Inter({
  weight: ['100', '300', '400', '500', '700', '900', '200', '600', '800'],
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: "5Sao Partner | Thợ thầu 5Sao",
  description: "Ứng dụng xây dựng và chăm sóc nhà số 1 Việt Nam",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
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
