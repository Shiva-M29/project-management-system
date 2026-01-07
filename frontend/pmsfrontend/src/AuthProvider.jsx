// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext(null);

// function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
 
//   const [token, setToken] = useState(null);
//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     const savedUser = localStorage.getItem("user");

//     if (savedToken) {
//     setToken(savedToken);
//   }

//   if (savedUser) {
//     try {
//       setUser(JSON.parse(savedUser));
//     } catch {
//       setUser(null);
//     }
//   }
//   }, []);

//   const login = (tokenData, userData) => {
//     setToken(tokenData);
//     setUser(userData);

//     localStorage.setItem("token", tokenData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };
//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//   }



//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export default AuthProvider;

// import { createContext, useContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(
//     JSON.parse(localStorage.getItem("user"))
//   );

//   const isAuthenticated = !!token;

//   const login = (data) => {
//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));
//     setToken(data.token);
//     setUser(data.user);
//   };

//   const logout = () => {
//     localStorage.clear();
//     setToken(null);
//     setUser(null);
//     window.location.replace("/login");
//   };

//   return (
//     <AuthContext.Provider
//       value={{ token, user, isAuthenticated, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);


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

// 🔐 Safe JSON parse helper
function safeParse(value) {
  try {
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}
