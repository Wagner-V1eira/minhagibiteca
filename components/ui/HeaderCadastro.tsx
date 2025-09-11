import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../../app/(usuario)/cadastro/cadastro.styles';

export default function HeaderCadastro() {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Minha Gibiteca</Text>
      <Text style={styles.subtitle}>Tela de Cadastro</Text>
    </View>
  );
}
