import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Button,
  Linking,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";

export default function LoginScreen() {
  const [uri, setURL] = useState(false);
  const { getUserGoogle } = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    const handleRedirect = () => {
      handleOpenURL();
    };
    Linking.addEventListener("url", handleRedirect);
    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  });

  const handleOpenURL = () => {
    // GOOGLE CONTEXT
    setURL(false);
    getUserGoogle();

    Alert.alert(
      "Autenticado correctamente",
      null,
      [
        {
          text: "OK",
        },
      ],
      { cancelable: false }
    );
  };

  const openUrl = async () => {
    setURL(true);
  };

  return (
    <>
      {uri === true ? (
        <SafeAreaView style={{ flex: 1 }}>
          <WebView
            userAgent={
              Platform.OS === "android"
                ? "Chrome/98.0.4758.101 Mobile Safari/537.36"
                : "AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/98.0.4758.101 Mobile Safari/605.1.15"
            }
            source={{
              uri: "https://079d-189-216-183-37.ngrok.io/api/auth/google",
            }}
            style={{ flex: 1 }}
            sharedCookiesEnabled={false}
            cacheEnabled={false}
            // headers
          />
        </SafeAreaView>
      ) : (
        <View>
          <Button title="Google" onPress={() => openUrl()} />
        </View>
      )}
    </>
  );
}
