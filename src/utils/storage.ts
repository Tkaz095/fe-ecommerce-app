/**
 * Thin AsyncStorage wrapper with JSON serialisation.
 *
 * Install first:
 *   npx expo install @react-native-async-storage/async-storage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  /** Retrieve and deserialise a stored value. Returns null if missing or corrupt. */
  get: async <T>(key: string): Promise<T | null> => {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  },

  /** Serialise and store a value. */
  set: <T>(key: string, value: T): Promise<void> =>
    AsyncStorage.setItem(key, JSON.stringify(value)),

  /** Remove a single key. */
  remove: (key: string): Promise<void> =>
    AsyncStorage.removeItem(key),

  /** Wipe all stored data (use with caution). */
  clear: (): Promise<void> =>
    AsyncStorage.clear(),
};
