import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const ResetPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true);

    try {
      await resetPassword(email);
      setMessage('Check your email for password reset instructions');
    } catch (err) {
      setError('Failed to reset password. Please check your email and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="p-3 bg-error-50 text-error-500 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      {message && (
        <div className="p-3 bg-success-50 text-success-500 rounded-lg text-sm">
          {message}
        </div>
      )}
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        icon={<Mail size={18} />}
      />
      
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        disabled={loading}
        className="mt-6"
      >
        {loading ? 'Sending...' : 'Reset Password'}
      </Button>
    </form>
  );
};

export default ResetPasswordForm;