import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.jsx';

function ThemeProvider({ children }) {
  const themeList = ['default', 'candy', 'cookie', 'hacker', 'royal', 'panda'];
  const [themeNo, setThemeNo] = useState(0);

  // Retrieve theme from localstorage on mount
  useEffect(() => {
    const cachedTheme = localStorage.getItem('themeNo');
    if (cachedTheme != null) setThemeNo(Number(cachedTheme));
  }, []);

  // Update theme
  useEffect(() => {
    const themeClass = themeList[themeNo] + '-theme';
    document.body.className = themeClass;
    localStorage.setItem('themeNo', themeNo);
  }, [themeNo]);

  return (
    <ThemeContext.Provider value={{ themeList, themeNo, setThemeNo }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
