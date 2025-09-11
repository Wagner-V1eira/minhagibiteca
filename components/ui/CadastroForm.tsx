import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import styles from '../../app/(usuario)/cadastro/cadastro.styles';

export default function CadastroForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const auth = getAuth();

  const handleCadastro = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Sucesso', 'Usuário cadastrado com sucesso!'))
      .catch(err => Alert.alert('Erro', err.message));
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="E-mail"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Senha"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        placeholder="Confirme a senha"
        placeholderTextColor="#A0A0A0"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.primaryButton} onPress={handleCadastro}>
        <Text style={styles.primaryButtonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
