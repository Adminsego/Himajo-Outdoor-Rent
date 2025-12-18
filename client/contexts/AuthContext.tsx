import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AdminProfile = { id: number; username: string };

type AuthContextValue = {
  admin: AdminProfile | null;
  token: string | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<AdminProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch profile if token exists
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await fetch("/api/admin/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("unauthorized");
        const data = await res.json();
        setAdmin(data);
      } catch (err) {
        localStorage.removeItem("admin_token");
        setToken(null);
        setAdmin(null);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, [token]);

  const login = async (username: string, password: string) => {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body.message || "Login gagal");
    }
    const body = await res.json();
    localStorage.setItem("admin_token", body.token);
    setToken(body.token);
    setAdmin(body.admin);
    navigate("/admin/dashboard");
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setAdmin(null);
    navigate("/admin/login");
  };

  const value = useMemo<AuthContextValue>(
    () => ({ admin, token, isLoading, login, logout }),
    [admin, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
