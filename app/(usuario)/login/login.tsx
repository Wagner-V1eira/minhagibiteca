import React from 'react';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import styles from '../login/login.styles';
import HeaderLogin from '../../../components/ui/HeaderLogin';
import LoginForm from '../../../components/ui/LoginForm';

export default function Login() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View>
        <HeaderLogin />
        <LoginForm />
      </View>
    </KeyboardAvoidingView>
  );
}
