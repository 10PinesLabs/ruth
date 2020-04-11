import { useEffect, useState } from 'react';

export const useDarkMode = () => {
  const modes = {light: 'light', dark: 'dark'};

  const [componentMounted, setComponentMounted] = useState(false);
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') || modes.light);
  const toggleTheme = () => {
   if(theme === modes.light) {
    window.localStorage.setItem('theme', modes.dark);
      setTheme(modes.dark);
    } else {
      window.localStorage.setItem('theme', modes.light);
      setTheme(modes.light)
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
    setComponentMounted(true);
  }, []);

  return [theme, toggleTheme, componentMounted];
};
