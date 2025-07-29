'use client';

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function InitAOS() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            easing: 'ease',
            once: true,
            anchorPlacement: 'top-bottom',
        });
    }, []);

    return null;
}