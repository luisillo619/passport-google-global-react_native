import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app.routes";
import { AuthProvider } from "../hooks/useAuth";

// npx uri-scheme open exp://192.168.0.3:19000/--/myapp/chat --android
// Esto es para poder redireccionar a X screen con le comando de arriba, por ejemplo chat
const linking = {
  prefixes: ["exp://192.168.0.4:19000/--/myapp"],
  config: {
    screens: {
      home: {
        path: "home",
      },
      login: {
        path: "login/:params",
        parse: {
          name: (params) => `${params}`,
        },
      },
      chat: {
        path: "chat",
      },
    },
  },
  
};

export default function Routes() {
  return (
    <NavigationContainer linking={linking}>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
