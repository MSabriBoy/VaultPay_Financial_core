import { createContext, useEffect, useState } from "react";

import { storage } from "../utils/storage";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = storage.getUser();

    if (storedUser) {
      setUser(storedUser);
    }

    setLoading(false);
  }, []);

const login = (authData) => {
  storage.setToken(authData.token);

  storage.setUser(authData.user);

  setUser(authData.user);
};

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
};