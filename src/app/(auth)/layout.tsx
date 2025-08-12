import { Poppins } from "next/font/google";
import "../globals.css"; // cần dẫn đúng path nếu không tự import

const font = Poppins({
    weight: ['100', '300', '400', '500', '700', '900', '200', '600', '800'],
    subsets: ['latin'],
});

export const metadata = {
    title: "Auth | App Landing",
    description: "Authentication pages",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${font.className} antialiased bg-gray-50`}>
                {children}
            </body>
        </html>
    );
}