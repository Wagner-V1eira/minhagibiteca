import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { notify } from './notifyService';
import { screenInfo, responsiveSize } from '../../utils/responsive';
import { useAuth } from '../../context/AuthContext';

interface HeaderWithLogoutProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function HeaderWithLogout({ 
  title, 
  showBackButton = false, 
  onBack 
}: HeaderWithLogoutProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    console.log('HeaderLogout: Botão de logout pressionado!');
    Alert.alert(
      'Sair',
      'Tem certeza que deseja fazer logout?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              console.log('HeaderLogout: Iniciando processo de logout...');
              await logout();
              console.log('HeaderLogout: Logout concluído, deixando o index.tsx fazer o redirecionamento...');
              
              router.replace('/');
        
              notify.success('Logout realizado com sucesso!', 'Até logo');
            } catch (error) {
              console.error('HeaderLogout: Erro no logout:', error);
              notify.error('Erro ao fazer logout', 'Tente novamente');
            }
          }
        }
      ]
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.leftSection}>
        {showBackButton && (
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Feather 
              name="arrow-left" 
              size={responsiveSize.fontSize.large} 
              color="#fff" 
            />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>
        )}
        {title && (
          <Text style={styles.title}>{title}</Text>
        )}
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
        activeOpacity={0.8}
      >
        <Text style={styles.logoutIcon}>🚪</Text>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveSize.padding.screen,
    paddingTop: screenInfo.isSmallScreen ? 40 : 50,
    paddingBottom: responsiveSize.spacing.md,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f26012',
    paddingHorizontal: screenInfo.isSmallScreen 
      ? responsiveSize.spacing.sm 
      : responsiveSize.spacing.md,
    paddingVertical: screenInfo.isSmallScreen 
      ? responsiveSize.spacing.xs 
      : responsiveSize.spacing.sm,
    borderRadius: 10,
    marginRight: responsiveSize.spacing.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  backIcon: {
    color: '#fff',
    fontSize: responsiveSize.fontSize.large,
    fontWeight: 'bold',
  },
  backText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize.fontSize.medium,
    marginLeft: responsiveSize.spacing.xs,
  },
  title: {
    fontSize: responsiveSize.fontSize.xlarge,
    fontWeight: 'bold',
    color: '#2c2c2c',
    flex: 1,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingHorizontal: screenInfo.isSmallScreen 
      ? responsiveSize.spacing.md 
      : responsiveSize.spacing.lg,
    paddingVertical: screenInfo.isSmallScreen 
      ? responsiveSize.spacing.sm 
      : responsiveSize.spacing.md,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: responsiveSize.fontSize.medium,
    marginLeft: responsiveSize.spacing.xs,
  },
  logoutIcon: {
    color: '#fff',
    fontSize: responsiveSize.fontSize.large,
  },
});