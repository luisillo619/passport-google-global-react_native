import { Button, StatusBar, TouchableOpacity, View } from "react-native";
import React from "react";
import useAuth from "../../hooks/useAuth";
import { SafeAreaView } from "react-native";
import styles from "./HomeScreen.syles";

import { Ionicons } from "@expo/vector-icons";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const { user, handleLogout } = useAuth();
  const navigation = useNavigation();
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        {/*Header*/}
        <View style={styles.home__header_container}>
          <TouchableOpacity
            style={styles.home__header_TouchableOpacity_rigth}
            onPress={() => navigation.navigate("chat")}
          >
            <Ionicons
              name="chatbubbles-sharp"
              size={wp("10%")}
              color="#FF5864"
            />
          </TouchableOpacity>
        </View>
        {/*END Header*/}

        <Button title="logout" onPress={()=>handleLogout()}/>
      </SafeAreaView>
    </>
  );
}
