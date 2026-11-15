
import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser =
        localStorage.getItem("gymUser") ||
        sessionStorage.getItem("gymUser");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("gymUser");
      sessionStorage.removeItem("gymUser");
      return null;
    }
  });

  const login = (userData, rememberMe = false) => {
    localStorage.removeItem("gymUser");
    sessionStorage.removeItem("gymUser");

    if (rememberMe) {
      localStorage.setItem("gymUser", JSON.stringify(userData));
    } else {
      sessionStorage.setItem("gymUser", JSON.stringify(userData));
    }

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("gymUser");
    sessionStorage.removeItem("gymUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
