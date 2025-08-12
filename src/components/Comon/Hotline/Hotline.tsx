'use client';
import React from 'react';
import styles from './Hotline.module.css';
import { FiPhoneCall } from 'react-icons/fi';

const Hotline = () => {
    return (
        <div className={styles.box}>
            <div className={styles.iconWrapper}>
                <span className={styles.iconInner}>
                    <FiPhoneCall size={20} />
                </span>
            </div>
            <span className={styles.text}>Hotline: 1900.636.083</span>
        </div>
    );
};

export default Hotline;
