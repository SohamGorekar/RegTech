import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials for testing
const DUMMY_USERS = [
  { email: "demo@regtech.com", password: "demo123", name: "Demo User" },
  { email: "founder@startup.com", password: "startup123", name: "Startup Founder" },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing session
    const savedUser = localStorage.getItem("regtech_user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check against dummy credentials
    const foundUser = DUMMY_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const userData = { email: foundUser.email, name: foundUser.name };
      setUser(userData);
      localStorage.setItem("regtech_user", JSON.stringify(userData));
      return { success: true };
    }

    // Also check localStorage for signed up users
    const registeredUsers = JSON.parse(localStorage.getItem("regtech_registered_users") || "[]");
    const registeredUser = registeredUsers.find(
      (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (registeredUser) {
      const userData = { email: registeredUser.email, name: registeredUser.name };
      setUser(userData);
      localStorage.setItem("regtech_user", JSON.stringify(userData));
      return { success: true };
    }

    return { success: false, error: "Invalid email or password" };
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if email already exists
    const existingDummy = DUMMY_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existingDummy) {
      return { success: false, error: "Email already registered" };
    }

    const registeredUsers = JSON.parse(localStorage.getItem("regtech_registered_users") || "[]");
    const existingUser = registeredUsers.find((u: any) => u.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return { success: false, error: "Email already registered" };
    }

    // Register new user
    const newUser = { email, password, name };
    registeredUsers.push(newUser);
    localStorage.setItem("regtech_registered_users", JSON.stringify(registeredUsers));

    // Auto login after signup
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem("regtech_user", JSON.stringify(userData));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("regtech_user");
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
