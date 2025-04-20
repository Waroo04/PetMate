import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block font-nunito font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500">
            {icon}
          </div>
        )}
        <input
          className={`w-full px-4 py-2 ${icon ? 'pl-10' : 'pl-4'} rounded-lg border focus:ring-2 focus:outline-none font-open-sans
            ${error 
              ? 'border-error-500 focus:ring-error-300' 
              : 'border-neutral-300 focus:border-primary-400 focus:ring-primary-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
            }
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-1 text-sm text-error-500 font-open-sans">{error}</p>
      )}
    </div>
  );
};

export default Input;