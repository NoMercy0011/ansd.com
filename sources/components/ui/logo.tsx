import Image from 'next/image'
import React from 'react'
import logo from '@/public/logo.png'

export default function Logo() {
  return (
    <div className="w-15 h-15 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg border">
        <Image src={logo} alt='logo ans.com' className='rounded-2xl shadow shadow-card bg-red-500'/>
    </div>
  )
}
