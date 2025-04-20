import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Array<{ value: string; label: string }>;
  error?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  ...props
}) => {
  return (
    <div className="mb-4">
      <label className="block font-nunito font-semibold text-neutral-800 dark:text-neutral-200 mb-1">
        {label}
      </label>
      <select
        className={`w-full px-4 py-2 rounded-lg border focus:ring-2 focus:outline-none font-open-sans
          ${error 
            ? 'border-error-500 focus:ring-error-300' 
            : 'border-neutral-300 focus:border-primary-400 focus:ring-primary-300 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white'
          }
        `}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-error-500 font-open-sans">{error}</p>
      )}
    </div>
  );
};

export default Select;