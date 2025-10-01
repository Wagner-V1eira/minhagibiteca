import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { screenInfo, responsiveSize } from '../../utils/responsive';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBack?: () => void;
}

export default function Header({ 
  title, 
  showBackButton = false, 
  onBack 
}: HeaderProps) {
  const router = useRouter();

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
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
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
});