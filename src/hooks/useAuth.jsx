import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = 'dailylens_user_session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on initial load
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

  // Sign In function
  const signIn = async (email, password) => {
    // Basic validation
    if (!email || !password) {
      throw new Error('Please fill in both email and password.');
    }

    // Simulate API authentication request delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo check
    const mockUser = {
      name: email.split('@')[0].replace('.', ' '),
      email: email,
      role: 'user', // Default role requirement
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(mockUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(mockUser));
    return mockUser;
  };

  // Sign Up function (strictly assigns role: "user")
  const signUp = async ({ name, email, password }) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    await new Promise((resolve) => setTimeout(resolve, 800));

    const newUser = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'user', // Explicit requirement: Default sign up role is "user"
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(email)}`,
      createdAt: new Date().toISOString(),
    };

    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  };

  // Sign Out function
  const signOut = () => {
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
