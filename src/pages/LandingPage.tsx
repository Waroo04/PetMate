import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PawPrint,
  Heart,
  Calendar,
  MessageSquare,
  Sun,
  Moon,
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Button from '../components/common/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const features = [
    {
      icon: <PawPrint size={32} className="text-primary-500" />,
      title: 'Pet Profile Management',
      description:
        "Keep track of your pets' information, health records, and important documents all in one place.",
    },
    {
      icon: <Calendar size={32} className="text-secondary-500" />,
      title: 'Appointment Scheduling',
      description:
        'Never miss a vet visit or grooming session with our smart appointment reminder system.',
    },
    {
      icon: <Heart size={32} className="text-accent-500" />,
      title: 'Health Monitoring',
      description:
        "Track your pets' weight, medications, and health metrics to ensure they stay healthy.",
    },
    {
      icon: <MessageSquare size={32} className="text-primary-500" />,
      title: 'AI Pet Assistant',
      description:
        'Get instant answers to your pet care questions with our AI-powered chat assistant.',
    },
  ];

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Navigation */}
      <nav className="bg-neutral-900 dark:bg-neutral-800 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <PawPrint className="h-10 w-10 text-primary-500" />
              <span className="ml-3 text-2xl font-nunito font-bold text-white">
                PetMate
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-6 w-6 text-white" />
                ) : (
                  <Moon className="h-6 w-6 text-white" />
                )}
              </button>
              <Button
                variant="outline"
                onClick={() => navigate('/login')}
                className="text-white border-white hover:bg-white hover:text-neutral-900"
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-nunito font-bold text-neutral-800 dark:text-white mb-8 leading-tight">
            Welcome to PetMate
          </h1>
          <p className="text-2xl text-neutral-600 dark:text-neutral-400 mb-12 leading-relaxed">
            Your all-in-one platform for managing your pet's health,
            appointments, and well-being. Experience seamless pet care
            management with our intuitive tools and features.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/signup')}
            className="text-xl px-12 py-4"
          >
            Get Started Now
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-24">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-neutral-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-6">
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-full w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-2xl font-nunito font-bold text-neutral-800 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-900 dark:bg-neutral-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <PawPrint className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-nunito font-bold text-white">
                PetMate
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-neutral-400 hover:text-white transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center md:text-left">
            <p className="text-neutral-400">
              © 2025 PetMate. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
