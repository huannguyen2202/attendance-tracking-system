'use client'
//**React */
import React from 'react'

//**Component */
import WhyChoose from './WhyChoose/WhyChoose'
import Feature from './Feature/Feature'
import Offer from './Offer/Offer'
import ResponsiveNav from '../Navbar/ResponsiveNav'
import Footer from '../Footer/Footer'
import Banner from './Banner/Banner'
import Rating from './Rating/Rating'
import CustomerFeelback from './CustomerFeelback/CustomerFeelback'
import DownloadApp from './DownloadApp/DownloadApp'

const Home = () => {
  return (
    <div className="overflow-hidden">
      <ResponsiveNav />
      <Banner />
      <DownloadApp />
      <Feature />
      <CustomerFeelback />
      <Rating />
      <WhyChoose />
      <Offer />
      <Footer />
    </div>
  )
}

export default Home