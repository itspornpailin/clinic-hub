import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { api } from "./api";
import { useNavigate } from "@tanstack/react-router";

export type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: "patient" | "clinic" | "admin";
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  signIn: (credentials: any) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // On page load, check if we have a saved user session
    const token = localStorage.getItem('access_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (credentials: any) => {
    const response = await api.post('/auth/signin', credentials);
    const { session, user: dbUser } = response.data;

    // Save token for the API interceptor
    localStorage.setItem('access_token', session.access_token);
    
    // Parse and save user data
    const userData: AuthUser = {
      id: dbUser.id,
      email: dbUser.email,
      name: dbUser.user_metadata?.full_name || 'User',
      role: dbUser.user_metadata?.role || 'patient',
    };

    localStorage.setItem('user_data', JSON.stringify(userData));
    setUser(userData);
    
    // Redirect to dashboard after login
    navigate({ to: '/dashboard' });
  };

  const signOut = async () => {
    try {
      await api.post('/auth/signout');
    } catch (e) {
      console.error("Sign out error", e);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_data');
      setUser(null);
      navigate({ to: '/login' });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};