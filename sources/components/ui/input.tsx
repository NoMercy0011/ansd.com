"use client"
type InputProps = {
  value?: string;
  type?: string;
  name?: string;
  min?: string;
  max?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  placeholder?:string;
}

export function Input({
  value,
  type,
  name,
  min,
  max,
  step,
  placeholder,
  className,
  onChange,
  disabled = false,
  required = false,
}: InputProps ) {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className= {`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg 
          text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 
          transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 ${className || ''} 
          ${type === 'number' ? '[-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' : ''}`}
      />
    </>
  );
}

export function Textarea ({ className, placeholder, value, onChange, name } : InputProps) {
  return(
  <textarea 
      value={value}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors placeholder:text-slate-400 dark:placeholder:text-slate-500 ${className || ''}`} />

  );
} 

