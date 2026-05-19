import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { PropsWithChildren } from 'react';

type ThemeMode = 'light' | 'dark';

type ThemeContextValue = {
  themeMode: ThemeMode;
  isDark: boolean;
  toggleTheme: () => void;
};

const themeStorageKey = 'brew-market-theme-mode';

const ThemeContext = createContext<ThemeContextValue | null>(null);

function resolveInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const storedThemeMode = window.localStorage.getItem(themeStorageKey);

  if (storedThemeMode === 'light' || storedThemeMode === 'dark') {
    return storedThemeMode;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function ThemeProvider({ children }: PropsWithChildren) {
  const [themeMode, setThemeMode] = useState<ThemeMode>(resolveInitialThemeMode);

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const rootElement = document.documentElement;

    rootElement.classList.toggle('theme-dark', themeMode === 'dark');
    rootElement.setAttribute('data-theme', themeMode);
    rootElement.style.colorScheme = themeMode;
    window.localStorage.setItem(themeStorageKey, themeMode);
  }, [themeMode]);

  const toggleTheme = useCallback(() => {
    setThemeMode((currentThemeMode) => (
      currentThemeMode === 'dark' ? 'light' : 'dark'
    ));
  }, []);

  const value = useMemo<ThemeContextValue>(() => ({
    themeMode,
    isDark: themeMode === 'dark',
    toggleTheme,
  }), [themeMode, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider.');
  }

  return context;
}
