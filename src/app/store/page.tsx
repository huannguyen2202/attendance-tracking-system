import React from 'react'

//**Component */
import Store from '@/components/Store/Store'
import ResponsiveNav from '@/components/Navbar/ResponsiveNav'
import Footer from '@/components/Footer/Footer'

const StorePage = () => {
  return (
    <div>
      <ResponsiveNav />
      <Store />
      <Footer />
    </div>
  )
}

export default StorePage