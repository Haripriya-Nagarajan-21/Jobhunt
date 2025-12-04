import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);


  const register = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists
        if (users.some((u) => u.email === email)) {
          return reject(new Error("Email already exists"));
        }

        const newUser = { name, email, password };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        resolve();
      }, 700);
    });
  };

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        const foundUser = users.find(
          (u) => u.email === email && u.password === password
        );

        if (!foundUser) {
          return reject(new Error("Invalid email or password"));
        }

        localStorage.setItem("user", JSON.stringify(foundUser));
        setUser(foundUser);

        resolve();
      }, 700);
    });
  };


  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("profile");  
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
