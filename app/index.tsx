import { Redirect } from 'expo-router';
import React from 'react';

// Sempre levar o usuário para a tela de login ao abrir o app.
// O AuthContext continuará disponível na tela de login para validar credenciais
// contra o banco SQLite local.
export default function StartPage() {
  return <Redirect href="/(usuario)/login" />;
}
