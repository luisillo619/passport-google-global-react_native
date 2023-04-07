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
  const { setReload } = useAuth();
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

  const handleReload = () => {
    setReload(Math.random()), setURL(false);
  };

  const handleOpenURL = () => {
    Alert.alert(
      "Autenticado correctamente",
      null,
      [
        {
          text: "OK",
          onPress: () => {
            handleReload();
          },
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

// import React, { useEffect, useState } from "react";
// import { View, SafeAreaView, Platform, Button, Linking, Alert } from "react-native";
// import * as WebBrowser from "expo-web-browser";
// import { WebView } from "react-native-webview";

// export default function LoginScreen() {
//   const [uri, setURL] = useState("");

//   useEffect(() => {
//     const handleRedirect = (event) => {
//       handleOpenURL(event.url);
//     };

//     Linking.addEventListener("url", handleRedirect);

//     return () => {
//       Linking.removeEventListener("url", handleRedirect);
//     };
//   }, []);

//   const handleOpenURL = (url) => {
//     Alert.alert(
//       "URL recibida",
//       url,
//       [
//         {
//           text: "OK",
//           onPress: () => {
//             setURL(url);
//           },
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   const openUrl = async (url) => {
//     try {
//       await WebBrowser.openBrowserAsync(url);
//     } catch (error) {
//       console.log(error);
//       Alert.alert("Error al abrir la página", error.message);
//     }
//   };

//   return (
//     <>
//       {uri !== "" ? (
//         <SafeAreaView style={{ flex: 1 }}>
//           <WebView
//             userAgent={
//               Platform.OS === "android"
//                 ? "Chrome/98.0.4758.101 Mobile Safari/537.36"
//                 : "AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/98.0.4758.101 Mobile Safari/605.1.15"
//             }
//             source={ "https://9079-189-216-183-37.ngrok.io/api/auth/google" }
//             style={{ flex: 1 }}
//             sharedCookiesEnabled={true} // Agregado para guardar cookies en la app
//           />
//         </SafeAreaView>
//       ) : (
//         <View>
//           <Button
//             title="Google"
//             onPress={() =>
//               openUrl("https://9079-189-216-183-37.ngrok.io/api/auth/google")
//             }
//           />
//         </View>
//       )}
//     </>
//   );
// }
