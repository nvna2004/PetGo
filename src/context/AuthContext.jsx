import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [account, setAccount] = useState(undefined);
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("account");

    if (stored) {
      try {
        setAccount(JSON.parse(stored));
      } catch (e) {
        console.error("Lỗi parse account từ localStorage", e);
        setAccount(null);
      }
    } else {
      setAccount(null);
    }

    setLoadingAccount(false);
  }, []);

  const updateAccount = (updated) => {
    const newAccount = { ...account, ...updated };
    setAccount(newAccount);
    localStorage.setItem("account", JSON.stringify(newAccount));
  };

  
  const login = (authData) => {
    const token = authData.result?.token || authData.token;
    const refreshToken = authData.result?.refreshToken || authData.refreshToken;
    const userAccount = authData.result?.user || authData.result?.account || authData.user || authData.account;

    if (token) localStorage.setItem("token", token);
    if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
    if (userAccount) {
      localStorage.setItem("account", JSON.stringify(userAccount));
      setAccount(userAccount);
    }

    setIsLoggingOut(false); 
    
    const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
    if (guestCart.length > 0 && userAccount?.accountId) {
      guestCart.forEach(async (item) => {
        try {
          console.log("Đồng bộ giỏ hàng:", item);
          await api.post("/cart/add", {
            accountId: userAccount.accountId,
            bookId: item.bookId,
            condition: item.condition,
            copyId: item.copyId,
          });
        } catch (e) {
          console.error("Đồng bộ giỏ hàng lỗi:", e);
        }
      });
      localStorage.removeItem("guest_cart");
    }
  };

  const logout = () => {
    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("account");
      localStorage.removeItem("user");
      setAccount(null);
    }, 0);
  };

  return (
    <AuthContext.Provider
      value={{
        account,
        login,
        logout,
        updateAccount,
        loadingAccount,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}