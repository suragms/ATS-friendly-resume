import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { authAPI } from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('user');

      if (token && userData) {
        try {
          // Verify token with backend
          const response = await authAPI.getCurrentUser();
          setUser(response.data.user);
        } catch (error) {
          // Token is invalid, clear storage
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('SignIn called with:', { email, password: '***' });
    try {
      const response = await authAPI.signIn({ email, password });
      const { token, user: userData } = response.data;

      // Store authentication data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      console.log('SignIn successful:', userData);
    } catch (error: any) {
      console.error('SignIn error:', error);
      throw new Error(error.response?.data?.message || 'Sign in failed');
    }
  };

  const signUp = async (name: string, email: string, password: string) => {
    console.log('SignUp called with:', { name, email, password: '***' });
    try {
      const response = await authAPI.signUp({ name, email, password });
      const { token, user: userData } = response.data;

      // Store authentication data
      localStorage.setItem('authToken', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      setUser(userData);
      console.log('SignUp successful:', userData);
    } catch (error: any) {
      console.error('SignUp error:', error);
      throw new Error(error.response?.data?.message || 'Sign up failed');
    }
  };

  const signOut = async () => {
    try {
      // Call backend to invalidate token
      await authAPI.signOut();
    } catch (error) {
      // Even if backend call fails, clear local storage
      console.error('Sign out error:', error);
    } finally {
      // Clear authentication data
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      setUser(null);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const response = await authAPI.googleAuth();
      // Redirect to Google OAuth
      window.location.href = response.data.authUrl;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Google sign in failed');
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 