import { Text, View, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { styles } from './login.styles';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Gibiteca</Text>
      <Text style={styles.subtitle}>Tela de Login</Text>
      
      <View style={styles.buttonContainer}>
        <Link href="/cadastro" asChild> 
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Não tenho conta, quero me cadastrar</Text>
          </Pressable>
        </Link>
        
        <Link href="/home" asChild>
          <Pressable style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Entrar</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}