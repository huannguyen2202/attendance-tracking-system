import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Home/Footer/Footer";
import PageLoading from "@/components/Comon/PageLoading";

const font = Poppins({
  weight: ['100','300','400','500', '700','900','200','600','800'],
  subsets: ['latin']

})

export const metadata: Metadata = {
  title: "App Landing | Next 15",
  description: "App landing page using next js 15",
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <PageLoading />
        <ResponsiveNav/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
