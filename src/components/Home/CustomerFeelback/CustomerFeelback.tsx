//**React */
import React from 'react'

//**Icon */
import { FaCheckCircle } from "react-icons/fa";

const CustomerFeelback = () => {
    return (
        <div className='pt-24 pb-16'>
            {/* Define grid */}
            <div className='w-[90%] sm:w-[80%] mx-auto items-center grid grid-cols-1 lg:grid-cols-2 gap-18'>
                {/* Youtube */}
                <div className="w-full aspect-video rounded-2xl overflow-hidden" data-aos="fade-up" data-aos-anchor-placement="top-center">
                    <iframe
                        className="w-full h-full"
                        src="https://www.youtube.com/embed/tCbwjZIm1tk?si=LAHNB0qHZojBFl3P"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>

                {/* Text content */}
                <div
                    data-aos="fade-up"
                    data-aos-anchor-placement="top-center"
                    data-aos-delay={150}
                    className='p-6'>
                    <h1
                        className='text-base font-semibold text-orange-500 sm:text-2xl md:text-4xl'>
                        Hãy theo dõi để biết thêm thông tin về App 5Sao
                    </h1>
                    <h1
                        className='mt-4 text-xl sm:text-2xl md:text-3xl font-bold text-gray-900'>
                        Khách hàng đã nói gì về App 5Sao?
                    </h1>
                    <p className='mt-4 text-gray-600 text-sm font-medium leading-[2rem]'>
                        5Sao giúp kết nối các đối tác gần nhất, rút ngắn thời gian tìm kiếm và xử lý yêu cầu. Mọi giao dịch đều minh bạch, tin cậy mang đến trải nghiệm tiện lợi và yên tâm.
                    </p>
                    <ul className='mt-7 space-y-2 text-gray-800'>
                        <li className='flex items-center font-semibold'>
                            <FaCheckCircle className='text-green-500 mr-2' />
                            Nhanh chóng và tin cậy
                        </li>
                        <li className='flex items-center font-semibold'>
                            <FaCheckCircle className='text-green-500 mr-2' />
                            Đảm bảo chất lượng
                        </li>
                        <li className='flex items-center font-semibold'>
                            <FaCheckCircle className='text-green-500 mr-2' />
                            Giá cả minh bạch
                        </li>
                    </ul>
                    <button className='shine-effect mt-8 px-8 py-3 bg-red-600 text-white font-semibold rounded-full hover:bg-red-800 transition-all duration-200 cursor-pointer'>
                        Youtube 5Sao &rarr;
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomerFeelback