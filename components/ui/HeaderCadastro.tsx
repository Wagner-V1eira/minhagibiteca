import React from 'react';
import { Image, View } from 'react-native';
import styles from '../../app/(usuario)/cadastro.styles';

export default function HeaderCadastro() {
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
