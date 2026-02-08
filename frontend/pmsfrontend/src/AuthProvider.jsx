


import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedUserRaw = localStorage.getItem("user");

  const [token, setToken] = useState(storedToken);
  const [user, setUser] = useState(safeParse(storedUserRaw));

  const isAuthenticated = !!token;

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}
