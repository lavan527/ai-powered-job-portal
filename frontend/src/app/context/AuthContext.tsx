import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'jobseeker' | 'recruiter' | null;

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  skills?: string[];
  company?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => void;
  register: (name: string, email: string, password: string, role: UserRole) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole) => {
    // Mock login
    setUser({
      id: '1',
      name: role === 'recruiter' ? 'John Recruiter' : 'Jane Jobseeker',
      email,
      role,
      skills: role === 'jobseeker' ? ['React', 'TypeScript', 'Node.js'] : undefined,
      company: role === 'recruiter' ? 'Tech Corp' : undefined,
    });
  };

  const register = (name: string, email: string, password: string, role: UserRole) => {
    // Mock register
    setUser({
      id: '1',
      name,
      email,
      role,
      skills: role === 'jobseeker' ? [] : undefined,
      company: role === 'recruiter' ? 'New Company' : undefined,
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
