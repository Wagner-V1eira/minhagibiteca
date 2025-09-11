import React from "react";
import { View, Text, Image } from "react-native";
import styles from "../../app/(usuario)/login/login.styles";

export default function HeaderLogin() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Minha Gibiteca</Text>
      <Text style={styles.subtitle}>Tela de Login</Text>
    </View>
  );
}
