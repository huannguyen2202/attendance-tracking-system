'use client';
import React from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ReviewCard from './ReviewCard';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};

const Review = () => {
  return (
    <div className='pt-16 pb-16 bg-[#fcf6fa]'>
      <h1 className='mt-6 text-2xl md:text-3xl capitalize font-bold text-center'>
        What client say about us
      </h1>
      <div className='mt-20 w-[90%] md:w[80%] mx-auto'>
        <Carousel
          arrows={true}
          autoPlay={true}
          autoPlaySpeed={5000}
          infinite
          responsive={responsive}
          showDots
        >
          <ReviewCard name="Jessy Doe" image="/images/c1.png" />
          <ReviewCard name="Jessy Doe" image="/images/c2.png" />
          <ReviewCard name="Jessy Doe" image="/images/c1.png" />
          <ReviewCard name="Jessy Doe" image="/images/c2.png" />
        </Carousel>
      </div>
    </div>
  )
}

export default Review