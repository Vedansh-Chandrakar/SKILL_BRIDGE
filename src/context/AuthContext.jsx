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
    registeredModes: 'both',
    activeMode: STUDENT_MODES.FREELANCER,
    campusId: 'c-mit',
  },
};

const AuthContext = createContext(null);

const STORAGE_KEY = 'sb_user_type';
const STUDENT_MODE_KEY = 'sb_student_mode';

/** Build a student user with the correct registeredModes from storage/param. */
function buildStudentUser(studentMode) {
  const mode = studentMode ?? localStorage.getItem(STUDENT_MODE_KEY) ?? 'freelancer';
  const base = { ...MOCK_USERS.student };
  base.registeredModes = mode; // 'freelancer' | 'recruiter' | 'both'
  base.activeMode = mode === 'recruiter' ? STUDENT_MODES.RECRUITER : STUDENT_MODES.FREELANCER;
  return base;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'student') return buildStudentUser();
    return MOCK_USERS[saved] ?? buildStudentUser();
  });
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  const login = useCallback((userType = 'student', studentMode) => {
    let u;
    if (userType === 'student' || !MOCK_USERS[userType]) {
      u = buildStudentUser(studentMode);
      localStorage.setItem(STUDENT_MODE_KEY, u.registeredModes);
    } else {
      u = MOCK_USERS[userType];
    }
    setUser(u);
    setIsAuthenticated(true);
    localStorage.setItem(STORAGE_KEY, u.type);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEY);
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
