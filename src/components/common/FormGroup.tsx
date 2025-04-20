import React from 'react';

interface FormGroupProps {
  children: React.ReactNode;
  className?: string;
}

const FormGroup: React.FC<FormGroupProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 bg-white dark:bg-neutral-800 rounded-xl shadow-md animate-fade-in ${className}`}>
      {children}
    </div>
  );
};

export default FormGroup;