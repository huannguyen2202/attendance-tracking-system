'use client'
import React from 'react'
import Hero from './Hero/Hero'
import WhyChoose from './WhyChoose/WhyChoose'
import AnalyticsFeature from './AnalyticsFeature/AnalyticsFeature'
import Feature from './Feature/Feature'
import Review from './Review/Review'
import Price from './Price/Price'
import Offer from './Offer/Offer'
import ResponsiveNav from './Navbar/ResponsiveNav'
import Footer from './Footer/Footer'
import Banner from './Banner/Banner'
import Rating from './Rating/Rating'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <ResponsiveNav />
      <Banner />
      <Hero />
      <WhyChoose />
      <AnalyticsFeature />
      <Feature />
      {/* <Review /> */}
      <Rating />
      {/* <Price /> */}
      <Offer />
      <Footer />
    </div>
  )
}

export default Home