import { createContext, useContext, type ReactNode } from 'react';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

type AuthContextValue = ReturnType<typeof useSupabaseAuth>;

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return ctx;
}
