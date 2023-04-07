import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert, Linking } from "react-native";

const AuthContext = createContext({});

const API_URL = "https://079d-189-216-183-37.ngrok.io";

const OK_BUTTON = { text: "OK" };

const getUserGoogle = async (setUser) => {
  try {
    const response = await axios.get(`${API_URL}/user/status`);
    const status = response.data;
    if (status === "Not Authenticated") {
      console.log(status);
      setUser(null);
    } else {
      console.log(status);
      setUser(status);
    }
  } catch (error) {
    console.log(error);
    setUser(null);
  } 
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getUserGoogle(setUser);
    Linking.addEventListener("url", () => getUserGoogle(setUser));
    return () => {
      Linking.removeAllListeners("url");
    };
  }, [reload]);

  const handleLogout = async () => {
    try {
      await axios.get(`${API_URL}/api/auth/google/logout`);

      Alert.alert("Sesion cerrada exitosamente", null, [OK_BUTTON], {
        cancelable: false,
      });
      getUserGoogle(setUser);
    } catch (error) {
      Alert.alert("Error al cerrar sesión", error.message, [OK_BUTTON], {
        cancelable: false,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogout,
        setReload,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
