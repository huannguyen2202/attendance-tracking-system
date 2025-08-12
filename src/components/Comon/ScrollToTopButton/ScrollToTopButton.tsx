'use client';
import { ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Hiện nút khi cuộn xuống dưới
    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed cursor-pointer bottom-5 right-5 w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white text-xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] z-[10000] transition-all duration-300 hover:from-red-500 hover:to-yellow-500 hover:shadow-[0_0_20px_rgba(255,100,100,0.6)] flex items-center justify-center group ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
        </button>
    );
};

export default ScrollToTopButton;
