import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { ROLES, STUDENT_MODES } from '@/models';
import { useAuthContext } from './AuthContext';

const RoleContext = createContext(null);

/**
 * Manages the student's active mode (Freelancer ↔ Recruiter toggle)
 * and exposes permission helpers used throughout the app.
 */
export function RoleProvider({ children }) {
  const { user } = useAuthContext();

  const [activeMode, setActiveMode] = useState(
    user?.activeMode ?? STUDENT_MODES.FREELANCER,
  );

  /** Toggle between Freelancer and Recruiter modes (students only). */
  const toggleMode = useCallback(() => {
    setActiveMode((prev) =>
      prev === STUDENT_MODES.FREELANCER
        ? STUDENT_MODES.RECRUITER
        : STUDENT_MODES.FREELANCER,
    );
  }, []);

  /** The effective role used for RBAC checks. */
  const effectiveRole = useMemo(() => {
    if (!user) return null;
    if (user.type === ROLES.STUDENT) return activeMode; // 'freelancer' | 'recruiter'
    return user.type; // 'admin' | 'campus'
  }, [user, activeMode]);

  /**
   * Check whether the current user has one of the allowed roles.
   * @param {string[]} allowed - e.g. ['admin','campus']
   */
  const hasAccess = useCallback(
    (allowed = []) => allowed.includes(effectiveRole),
    [effectiveRole],
  );

  const value = useMemo(
    () => ({ activeMode, effectiveRole, toggleMode, hasAccess }),
    [activeMode, effectiveRole, toggleMode, hasAccess],
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoleContext() {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error('useRoleContext must be used within <RoleProvider>');
  return ctx;
}
