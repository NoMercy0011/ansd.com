
import Accordion from '@/sources/components/ui/accordion'
import { AlertCircle, CalendarCheck } from 'lucide-react'
import React from 'react'

export default function Evenement() {

  return (
    <Accordion title="Evenementiel" icon={<CalendarCheck />} defaultOpen={false}>
                        
    <div className="relative mt-4 mb-4 flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-700">
        <div className='flex items-center gap-5 text-red-500'> <AlertCircle size={32} className='animate-pulse text-red-500'/> Indisponible pour l&apos;instant</div>
    </div>
    </Accordion>
  )
}
