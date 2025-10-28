import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

const USERS_KEY = '@MinhaGibiteca:usuarios';

export async function cadastrarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
}): Promise<{ message: string }> {
  const email = data.email.toLowerCase();

  if (!data.senha || typeof data.senha !== 'string' || data.senha.length < 1) {
    throw new Error('Senha inválida');
  }

  const senhaLimpa = String(data.senha).trim();
  
  if (!senhaLimpa || senhaLimpa.length < 1) {
    throw new Error('Senha não pode ser vazia');
  }

  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) as any[] : [];

    if (users.find((u: any) => (u.email || '').toLowerCase() === email)) {
      throw new Error('Usuário já cadastrado');
    }

    const senhaHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      senhaLimpa
    );
    
    const newUser = {
      id: Date.now().toString(),
      nome: data.nome,
      email,
      senha: senhaHash,
      criado_em: new Date().toISOString(),
    };

    users.push(newUser);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    console.log('[userService] cadastrarUsuario: sucesso', { 
      email: newUser.email, 
      id: newUser.id, 
      senhaHashLength: senhaHash.length 
    });
    
    return { message: 'Usuário cadastrado com sucesso' };
  } catch (error: any) {
    console.error('[userService] cadastrarUsuario: erro', error);
    throw error;
  }
}

export async function loginUsuario(data: { 
  email: string; 
  senha: string; 
}): Promise<{ 
  user: { id: string; nome: string; email: string }; 
  token: string; 
}> {
  const email = data.email.toLowerCase();
  
  try {
    console.log('[userService] loginUsuario: início', { email });
    
    const raw = await AsyncStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) as any[] : [];
    
    console.log('[userService] loginUsuario: usuários encontrados', users.length);
    
    const usuario = users.find(u => (u.email || '').toLowerCase() === email);
    
    if (!usuario) {
      console.log('[userService] loginUsuario: usuário não encontrado');
      throw new Error('Credenciais inválidas');
    }
    
    if (!usuario.senha || typeof usuario.senha !== 'string') {
      console.error('[userService] loginUsuario: senha corrompida', { 
        hasPassword: !!usuario.senha, 
        type: typeof usuario.senha 
      });
      throw new Error('Dados de usuário corrompidos. Tente cadastrar novamente.');
    }
    
    const senhaHashFornecida = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      data.senha
    );
    
    const senhaCorreta = senhaHashFornecida === usuario.senha;
    console.log('[userService] loginUsuario: senha verificada', senhaCorreta);
    
    if (!senhaCorreta) {
      throw new Error('Credenciais inválidas');
    }

    const token = `local-token-${usuario.id}-${Date.now()}`;
    
    console.log('[userService] loginUsuario: sucesso', { 
      id: usuario.id, 
      email: usuario.email 
    });
    
    return {
      user: {
        id: usuario.id.toString(),
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    };
  } catch (error: any) {
    console.error('[userService] loginUsuario: erro', error.message);
    throw new Error(error.message || 'Erro ao fazer login');
  }
}