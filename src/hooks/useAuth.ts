import { useUserStore } from '../store/useUserStore';
import { validators } from '../utils/validators';

/**
 * Wraps auth-related actions (login, register, sign-out) and
 * exposes the current auth state from the global user store.
 *
 * NOTE: login & register currently use local validation only (mock mode).
 * Replace the mock blocks with real API calls once a backend is available.
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, logout, setLoading } = useUserStore();

  const login = async (email: string, password: string): Promise<string | null> => {
    // ── Validate locally ──────────────────────────────────────────────────────
    const emailErr = validators.email(email);
    if (emailErr) return emailErr;

    const passwordErr = validators.password(password);
    if (passwordErr) return passwordErr;

    // ── Mock: simulate network delay then set a guest user ───────────────────
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setUser(
      {
        id: 'mock-001',
        name: email.split('@')[0],
        email,
      },
      'mock-token'
    );
    setLoading(false);
    return null; // null = success
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<string | null> => {
    const nameErr  = validators.required(name, 'Full name');
    if (nameErr) return nameErr;

    const emailErr = validators.email(email);
    if (emailErr) return emailErr;

    const passwordErr = validators.password(password);
    if (passwordErr) return passwordErr;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setUser({ id: 'mock-002', name, email }, 'mock-token');
    setLoading(false);
    return null;
  };

  const signOut = () => {
    logout();
  };

  return { user, isAuthenticated, isLoading, login, register, signOut };
}
