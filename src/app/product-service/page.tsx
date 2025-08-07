import React from 'react'

//**Component */
import ProductService from '@/components/ProductService/ProductService'
import ResponsiveNav from '@/components/Navbar/ResponsiveNav'
import Footer from '@/components/Footer/Footer'
import Banner from '@/components/Home/Banner/Banner'

const ProductServicePage = () => {
  return (
    <div>
      <ResponsiveNav />
      <Banner />
      <ProductService />
      <Footer />
    </div>
  )
}

export default ProductServicePage