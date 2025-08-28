import React from 'react'

type SectionProps = {
    title?: string;
    subtitle?: string;
}
export default function SectionTitle({ title, subtitle }: SectionProps) {
  return (
    <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">
            {title}
        </h1>
        {subtitle && 
            <p className="text-slate-500 dark:text-slate-400 mt-1 text-lg">{subtitle}</p>
        }
    </div>
  )
}
