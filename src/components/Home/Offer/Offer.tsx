import React from 'react'

const Offer = () => {
    return (
        <div className='flex items-center justify-center py-18 mb-20 bg-black'>
            <div className='w-[90%] flex'>
                <div>
                    <p className='text-white lg:text-xl'>Fanpage hỗ trợ đối tác 5Sao</p>
                    <iframe
                        className='mt-3'
                        src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fdoitac.5Sao&tabs=timeline&width=1200&height=300&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
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
        </div>
    )
}

export default Offer