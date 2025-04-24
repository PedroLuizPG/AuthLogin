import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <div className="relative w-full flex item">
      <input
        className=" h-9 mb-4 w-full rounded-md border-0 bg-gray-400 pl-3 pr-3 py-1 invalid:border-red-600 invalid:text-red-700 focus:border-2 focus:border-sky-800 focus:outline focus:outline-sky-800 focus:invalid:border-red-600 focus:invalid:outline-red-600 disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20 
            sm:h-10 sm:pl-4 sm:pr-4
            "
        {...props}
      />
    </div>
  );
}
