import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import styles from '../../app/(usuario)/login/login.styles';
import { loginEmailSenha, loginGoogle } from '../auth/authService';
import { useRouter } from 'expo-router';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  const router = useRouter();

  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      loginGoogle(response.params.id_token).catch(err =>
        Alert.alert('Erro', err.message)
      );
    }
  }, [response]);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Atenção', 'Por favor, preencha os campos de email e senha.');
      return;
    }
    loginEmailSenha(email, password)
      .then(() => Alert.alert('Sucesso', 'Login realizado com sucesso!'))
      .catch(() =>
        Alert.alert('Erro', 'Credenciais inválidas.')
      );
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(usuario)/cadastro/cadastro')}>
        <Text style={styles.secondaryButtonText}>Não tenho conta, quero me cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
        <Text style={styles.primaryButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity disabled={!request} onPress={() => promptAsync()} style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </TouchableOpacity>
    </View>
  );
}
