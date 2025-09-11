import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from './cadastro.styles';
import HeaderCadastro from '../../../components/ui/HeaderCadastro';
import CadastroForm from '../../../components/ui/CadastroForm';

export default function Cadastro() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <HeaderCadastro />
        <CadastroForm />
      </View>
    </KeyboardAvoidingView>
  );
}
