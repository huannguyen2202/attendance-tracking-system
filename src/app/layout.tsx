import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import PageLoading from "@/components/Comon/PageLoading";
import { ToastContainer } from "react-toastify";
import { Toaster } from 'react-hot-toast';
import InitAOS from "@/components/Comon/initAOS";
import '../styles/animations.css';
import { ThemeProvider } from "@/components/theme-provider"
// import { ThemeProvider } from "next-themes";

const font = Roboto({
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
    <html lang="en" className={font.className} suppressHydrationWarning>
      <body className={`${font.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <InitAOS />
          <PageLoading />
          <ToastContainer />
          <Toaster position="top-right" />
          {/* <ResponsiveNav/> */}
          {children}
          {/* <Footer/> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
