import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./app.routes";
import { AuthProvider } from "../hooks/useAuth";
import { Text } from "react-native";

// DEEP LINKS, CON ESTO DESDE EL BACK PUEDO REDIRECCIONAR A LA APP
// npx uri-scheme open exp://192.168.0.3:19000/--/myapp/chat --android
// Esto es para poder redireccionar a X screen con le comando de arriba, por ejemplo chat
export default function Routes() {
  const [configLinking, setConfigLinking] = useState(null);
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (user) {
      setConfigLinking({
        prefixes: ["exp://192.168.0.4:19000/--/myapp"],
        config: {
          screens: {
            home: {
              path: "home",
            },
            chat: {
              path: "chat",
            },
          },
        },
      });
    } else {
      setConfigLinking({
        prefixes: ["exp://192.168.0.4:19000/--/myapp"],
        config: {
          screens: {
            login: {
              path: "login/:params",
              parse: {
                name: (params) => `${params}`,
              },
            },
          },
        },
      });
    }
  }, [user]);

  return (
    <AuthProvider>
      <NavigationContainer
        linking={configLinking}
        fallback={<Text>Loading...</Text>}
      >
        <StackNavigator setUser={setUser} />
      </NavigationContainer>
    </AuthProvider>
  );
}
