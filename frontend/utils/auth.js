import React, { useState, useEffect, useContext, createContext } from "react";
import nookies from "nookies";
import "firebase/auth";
import { useRouter } from "next/router";

import { AGE_VERIFIED, TOKEN } from "../constants";
import { getToken } from "./general";
import { useModal } from "../context/Modal";
import { getLocalStorage } from "./localStorage";
import firebaseClientInit from "./firebaseClient";
import AuthService from "../services/api/AuthService";
import { MODAL_AGE_VERIFICATION } from "../constants";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  firebaseClientInit();
  const { showModal } = useModal();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const authUser = async () => {
    try {
      const { data: userDetails } = await AuthService.me();

      // Set user state
      setUser(userDetails);

      // Set loading state
      setLoading(false);
    } catch (error) {
      console.error(error);

      // Set cookies
      nookies.set(undefined, TOKEN, "", { path: "/" });

      // Redirect to login
      await router.replace("/login");

      // Set user state
      setUser(null);

      // Set loading state
      setLoading(false);
    }
  };

  useEffect(() => {
    // Get item from local storage
    const isVerified = getLocalStorage(AGE_VERIFIED);

    if (!isVerified || isVerified === "false") {
      showModal({
        payload: {},
        showCloseBtn: false,
        name: MODAL_AGE_VERIFICATION,
      });
    }

    // Get token from cookies
    const token = getToken();

    if (!token) {
      // Set user state
      setUser(null);

      // Set loading state
      setLoading(false);
      return;
    }

    // Call auth user
    authUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {" "}
      {children}{" "}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
