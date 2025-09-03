import React, { useState } from 'react';
import { Text, TextInput, Pressable, ScrollView, Alert } from 'react-native'; 
import { Link, router } from 'expo-router'; 
import { styles } from './cadastro.styles';

export default function CadastroScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return; 
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(senha)) {
      Alert.alert('Senha Inválida', 'A senha não atende aos critérios de segurança. Por favor, verifique as regras abaixo do formulário.');
      return;
    }

    console.log('Dados do Cadastro (Válidos):');
    console.log('Nome:', nome);
    console.log('Email:', email);

    Alert.alert(
      'Sucesso!',
      'Sua conta foi criada com sucesso. Você será redirecionado para a tela de Login.',
      [
        { text: 'OK', onPress: () => router.push('/login') } 
      ]
    );
    
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Crie sua Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />
      
      <Text style={styles.passwordRules}>
        A senha deve ter no mínimo 8 caracteres, com uma maiúscula, uma minúscula, um número e um caractere especial.
      </Text>

      <Pressable style={styles.button} onPress={handleCadastro}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </Pressable>

      <Link href="/login" style={styles.loginLink}>
        Já tem uma conta? Faça Login
      </Link>
    </ScrollView>
  );
}