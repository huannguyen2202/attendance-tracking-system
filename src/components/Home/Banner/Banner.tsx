'use client'
//**React */
import React, { useEffect, useState } from 'react'

//**Next */
import Image from 'next/image'

//**Service & types */
import { getBanner } from '@/services/banner.service'
import { BannerResponse } from '@/types/banner.type'

//**Carousel */
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 2,
        slidesToSlide: 1,
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1,
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1,
    },
}

// Dot tùy chỉnh dạng dấu gạch
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDot = ({ onClick, active }: any) => {
    return (
        <li
            onClick={onClick}
            className={`mx-1 cursor-pointer transition-all duration-300 ${active
                ? 'bg-blue-600 w-6 h-[5px]'
                : 'bg-gray-400 dark:bg-gray-600 w-1 h-1 rounded-full'
                } h-[5px] inline-block rounded-full`}
        />
    )
}

const Banner = () => {
    const [banners, setBanners] = useState<BannerResponse[]>([])

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const data = await getBanner()
                setBanners(data)
            } catch (error) {
                console.error('Failed to fetch banner:', error)
            }
        }
        fetchBanner()
    }, [])

    return (
        <div className="pt-[8vh] md:pt-[8vh] bg-[#F4F9FF] dark:bg-[#09090B] transition-colors duration-300">
            <div
                data-aos="fade-right"
                className="mx-auto w-[100%] md:w-[90%] lg:w-[75%] mt-8 bg-white dark:bg-zinc-800 md:rounded-[10px] px-3 py-4"
            >
                <Carousel
                    arrows={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    infinite
                    showDots
                    customDot={<CustomDot />}
                    dotListClass="flex justify-center mt-4"
                    responsive={responsive}
                    containerClass="carousel-container"
                    itemClass="px-2"
                >
                    {banners.map((banner, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center text-center"
                        >
                            <div className="relative w-full h-[25vh] rounded-[10px] overflow-hidden border border-gray-100 dark:border-zinc-700 mb-4">
                                <Image
                                    src={banner.hinhAnhBanner}
                                    alt={banner.tieuDe}
                                    fill
                                    className="object-cover rounded-[10px]"
                                />
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    )
}

export default Banner
