import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../components/ui/Header';
import { useRouter } from 'expo-router';
import { screenInfo, responsiveSize } from '../../utils/responsive';

export default function MinhasColecoes() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/tela_inicial/home');
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Minha Coleção" 
        showBackButton={true}
        onBack={handleBack}
      />
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.heroIcon}>📚</Text>
          </View>
          <Text style={styles.heroTitle}>Sua Coleção</Text>
          <Text style={styles.heroSubtitle}>
            Gerencie e organize todos os quadrinhos da sua biblioteca pessoal
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Quadrinhos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Lidos</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Não Lidos</Text>
          </View>
        </View>

        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Funcionalidades Disponíveis</Text>
          
          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📋</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Lista Completa</Text>
              <Text style={styles.featureDescription}>Visualize todos os quadrinhos salvos</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🔍</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Busca Rápida</Text>
              <Text style={styles.featureDescription}>Encontre rapidamente na sua coleção</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>🏷️</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Filtros Avançados</Text>
              <Text style={styles.featureDescription}>Organize por status, gênero ou autor</Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <Text style={styles.featureIcon}>📝</Text>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Notas Pessoais</Text>
              <Text style={styles.featureDescription}>Adicione suas impressões e avaliações</Text>
            </View>
          </View>
        </View>

        <View style={styles.comingSoonBadge}>
          <Text style={styles.comingSoonText}>🚀 Em Desenvolvimento</Text>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: responsiveSize.spacing.xl,
    paddingHorizontal: responsiveSize.spacing.xs,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: responsiveSize.spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: responsiveSize.spacing.xs,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statNumber: {
    fontSize: responsiveSize.fontSize.xlarge,
    fontWeight: 'bold',
    color: '#f26012',
    marginBottom: responsiveSize.spacing.xs,
  },
  statLabel: {
    fontSize: responsiveSize.fontSize.small,
    color: '#666',
    textAlign: 'center',
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