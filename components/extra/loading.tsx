import React from 'react'
import { cn } from "@/lib/utils"
import Logo from '@/sources/components/ui/logo';

type LoadingProps = {
    className?: React.ComponentProps<"div">;
    label?: string;
}
function Loading( { className, label} : LoadingProps ) {
  return (
    <div
        className={cn(" fixed animate-pulse items-center inset-0 z-50 bg-black/10", className)}
    >

        <div className='absolute top-[50%] left-[50%]'>
            <div className='mx-4 pb-3 animate-bounce'>
                <Logo />
            </div>
            <div className='text-md font-semibold text-red-600 animate-pulse text-center'> { label } </div>
        </div>
    </div>
  )
}

export { Loading }