
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { notify } from '../../components/ui/notifyService';
import styles from './home.styles';

export default function Home() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  const nomeUsuario = user?.nome || 'Usuário';

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja fazer logout?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          onPress: async () => {
            try {
              await logout();
              router.replace('/(usuario)/login');
              notify.success('Logout realizado com sucesso!');
            } catch {
              notify.error('Erro ao fazer logout');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.7}
        >
          <Feather name="log-out" style={styles.logoutIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.welcomeText}>Bem vindo, {nomeUsuario}!</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => router.push('/colecao/cadastrar')}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Cadastrar Coleção</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/colecao/minhasColecoes')}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>Minhas Coleções</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}