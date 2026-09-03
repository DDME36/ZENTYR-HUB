'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useSyncExternalStore,
} from 'react';

export type ZentyrTheme = 'sunset' | 'obsidian';

interface ThemeContextType {
  theme: ZentyrTheme;
  isDark: boolean;
  isAuto: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ZentyrTheme) => void;
  setIsAuto: (auto: boolean) => void;
  timeInfo: string;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Helper to determine day vs night
export const getDayNightTheme = (): ZentyrTheme => {
  const hour = new Date().getHours();
  return hour >= 6 && hour < 18 ? 'sunset' : 'obsidian';
};

const applyDomTheme = (t: ZentyrTheme) => {
  if (typeof document === 'undefined') return;
  const isDark = t === 'obsidian';
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

let listeners: Array<() => void> = [];
const emitChange = () => {
  for (const listener of listeners) {
    listener();
  }
};

const themeStore = {
  subscribe(listener: () => void) {
    listeners.push(listener);
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', listener);
    }
    return () => {
      listeners = listeners.filter((l) => l !== listener);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', listener);
      }
    };
  },
  getSnapshot(): ZentyrTheme {
    if (typeof window === 'undefined') return 'obsidian';
    const savedAuto = localStorage.getItem('zentyr_auto_2time') === 'true';
    if (savedAuto) return getDayNightTheme();
    const savedTheme = localStorage.getItem('zentyr_theme') as ZentyrTheme | null;
    if (savedTheme === 'sunset' || savedTheme === 'obsidian') return savedTheme;
    return 'obsidian';
  },
  getServerSnapshot(): ZentyrTheme {
    return 'obsidian';
  },
  setTheme(theme: ZentyrTheme) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zentyr_auto_2time', 'false');
      localStorage.setItem('zentyr_theme', theme);
      applyDomTheme(theme);
    }
    emitChange();
  },
  setIsAuto(auto: boolean) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zentyr_auto_2time', String(auto));
      if (auto) {
        const autoTheme = getDayNightTheme();
        applyDomTheme(autoTheme);
      }
    }
    emitChange();
  },
};

const isAutoStore = {
  getSnapshot(): boolean {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('zentyr_auto_2time') === 'true';
  },
  getServerSnapshot(): boolean {
    return false;
  },
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getServerSnapshot
  );

  const isAuto = useSyncExternalStore(
    themeStore.subscribe,
    isAutoStore.getSnapshot,
    isAutoStore.getServerSnapshot
  );

  const [timeInfo, setTimeInfo] = useState<string>('');

  // Keep DOM class in sync whenever theme changes
  useEffect(() => {
    applyDomTheme(theme);
  }, [theme]);

  // Update time info and handle auto timer
  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' });
      const currentDayNight = getDayNightTheme();
      setTimeInfo(
        `${timeStr} น. • ${currentDayNight === 'sunset' ? 'กลางวัน (Iris Horizon)' : 'กลางคืน (Obsidian Dark)'}`
      );

      if (localStorage.getItem('zentyr_auto_2time') === 'true') {
        applyDomTheme(currentDayNight);
        emitChange();
      }
    };

    checkTime();
    const interval = setInterval(checkTime, 30000);
    return () => clearInterval(interval);
  }, []);

  const setTheme = useCallback((newTheme: ZentyrTheme) => {
    themeStore.setTheme(newTheme);
  }, []);

  const setIsAuto = useCallback((auto: boolean) => {
    themeStore.setIsAuto(auto);
  }, []);

  const toggleTheme = useCallback(() => {
    const nextTheme: ZentyrTheme = theme === 'obsidian' ? 'sunset' : 'obsidian';
    themeStore.setTheme(nextTheme);
  }, [theme]);

  const isDark = theme === 'obsidian';

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDark,
        isAuto,
        toggleTheme,
        setTheme,
        setIsAuto,
        timeInfo,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    return {
      theme: 'obsidian' as ZentyrTheme,
      isDark: true,
      isAuto: false,
      toggleTheme: () => {},
      setTheme: () => {},
      setIsAuto: () => {},
      timeInfo: '',
    };
  }
  return context;
};
