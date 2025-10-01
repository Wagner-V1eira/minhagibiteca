import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from '../../app/(usuario)/login.styles';
import { useAuth } from '../../context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();
  const { login, loading } = useAuth();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    webClientId: 'YOUR_WEB_CLIENT_ID.apps.googleusercontent.com',
  });

  useEffect(() => {
    if (response?.type === 'success' && response.params.id_token) {
      Alert.alert('Sucesso', 'Login via Google realizado!');
    }
  }, [response]);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos!');
      return;
    }
    
    try {
      await login({ email, senha });
      router.replace('/tela_inicial/home');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    }
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
        value={senha}
        onChangeText={setSenha}
      />
      
      <TouchableOpacity 
        style={[styles.primaryButton, loading && { opacity: 0.7 }]} 
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <Text style={styles.primaryButtonText}>Entrar</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity disabled={!request} onPress={() => promptAsync()} style={styles.googleButton}>
        <Text style={styles.googleButtonText}>Entrar com Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(usuario)/cadastro')}>
        <Text style={styles.secondaryButtonText}>Não tenho conta, quero me cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
