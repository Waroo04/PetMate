import React from 'react';
import { Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <AuthCard
        title="Sign In"
        footer={
          <p className="text-neutral-600 dark:text-neutral-400">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary-500 hover:text-primary-600 font-semibold">
              Sign Up
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthCard>
    </div>
  );
};

export default LoginPage;