//**React */
import React, { useEffect, useState } from 'react'
import Image from 'next/image';

//**React multi */
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

//**Service */
import { getIntroduce } from '@/services/introduce.service';

//**Types */
import { DanhGia5Sao } from '@/types/introduce.type';

//**Icon */
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3,
        slidesToSlide: 1
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1
    }
};

// Custom dot Carousel
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomDot = ({ onClick, active }: any) => {
    return (
        <li
            onClick={onClick}
            className={`mx-1 cursor-pointer transition-all duration-300 ${active ? 'bg-blue-600 w-6 h-[5px]' : 'bg-gray-400 w-1 h-1 rounded-full'
                } h-[5px] inline-block rounded-full items-center`}
        />
    );
};

const Rating = () => {
    const [ratings, setRatings] = useState<DanhGia5Sao[]>([]);

    useEffect(() => {
        const fetchIntroduce = async () => {
            try {
                const data = await getIntroduce();
                setRatings(data[0].moiNguoiDanhGia5Sao);
            } catch (error) {
                console.error("Failed to fetch banner:", error);
            }
        };
        fetchIntroduce();
    }, []);

    return (
        <div className="bg-[#fcf6fa] py-8">
            <div className="w-[95%] lg:w-[77%] w-100% mx-auto overflow-visible">
                <p
                    data-aos="fade-right"
                    data-aos-anchor-placement="top-center"
                    data-aos-delay={100}
                    className="text-center text-xl md:text-2xl lg:text-3xl mb-12 font-bold">Khách hàng đánh giá về 5Sao</p>

                <div
                    data-aos="fade-right"
                    data-aos-delay={200}
                    className="relative mb-10">
                    <Carousel
                        className='py-8'
                        arrows
                        autoPlay
                        autoPlaySpeed={4000}
                        infinite
                        showDots
                        renderDotsOutside
                        customDot={<CustomDot />}
                        dotListClass="flex justify-center mt-6"
                        responsive={responsive}
                        containerClass="carousel-container"
                        itemClass="px-4"
                    >
                        {ratings.map((rating, index) => (
                            <div
                                key={index}
                                className="shine-effect bg-white rounded-2xl px-5 py-12 text-left h-full flex flex-col justify-between border border-gray-200 hover:border-blue-500 cursor-pointer hover:scale-105 transition-transform duration-300"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-14 h-14 rounded-full overflow-hidden mr-4 border border-gray-200">
                                        <Image
                                            src={rating.anhDaiDien}
                                            alt={rating.tenNguoiDung}
                                            width={56}
                                            height={56}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-base">{rating.tenNguoiDung}</h4>
                                        <p className="text-sm text-gray-500">{rating.chucVu}</p>
                                    </div>
                                </div>

                                {/* Rating stars */}
                                <div className="flex items-center mb-2">
                                    {Array(rating.danhGiaSao)
                                        .fill(0)
                                        .map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-2xl">★</span>
                                        ))}
                                </div>

                                {/* Nội dung đánh giá */}
                                <div>
                                    <FaQuoteLeft className="w-5 h-5 opacity-10 top-8" />
                                    <p className="text-sm text-gray-700 italic mb-2">
                                        {rating.moTaDanhGia}
                                    </p>
                                    <div className="flex justify-end">
                                        <FaQuoteRight className="w-5 h-5 opacity-10 top-8 flex justify-end" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    );
}

export default Rating