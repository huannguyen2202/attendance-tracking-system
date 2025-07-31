import React from 'react'

const Offer = () => {
    return (
        <div className='flex items-center justify-center pt-24 pb-24 mb-20 bg-black'>
            <div className='w-[80%] flex'>
                <div>
                   
                </div>
                <div>
                    <p className='text-white lg:text-xl'>Fanpage hỗ trợ đối tác 5Sao</p>
                    <iframe
                        className='mt-3'
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdoitac.5Sao&tabs=timeline&width=500&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                        width="100%"
                        height="130"
                        style={{ border: 'none', overflow: 'hidden', display: 'block' }}
                        scrolling="no"
                        frameBorder="0"
                        allowFullScreen={true}
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    />

                </div>
            </div>
            {/* <div className='text-center px-6'>
                <h2 className='text-white text-2xl md:text-3xl font-semibold mb-4'>Explore ultimate feature with premium</h2>
                <p className='text-gray-400 mb-8'>
                    Tell us your Apple ID email address so we could send you a TestFlight invitation directly
                </p>
                <button className='bg-blue-500 text-white py-3 px-8 rounded-full text-lg font-medium mb-4 hover:bg-blue-600'>
                    Start 14 Days Free Trial
                </button>
                <p className='text-gray-400'>No credit Card Required</p>
            </div> */}
        </div>
    )
}

export default Offer