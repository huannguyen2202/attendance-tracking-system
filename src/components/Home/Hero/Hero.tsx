import Image from 'next/image'
import React from 'react'

const Hero = () => {
    return (
        <div className="w-full pt-[4vh] md:pt-[10vh] h-screen bg-[#f7f6fb]">
            <div className="flex justify-center flex-col w-[90%] sm:w-[80%] h-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
                    {/* Text Content */}
                    <div>
                        {/* Top box */}
                        <div className="w-fit py-1.5 px-2 md:px-5 rounded-full shadow-md flex items-center space-x-3 bg-white">
                            <div className="px-3 py-1 md:px-5 md:py-1 rounded-full bg-blue-700 md:text-base sm:text-sm text-xs text-white">
                                News
                            </div>
                            <p className="text-xs sm:text-sm">We have update our term & condition policy</p>
                        </div>

                        {/* Heading */}
                        <h1
                            data-aos="fade-up"
                            className="text-2xl sm:text-4xl md:text-5xl mt-6 mb-6 font-bold md:leading-[3rem] lg:leading-[3.5rem]">the premier workspace companion for your daily needs.
                        </h1>

                        {/* Description */}
                        <p className="text-gray-700">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur maxime error eligendi labore impedit praesentium aut harum nobis aliquam nostrum!</p>

                        {/* play store and app store image */}
                        <div className="flex mt-8 mb-8 items-center space-x-4">
                            <Image
                                src="/images/gp.png"
                                alt='Play store'
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                            <Image
                                src="/images/as.png"
                                alt='App store'
                                width={150}
                                height={150}
                                className="object-contain"
                            />
                        </div>
                    </div>
                    {/* Image content */}
                    <div
                        data-aos="fade-up"
                        data-aos-delay="200"
                        className="hidden lg:block">
                        <Image src="/images/hero.png" alt='hero' width={700} height={700}></Image>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero