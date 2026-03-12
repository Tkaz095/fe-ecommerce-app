export const validators = {
  /** Returns an error string or null (valid) */
  email: (value: string): string | null => {
    if (!value.trim()) return 'Email is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address.';
    return null;
  },

  password: (value: string): string | null => {
    if (!value) return 'Password is required.';
    if (value.length < 8) return 'Password must be at least 8 characters.';
    return null;
  },

  required: (value: string, label = 'This field'): string | null => {
    if (!value.trim()) return `${label} is required.`;
    return null;
  },

  phone: (value: string): string | null => {
    if (!value.trim()) return null; // phone is often optional
    if (!/^\+?[\d\s\-(]{7,15}$/.test(value)) return 'Please enter a valid phone number.';
    return null;
  },

  minLength: (value: string, min: number, label = 'This field'): string | null => {
    if (value.length < min) return `${label} must be at least ${min} characters.`;
    return null;
  },
};
