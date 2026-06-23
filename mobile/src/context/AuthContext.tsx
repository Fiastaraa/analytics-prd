import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { login as loginRequest, LoginRequest, UserType } from '../api/auth.api';
import { setUnauthorizedListener } from '../api/axios';

type AuthContextType = {
  user: UserType | null;
  loading: boolean;
  signIn: (credentials: LoginRequest) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  const signOut = async () => {
    setLoading(true);
    try {
      await SecureStore.deleteItemAsync('accessToken');
      await SecureStore.deleteItemAsync('user');
    } catch (e) {
      console.warn('Failed to delete secure credentials', e);
    }
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await SecureStore.getItemAsync('accessToken');
        const userData = await SecureStore.getItemAsync('user');
        if (token && userData) {
          setUser(JSON.parse(userData));
        }
      } catch (e) {
        console.warn('Failed to restore secure session', e);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();

    // Set listener for automatic 401 logouts
    setUnauthorizedListener(() => {
      signOut();
    });
  }, []);

  const signIn = async (credentials: LoginRequest) => {
    setLoading(true);
    try {
      const response = await loginRequest(credentials);
      if (response && response.token) {
        await SecureStore.setItemAsync('accessToken', response.token);
        await SecureStore.setItemAsync('user', JSON.stringify(response.user));
        setUser(response.user);
      } else {
        throw new Error('Invalid token returned');
      }
    } finally {
      setLoading(false);
    }
  };

  const value = useMemo(
    () => ({ user, loading, signIn, signOut }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
