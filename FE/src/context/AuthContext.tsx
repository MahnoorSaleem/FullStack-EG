import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';

interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
    exp: number;
  }
  

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const logout = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      const decoded = jwtDecode<DecodedToken>(savedToken);
      if (decoded.exp * 1000 > Date.now()) {
        setToken(savedToken);
        setLogoutTimer(decoded.exp);
      } else {
        logout();
      }
    }
  }, [logout]);

  const setLogoutTimer = (exp: number) => {
    const currentTime = Date.now() / 1000;
    const remainingTime = exp - currentTime;
    setTimeout(() => {
      logout();
    }, remainingTime * 1000);
  };

  const login = (token: string) => {
    const decoded = jwtDecode<DecodedToken>(token);
    setToken(token);
    localStorage.setItem('token', token);
    setLogoutTimer(decoded.exp);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;