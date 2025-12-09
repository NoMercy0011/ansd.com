import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className="w-15 h-15 rounded-2xl flex items-center justify-center">
        <Image src="/logo.png" width={50} height={50} alt='logo ans.com' className='rounded-sm lg:rounded-2xl  shadow'/>
    </div>
  )
}
