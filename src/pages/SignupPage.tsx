import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import SignupForm from '../components/auth/SignupForm';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <AuthCard
        title="Create an Account"
        footer={
          <p className="text-neutral-600 dark:text-neutral-400">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-500 hover:text-primary-600 font-semibold">
              Sign In
            </Link>
          </p>
        }
      >
        <SignupForm />
      </AuthCard>
    </div>
  );
};

export default SignupPage;