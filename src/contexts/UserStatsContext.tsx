import { createContext, useContext, type ReactNode } from 'react';
import { useUserStatsState } from '@/hooks/useUserStats';

type UserStatsContextValue = ReturnType<typeof useUserStatsState>;

const UserStatsContext = createContext<UserStatsContextValue | null>(null);

/**
 * Una sola instancia de `useUserStatsState()` para toda la app. Así, cuando
 * `LessonView` registra XP con `recordActivity()`, el `Navbar` (o cualquier
 * otro consumidor) ve el cambio al instante — antes cada componente tenía su
 * propia copia del estado y no se sincronizaban entre sí.
 */
export function UserStatsProvider({ children }: { children: ReactNode }) {
  const value = useUserStatsState();
  return <UserStatsContext.Provider value={value}>{children}</UserStatsContext.Provider>;
}

export function useUserStats() {
  const ctx = useContext(UserStatsContext);
  if (!ctx) {
    throw new Error('useUserStats debe usarse dentro de <UserStatsProvider>');
  }
  return ctx;
}
