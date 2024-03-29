import { createContext, useState } from "react";

// เอาไว้ให้ child component เรียกใช้
const ThemeContext = createContext(null);

// เอาไว้ครอบตัวที่จะเรียกใช้ได้
function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState("center");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeContextProvider };
