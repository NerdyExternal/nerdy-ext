import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

interface AccountContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  authMode: 'login' | 'register';
  setAuthMode: (mode: 'login' | 'register') => void;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

export function AccountProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('nerdy_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('nerdy_user');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check stored users
    const users = JSON.parse(localStorage.getItem('nerdy_users') || '[]');
    const foundUser = users.find((u: any) => 
      (u.username === username || u.email === username) && u.password === password
    );
    
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('nerdy_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    
    // Demo account
    if (username === 'demo' && password === 'demo') {
      const demoUser = {
        id: 'demo-001',
        username: 'demo',
        email: 'demo@nerdyexternal.com',
        createdAt: new Date()
      };
      setUser(demoUser);
      localStorage.setItem('nerdy_user', JSON.stringify(demoUser));
      return true;
    }
    
    return false;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists
    const users = JSON.parse(localStorage.getItem('nerdy_users') || '[]');
    if (users.some((u: any) => u.username === username || u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      username,
      email,
      password,
      createdAt: new Date()
    };
    
    users.push(newUser);
    localStorage.setItem('nerdy_users', JSON.stringify(users));
    
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('nerdy_user', JSON.stringify(userWithoutPassword));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nerdy_user');
  };

  return (
    <AccountContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      register,
      logout,
      showAuthModal,
      setShowAuthModal,
      authMode,
      setAuthMode
    }}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (context === undefined) {
    throw new Error('useAccount must be used within an AccountProvider');
  }
  return context;
}
