import React from 'react';
import { KeyboardAvoidingView, Platform, View, Image, ScrollView } from 'react-native';
import styles from './cadastro.styles';
import CadastroForm from '../../components/ui/CadastroForm';

export default function Cadastro() {
  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentWrapper}>
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
          <CadastroForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
