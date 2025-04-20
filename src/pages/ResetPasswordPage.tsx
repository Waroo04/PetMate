import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import ResetPasswordForm from '../components/auth/ResetPasswordForm';

const ResetPasswordPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <AuthCard
        title="Reset Password"
        footer={
          <p className="text-neutral-600 dark:text-neutral-400">
            Remembered your password?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              Sign In
            </Link>
          </p>
        }
      >
        <ResetPasswordForm />
      </AuthCard>
    </div>
  );
};

export default ResetPasswordPage;