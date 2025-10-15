import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/ui/Header';
import { useRouter } from 'expo-router';
import { screenInfo, responsiveSize } from '../../utils/responsive';

export default function CadastrarColecao() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/tela_inicial/home');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Adicionar à Coleção" 
        showBackButton={true}
        onBack={handleBack}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.heroIcon}>🔍</Text>
          </View>
          <Text style={styles.heroTitle}>Buscar Quadrinhos</Text>
          <Text style={styles.heroSubtitle}>
            Encontre e adicione quadrinhos incríveis à sua coleção pessoal
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Funcionalidades em Desenvolvimento</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📚</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Busca Inteligente</Text>
              <Text style={styles.featureDescription}>Busque quadrinhos por título, autor ou série</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🖼️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Visualização Completa</Text>
              <Text style={styles.featureDescription}>Veja capas, sinopses e detalhes completos</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>💾</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Coleção Pessoal</Text>
              <Text style={styles.featureDescription}>Adicione à sua biblioteca digital</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>✅</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Status de Leitura</Text>
              <Text style={styles.featureDescription}>Marque como lido ou na lista de desejos</Text>
            </View>
          </View>
        </View>

        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>🚀 Em Breve</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdc556ff',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: responsiveSize.padding.screen,
    paddingTop: responsiveSize.spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: responsiveSize.spacing.xl,
    paddingHorizontal: responsiveSize.spacing.md,
  },
  iconContainer: {
    width: 80,
    height: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveSize.spacing.md,
  },
  heroIcon: {
    fontSize: responsiveSize.fontSize.title,
  },
  heroTitle: {
    fontSize: responsiveSize.fontSize.xxlarge,
    fontWeight: 'bold',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: responsiveSize.spacing.sm,
  },
  heroSubtitle: {
    fontSize: responsiveSize.fontSize.medium,
    color: '#4a4a4a',
    textAlign: 'center',
    lineHeight: screenInfo.isMobileDevice ? 22 : 24,
    maxWidth: responsiveSize.width.container * 0.8,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: responsiveSize.spacing.xl,
  },
  featuresTitle: {
    fontSize: responsiveSize.fontSize.large,
    fontWeight: '700',
    color: '#2c2c2c',
    textAlign: 'center',
    marginBottom: responsiveSize.spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: responsiveSize.spacing.lg,
    borderRadius: 12,
    marginBottom: responsiveSize.spacing.md,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    fontSize: responsiveSize.fontSize.xlarge,
    marginRight: responsiveSize.spacing.md,
    width: 40,
    textAlign: 'center',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: '700',
    color: '#2c2c2c',
    marginBottom: responsiveSize.spacing.xs,
  },
  featureDescription: {
    fontSize: responsiveSize.fontSize.small,
    color: '#666',
    lineHeight: screenInfo.isMobileDevice ? 18 : 20,
  },
  comingSoonBadge: {
    backgroundColor: '#f26012',
    paddingHorizontal: responsiveSize.spacing.lg,
    paddingVertical: responsiveSize.spacing.md,
    borderRadius: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  comingSoonText: {
    fontSize: responsiveSize.fontSize.medium,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
  },
});