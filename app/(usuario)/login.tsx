import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import HeaderLogin from '../../components/ui/HeaderLogin';
import LoginForm from '../../components/ui/LoginForm';
import styles from './login.styles';

export default function Login() {

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
          <HeaderLogin />
          <LoginForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}