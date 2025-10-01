import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function StartPage() {
  const router = useRouter();
  const { loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace('/(usuario)/login');
    }
  }, [loading, router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fdc556ff' }}>
      <ActivityIndicator size="large" color="#F75C03" />
      <Text style={{ marginTop: 20, fontSize: 16, color: '#333' }}>Verificando autenticação...</Text>
    </View>
  );
}
