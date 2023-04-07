import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Platform,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import useAuth from "../hooks/useAuth";
import styles from "./ButtonGoogle.style";

export default function ButtonGoogle({ children }) {
  const [uri, setURL] = useState(false);
  const { getUserGoogle } = useAuth();

  useEffect(() => {
    const handleRedirect = () => {
      handleOpenURL();
    };
    Linking.addEventListener("url", handleRedirect);
    return () => {
      Linking.removeAllListeners("url");
    };
  }, []);

  const handleOpenURL = async () => {
    // GOOGLE CONTEXT
    try {
      setURL(false);
      const response = await getUserGoogle();

      Alert.alert(
        response,
        null,
        [
          {
            text: "OK",
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const openUrl = async () => {
    setURL(true);
  };

  return (
    <>
      {uri === true ? (
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          }}
        >
          <WebView
            userAgent={
              Platform.OS === "android"
                ? "Chrome/98.0.4758.101 Mobile Safari/537.36"
                : "AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/98.0.4758.101 Mobile Safari/605.1.15"
            }
            source={{
              uri: "https://8667-189-216-183-37.ngrok.io/api/auth/google",
            }}
            style={styles.google__WebView}
            sharedCookiesEnabled={true}
            cacheEnabled={false}
            // headers
          />
          <Button title="Back" onPress={() => setURL(false)} />
        </SafeAreaView>
      ) : (
        <>
          <View style={styles.google__container}>
            {children}
            <TouchableOpacity
              style={styles.google__TouchableOpacity}
              onPress={() => openUrl()}
            >
              <Text style={styles.google__TouchableOpacity_Text}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </>
  );
}
