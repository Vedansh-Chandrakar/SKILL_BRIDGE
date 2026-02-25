import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ROLES, STUDENT_MODES } from '@/models';

/* ── Mock user for dev — replace with real auth later ──── */
const MOCK_USERS = {
  admin: {
    id: 'u-admin-1',
    name: 'Super Admin',
    email: 'admin@skillbridge.io',
    avatar: '',
    type: ROLES.ADMIN,
  },
  campus: {
    id: 'u-campus-1',
    name: 'Campus Authority',
    email: 'authority@mit.edu',
    avatar: '',
    type: ROLES.CAMPUS,
    campusId: 'c-mit',
  },
  student: {
    id: 'u-student-1',
    name: 'Jane Doe',
    email: 'jane@mit.edu',
    avatar: '',
    type: ROLES.STUDENT,
    activeMode: STUDENT_MODES.FREELANCER,
    campusId: 'c-mit',
  },
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USERS.student); // default login
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = useCallback((userType = 'student') => {
    setUser(MOCK_USERS[userType] ?? MOCK_USERS.student);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({ user, isAuthenticated, login, logout }),
    [user, isAuthenticated, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within <AuthProvider>');
  return ctx;
}
