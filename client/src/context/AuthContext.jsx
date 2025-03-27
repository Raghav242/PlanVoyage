import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Function to fetch logged-in user
  const fetchUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
        credentials: "include",
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user on mount
  }, []);

  // Login function
  const login = async (username, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });

    if (response.ok) {
      await fetchUser(); // Fetch user data after login
    }

    return response;
  };

  // Logout function
  const logout = async () => {
    // Perform logout request
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, { method: "POST", credentials: "include" });
    
    // Clear the user state
    setUser(null);
  
    // Redirect to the login page or any other page after logging out

    navigate("/login");
  };
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthUser() {
  return useContext(AuthContext);
}
