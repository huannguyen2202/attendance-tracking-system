'use client'
import Home from '@/components/Home/Home'
import React from 'react'
import { redirect } from "next/navigation";


const HomePage = () => {
  redirect("/login");
  return (
    <div>
      <Home />
    </div>
  )
}

export default HomePage