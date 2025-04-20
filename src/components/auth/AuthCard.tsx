import React from 'react';
import { PawPrint } from 'lucide-react';

interface AuthCardProps {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

const AuthCard: React.FC<AuthCardProps> = ({ title, children, footer }) => {
  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-500 text-white mb-4">
          <PawPrint size={32} />
        </div>
        <h1 className="text-3xl font-nunito font-bold text-neutral-800 dark:text-white mb-2">
          PetMate
        </h1>
        <p className="text-neutral-600 dark:text-neutral-300 font-open-sans">
          Your complete pet management solution
        </p>
      </div>

      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-nunito font-bold text-neutral-800 dark:text-white mb-6">
            {title}
          </h2>
          {children}
        </div>

        {footer && (
          <div className="p-4 bg-neutral-50 dark:bg-neutral-750 border-t border-neutral-200 dark:border-neutral-700 text-center">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCard;
