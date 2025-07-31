//**React */
import React from 'react'

//**Next */
import Image from 'next/image'

//**Icon */
import { BsArrowRight } from "react-icons/bs";

const DownloadApp = () => {
    return (
        <div className="w-full bg-[#F4F9FF]">
            <div className="flex justify-center flex-col w-[90%] sm:w-[80%] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 mt-10 mb-10">
                    {/* Text Content */}
                    <div>
                        {/* Top box */}
                        <div className="w-fit py-2 px-2 md:px-5 rounded-full shadow-md flex items-center space-x-3 bg-blue-700/80 hover:bg-blue-700">
                            <p className="text-xs sm:text-sm flex items-center gap-2 text-white md:text-xl">Tải App 5Sao Partner để nhận đơn <BsArrowRight /></p>
                        </div>

                        {/* Heading */}
                        <h1
                            data-aos="fade-up"
                            className="text-2xl sm:text-4xl md:text-4xl mt-6 mb-6 font-bold md:leading-[3rem] lg:leading-[3.5rem] text-justify">Ứng dụng số 1
                            ngành xây dựng, chăm sóc nhà,
                            sửa chữa vặt, gọi thợ thầu.
                        </h1>

                        {/* Description */}
                        <p className="text-gray-700">Tải ngay App 5Sao Partner để nhận việc làm và trải nghiệm các tiện ích trên ứng dụng!</p>

                        {/* play store and app store image */}
                        <div className="flex mt-8 mb-8 items-center space-x-4 justify-between">
                            <div>
                                <Image
                                    src="/images/gp.png"
                                    alt='Play store'
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/images/as.png"
                                    alt='App store'
                                    width={150}
                                    height={150}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <Image
                                    src="/images/comon/qr.png"
                                    alt='qr'
                                    width={150}
                                    height={150}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Image App */}
                    <style jsx>{`
                          @keyframes wiggleX {
                              0%, 100% {
                                  transform: translateX(0);
                              }
                              70% {
                                  transform: translateX(20px);
                              }
                          }
                      `}</style>
                    <div style={{ animation: 'wiggleX 2s ease-in-out infinite' }}
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="hidden lg:flex justify-end">
                        <Image src="/images/phone.png" alt='hero' width={250} height={450}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DownloadApp