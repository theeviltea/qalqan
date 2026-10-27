import { createContext, useContext, useEffect, type ReactNode } from 'react';
import { Platform } from 'react-native';

import { palette, type Colors } from './tokens';

type ThemeValue = { c: Colors };
const value: ThemeValue = { c: palette.light as Colors };
const ThemeContext = createContext<ThemeValue>(value);

/** Qalqan has one theme for now (light). The provider keeps the 919 API so a dark theme can be added later. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (Platform.OS !== 'web' || typeof document === 'undefined') return;
    document.documentElement.style.backgroundColor = palette.light.back;
    document.body.style.backgroundColor = palette.light.back;
  }, []);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
