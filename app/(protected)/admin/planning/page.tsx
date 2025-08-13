import { Card } from '@/sources/components/ui'
import { CalendarDaysIcon, Loader2 } from 'lucide-react'
import React from 'react'

export default function page() {
  return (
    <div className='md:w-full'>
      <Card title='Mon planning' titleIcon={CalendarDaysIcon}>
        <div className='flex justify-center space-x-2'>
          <Loader2  className='w-6 h-6 animate-spin text-red-500 mr-2'/>
          Module en Développement...
        </div>
      </Card>
    </div>
  )
}
