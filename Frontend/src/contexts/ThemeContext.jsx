import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('budgetbites-theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('budgetbites-theme', JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const colors = isDark ? {
    // Dark Mode Colors
    bg: '#292929',
    bgSecondary: '#474747',
    bgCard: '#3a3a3a',
    text: '#A69F98',
    textSecondary: '#d8b89d',
    accent: '#8C6057',
    accentLight: '#A39594',
    border: '#4a4a4a',
    success: '#AFD5AA',
    danger: '#e57373',
    warning: '#E3B23C'
  } : {
    // Light Mode Colors
    bg: '#EDEBDD',
    bgSecondary: '#F0F2EF',
    bgCard: '#ffffff',
    text: '#423E37',
    textSecondary: '#5C5346',
    accent: '#E3B23C',
    accentLight: '#AFD5AA',
    border: '#d0cec0',
    success: '#AFD5AA',
    danger: '#e57373',
    warning: '#E3B23C'
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};