import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut, Mail, Edit2 } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Profile } from '../types/supabase';

const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (error) throw error;
        
        setProfile(data);
        setUsername(data.username);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  const handleUpdateProfile = async () => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      if (profile) {
        setProfile({
          ...profile,
          username,
          updated_at: new Date().toISOString(),
        });
      }
      
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-nunito font-bold text-neutral-800 dark:text-white mb-6">
        Settings
      </h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-nunito font-semibold text-neutral-800 dark:text-white">
              Profile
            </h2>
          </CardHeader>
          <CardBody>
            {loading ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-1/3"></div>
                <div className="h-4 bg-neutral-200 dark:bg-neutral-700 rounded w-3/4"></div>
              </div>
            ) : isEditing ? (
              <div className="space-y-4">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon={<User size={18} />}
                />
                
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setUsername(profile?.username || '');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleUpdateProfile}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center sm:justify-start mb-6">
                  <div className="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-500">
                    <User size={40} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center">
                    <User size={18} className="text-neutral-500 mr-2" />
                    <p className="font-medium">Username:</p>
                    <p className="ml-2">{profile?.username}</p>
                  </div>
                  
                  <div className="flex items-center">
                    <Mail size={18} className="text-neutral-500 mr-2" />
                    <p className="font-medium">Email:</p>
                    <p className="ml-2">{user?.email}</p>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  icon={<Edit2 size={18} />}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader>
            <h2 className="text-xl font-nunito font-semibold text-neutral-800 dark:text-white">
              Account
            </h2>
          </CardHeader>
          <CardBody>
            <Button
              variant="outline"
              icon={<LogOut size={18} />}
              onClick={handleLogout}
              className="text-error-500 border-error-500 hover:bg-error-50 dark:hover:bg-error-900 dark:hover:bg-opacity-20"
            >
              Sign Out
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;