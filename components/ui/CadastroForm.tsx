import { Link, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, ActivityIndicator } from 'react-native'; 
import styles from '../../app/(usuario)/cadastro.styles';
import { cadastrarUsuario } from '../../services/userService';
import { notify } from './notifyService';

export default function CadastroForm() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      notify.error('Preencha todos os campos.', 'Atenção');
      return;
    }
    if (senha !== confirmarSenha) {
      notify.error('As senhas não conferem.', 'Erro');
      return;
    }

    setLoading(true); 

    try {
      const response = await cadastrarUsuario({ nome, email, senha });
      
      notify.success(
        response.message,
        'Cadastro Realizado',
        () => {
          setNome('');
          setEmail('');
          setSenha('');
          setConfirmarSenha('');
          router.push('/(usuario)/login');
        }
      );
    } catch (error: any) {
      notify.error(error.message || 'Erro desconhecido ao cadastrar usuário', 'Erro no Cadastro');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nome"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        editable={!loading}
      />
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        editable={!loading}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
        editable={!loading}
      />
      <TextInput
        placeholder="Confirmar Senha"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        editable={!loading}
      />
      
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#F75C03" style={{ height: 60 }} />
        ) : (
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={handleCadastro}
          >
            <Text style={styles.primaryButtonText}>Cadastrar</Text>
          </TouchableOpacity>
        )}

        <Link href="/(usuario)/login" asChild>
          <TouchableOpacity style={styles.secondaryButton} disabled={loading}>
            <Text style={styles.secondaryButtonText}>Já possui uma conta? Faça login</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}