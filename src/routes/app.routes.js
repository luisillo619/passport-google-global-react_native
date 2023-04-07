import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen/HomeScreen";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import useAuth from "../hooks/useAuth";
import ChatScreen from "../screens/ChatScreen";


const { Navigator, Screen } = createNativeStackNavigator();

export default function StackNavigator({ setUser }) {
  const { user } = useAuth();

  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Screen name="home" component={HomeScreen} />
          <Screen name="chat" component={ChatScreen} />
        </>
      ) : (
        <>
          <Screen
            name="login"
            component={LoginScreen}
          />
        </>
      )}
    </Navigator>
  );
}
