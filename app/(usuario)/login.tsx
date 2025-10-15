import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { LogoHeader } from '../../components/ui/Header';
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
          <LogoHeader variant="login" />
          <LoginForm />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}