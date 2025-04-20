import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, username: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user || null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      // First, create the auth user
      const { error: signUpError, data } = await supabase.auth.signUp({ email, password });
      if (signUpError) throw signUpError;
      
      if (!data.user) {
        throw new Error('User account creation failed');
      }
      
      // Then create the profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: data.user.id,
            username,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
        
      // Verify the profile was created successfully
      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Since auth user is created but profile failed, we should try to clean up
        // We can't delete the auth user easily, but at least inform the user
        throw new Error('Account created but profile setup failed. Please contact support.');
      }
      
      // Check that the profile was actually created
      const { data: profileData, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single();
        
      if (checkError || !profileData) {
        throw new Error('Profile verification failed. Please try again or contact support.');
      }
      
    } catch (error) {
      // Rethrow the error so the UI can handle it
      throw error;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  };

  const value = {
    session,
    user,
    loading,
    login,
    signup,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};