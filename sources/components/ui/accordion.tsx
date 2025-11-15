"use client"

import { ChevronDown } from 'lucide-react';
import React, { useState } from 'react'

type AccordionProps = {
    title?: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    defaultOpen?: boolean;
}

export default function Accordion({ title, icon: Icon, children, defaultOpen = true } : AccordionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center p-4 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center font-semibold text-slate-700 dark:text-slate-200 gap-3">{Icon && <span className="text-red-500"> {Icon} </span> }<span>{title}</span></div>
                <ChevronDown size={20} className={`transition-transform text-slate-500 dark:text-slate-400 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 pt-0 space-y-4 text-sm">{children}</div>}
        </div>
    );
}
