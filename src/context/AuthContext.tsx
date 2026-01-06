"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, AuthContextType, AuthResult } from "../types";

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) setUser(JSON.parse(stored));
    } catch {}
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): AuthResult => {
    if (username === "admin" && password === "admin123") {
      const userData = { username: "admin", name: "Administrator" };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      document.cookie = `auth=1; path=/; max-age=${60 * 60 * 24 * 7}`;
      return { success: true, message: "Login successful!" };
    }
    return { success: false, message: "Invalid credentials!" };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    document.cookie = "auth=; path=/; max-age=0";
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
