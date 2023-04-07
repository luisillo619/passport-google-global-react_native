import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import useAuth from "../hooks/useAuth";
import ChatScreen from "../screens/ChatScreen";

const { Navigator, Screen } = createNativeStackNavigator();

export default function StackNavigator({ setUser }) {
  const { user } = useAuth();

  useEffect(() => {
    setUser(user);
  }, [user]);
  return (
    <Navigator>
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
            options={{ headerShown: false }}
          />
        </>
      )}
    </Navigator>
  );
}

