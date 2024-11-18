import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "../types/User"; // Ensure this type is correctly defined

export interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      console.log("Storing user in localStorage", user);
      localStorage.setItem("user", JSON.stringify(user)); // Update localStorage whenever the user changes
    } else {
      console.log("Removing user from localStorage");
      localStorage.removeItem("user"); // Remove from localStorage if no user
    }
  }, [user]); // Ensure this effect runs when `user` changes

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
