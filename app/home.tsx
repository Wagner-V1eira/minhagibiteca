import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';
import { styles } from './home.styles';

export default function HomeScreen() {
  const minhasColecoes = []; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeTitle}>Bem-vindo, Wagner!</Text>
        <Text style={styles.welcomeSubtitle}>O que vamos organizar hoje?</Text>
      </View>

      <View style={styles.actionCard}>
        <Text style={styles.cardTitle}>Adicionar Novo Gibi</Text>
        <Text style={styles.cardText}>
          Busque na base de dados online e adicione um novo item à sua coleção.
        </Text>
        <Link href="/busca" asChild>
          <Button title="Buscar e Adicionar" />
        </Link>
      </View>

      <View style={styles.collectionsContainer}>
        <Text style={styles.cardTitle}>Minhas Coleções</Text>
        {minhasColecoes.length === 0 ? (
          <View style={styles.collectionsPlaceholder}>
            <Text>Você ainda não tem nenhum gibi cadastrado.</Text>
          </View>
        ) : (
          <Text>Aqui aparecerá a lista de gibis...</Text>
        )}
      </View>
      
      <Link href="/login" style={styles.logoutLink}>Sair (Logout)</Link>
    </View>
  );
}