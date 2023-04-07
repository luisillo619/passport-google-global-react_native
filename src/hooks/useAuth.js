import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Alert } from "react-native";

const AuthContext = createContext({});
// sacarlo de ngrok. ngrok http 3001
const API_URL = "https://8667-189-216-183-37.ngrok.io";
const OK_BUTTON = { text: "OK" };

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUserGoogle();
  }, []);

  const getUserGoogle = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/status`);
      const status = response.data;
      if (status === "Not Authenticated") {
        console.log(status);
        setUser(null);
        return "Not Authenticated";
      } else {
        console.log(status);
        setUser(status);
        return "Authenticated";
      }
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  };

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
        setUser,
        handleLogout,
        getUserGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
