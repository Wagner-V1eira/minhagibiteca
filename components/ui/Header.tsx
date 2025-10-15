import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { responsiveSize, screenInfo } from '../../utils/responsive';
import { notify } from './notifyService';
import cadastroStyles from '../../app/(usuario)/cadastro.styles';
import loginStyles from '../../app/(usuario)/login.styles';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

function DefaultBack({ onBack }: { onBack?: () => void }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => (onBack ? onBack() : router.back())}
      activeOpacity={0.7}
    >
      <Feather
        name="arrow-left"
        size={responsiveSize.fontSize.large}
        color="#fff"
      />
      <Text style={styles.backText}>Voltar</Text>
    </TouchableOpacity>
  );
}

export function Header({ title, showBackButton = false, onBack }: HeaderProps) {
  return (
    <View style={styles.headerStart}>
      <View style={styles.leftSection}>
        {showBackButton && <DefaultBack onBack={onBack} />}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </View>
  );
}

export function HeaderWithLogout({ title, showBackButton = false, onBack }: HeaderProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    AlertLogout();
  };

  async function AlertLogout() {
    const { Alert } = await import('react-native');
    Alert.alert(
      'Sair',
      'Tem certeza que deseja fazer logout?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/');
              notify.success('Logout realizado com sucesso!', 'Até logo');
            } catch (error) {
              console.error('HeaderLogout: Erro no logout:', error);
              notify.error('Erro ao fazer logout', 'Tente novamente');
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.headerBetween}>
      <View style={styles.leftSection}>
        {showBackButton && <DefaultBack onBack={onBack} />}
        {title && <Text style={styles.title}>{title}</Text>}
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

export function LogoHeader({ variant = 'login' }: { variant?: 'login' | 'cadastro' }) {
  const stylesModule = variant === 'login' ? loginStyles : cadastroStyles;
  return (
    <View style={stylesModule.headerContainer}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={stylesModule.logo}
        resizeMode="contain"
      />
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  headerStart: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: responsiveSize.padding.screen,
    paddingTop: screenInfo.isSmallScreen ? 40 : 50,
    paddingBottom: responsiveSize.spacing.md,
    backgroundColor: 'transparent',
  },
  headerBetween: {
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