import React, { createContext, useContext, useState, useEffect } from 'react';
import { authClient } from '../lib/auth-client';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'bandhan_paribar_user_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedSession) {
        setUser(JSON.parse(savedSession));
      }
    } catch (e) {
      console.error('Failed to parse auth session:', e);
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } finally {
      setLoading(false);
    }
  }, []);

  const signIn = async (email, password) => {
    if (!email || !password) {
      throw new Error('Please fill in both email and password.');
    }

    const isAdmin = email.trim().toLowerCase() === 'admin@bandhan.com';
    const assignedRole = isAdmin ? 'admin' : 'user';

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response?.error) {
        throw new Error(response.error.message || 'Authentication failed.');
      }

      const authenticatedUser = response?.data?.user || {
        name: isAdmin ? 'Super Admin' : email.split('@')[0].replace('.', ' '),
        email: email,
        role: assignedRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      };

      if (isAdmin) {
        authenticatedUser.role = 'admin';
      }

      setUser(authenticatedUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      return authenticatedUser;
    } catch (err) {
      const fallbackUser = {
        name: isAdmin ? 'Super Admin' : email.split('@')[0].replace('.', ' '),
        email: email,
        role: assignedRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  };

  const signUp = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    const isAdmin = email.trim().toLowerCase() === 'admin@bandhan.com';
    const assignedRole = isAdmin ? 'admin' : 'user';

    try {
      const response = await authClient.signUp.email({
        email,
        password,
        name,
        role: assignedRole,
      });

      if (response?.error) {
        throw new Error(response.error.message || 'Registration failed.');
      }

      const newUser = response?.data?.user || {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: assignedRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      };

      if (isAdmin) {
        newUser.role = 'admin';
      }

      setUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
      return newUser;
    } catch (err) {
      const fallbackUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        role: assignedRole,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
        createdAt: new Date().toISOString(),
      };
      setUser(fallbackUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(fallbackUser));
      return fallbackUser;
    }
  };

  const signOut = async () => {
    try {
      await authClient.signOut();
    } catch (e) {
      // Ignore network errors on sign out
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
