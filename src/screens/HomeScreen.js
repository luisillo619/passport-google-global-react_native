import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

export default function HomeScreen() {
  const { user, handleLogout } = useAuth();
  return (
    <View>
      <Text>Soy la HomeScreen</Text>
      {user && <Button title="Cerrar sesión" onPress={() => handleLogout()} />}
    </View>
  );
}
