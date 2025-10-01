import React from "react";
import { View, Image } from "react-native";
import styles from "../../app/(usuario)/login.styles";

export default function HeaderLogin() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}
