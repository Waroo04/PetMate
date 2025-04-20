import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import Input from '../common/Input';
import Button from '../common/Button';
import { useAuth } from '../../contexts/AuthContext';

const SignupForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signup(email, password, username);
      navigate('/');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
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
      
      <Input
        label="Username"
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        icon={<User size={18} />}
      />
      
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        icon={<Mail size={18} />}
      />
      
      <Input
        label="Password"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        icon={<Lock size={18} />}
      />
      
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
      
      <Button 
        type="submit" 
        variant="primary" 
        fullWidth 
        disabled={loading}
        className="mt-6"
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;