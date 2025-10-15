import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'bcryptjs';
import { Platform } from 'react-native';
import { executeSql, initDatabase } from './sqliteService';

if (Platform.OS !== 'web') {
  initDatabase().catch((e) => console.warn('Erro ao inicializar DB:', e));
}

export async function cadastrarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
}): Promise<{ message: string }> {
  const email = data.email.toLowerCase();

  if (Platform.OS === 'web') {
    const key = '@MinhaGibiteca:usuarios';
    const raw = await AsyncStorage.getItem(key);
  const users = raw ? JSON.parse(raw) as any[] : [];

    if (users.find((u: any) => u.email === email)) {
      throw new Error('Usuário já cadastrado');
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);
    const newUser = {
      id: Date.now().toString(),
      nome: data.nome,
      email,
      senha: senhaHash,
      criado_em: new Date().toISOString(),
    };

    users.push(newUser);
    await AsyncStorage.setItem(key, JSON.stringify(users));
    console.log('[userService] (web) cadastrarUsuario: user saved', { email: newUser.email, id: newUser.id });
    return { message: 'Usuário cadastrado com sucesso' };
  }

  const senhaHash = await bcrypt.hash(data.senha, 10);

  try {
    await executeSql(
      'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?);',
      [data.nome, email, senhaHash]
    );
    console.log('[userService] (native) cadastrarUsuario: INSERT params', { nome: data.nome, email, senhaHashLength: senhaHash?.length });
    return { message: 'Usuário cadastrado com sucesso' };
  } catch (error: any) {
    if (error && error.message && error.message.includes('UNIQUE constraint failed')) {
      throw new Error('Usuário já cadastrado');
    }
    throw new Error('Erro ao cadastrar usuário: ' + (error?.message || error));
  }
}

export async function loginUsuario(data: { email: string; senha: string; }): Promise<{ user: { id: string; nome: string; email: string }; token: string; }> {
  const email = data.email.toLowerCase();
  try {
    console.log('[userService] loginUsuario called', { platform: Platform.OS, email });
    if (Platform.OS === 'web') {
      const key = '@MinhaGibiteca:usuarios';
  const raw = await AsyncStorage.getItem(key);
  const users = raw ? JSON.parse(raw) as any[] : [];
      console.log('[userService] (web) users count', users.length);
      const usuario = users.find(u => (u.email || '').toLowerCase() === email);
      console.log('[userService] (web) usuario found', !!usuario);
      if (!usuario) throw new Error('Credenciais inválidas');
      const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
      console.log('[userService] (web) senhaCorreta', senhaCorreta);
      if (!senhaCorreta) throw new Error('Credenciais inválidas');

      const token = `local-token-${usuario.id}-${Date.now()}`;
      return {
        user: {
          id: usuario.id.toString(),
          nome: usuario.nome,
          email: usuario.email,
        },
        token,
      };
    }

    const res: any = await executeSql(
      'SELECT id, nome, email, senha FROM usuarios WHERE email = ? LIMIT 1;',
      [email]
    );
    const rows = res.rows && res.rows._array ? res.rows._array : [];
    console.log('[userService] (native) SELECT rows length', rows.length, rows);
    if (!rows || rows.length === 0) {
      console.log('[userService] (native) nenhum usuário encontrado no SQLite, verificando AsyncStorage como fallback');
      try {
        const key1 = '@MinhaGibiteca:native_users';
        const key2 = '@MinhaGibiteca:usuarios';
        const raw1 = await AsyncStorage.getItem(key1);
        const raw2 = await AsyncStorage.getItem(key2);
        const users1 = raw1 ? JSON.parse(raw1) as any[] : [];
        const users2 = raw2 ? JSON.parse(raw2) as any[] : [];
        const all = [...users1, ...users2];
        console.log('[userService] fallback users total', all.length);
        const usuario = all.find(u => (u.email || '').toLowerCase() === email);
        if (!usuario) throw new Error('Credenciais inválidas');
        const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
        console.log('[userService] fallback senhaCorreta', senhaCorreta);
        if (!senhaCorreta) throw new Error('Credenciais inválidas');

        const token = `local-token-${usuario.id}-${Date.now()}`;
        return {
          user: {
            id: usuario.id.toString(),
            nome: usuario.nome,
            email: usuario.email,
          },
          token,
        };
      } catch (e:any) {
        throw new Error(e.message || 'Credenciais inválidas');
      }
    }
    const usuario = rows[0];
    console.log('[userService] (native) usuario fetched', { id: usuario.id, email: usuario.email, senhaLength: usuario.senha?.length });
    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);
    console.log('[userService] (native) senhaCorreta', senhaCorreta);
    if (!senhaCorreta) throw new Error('Credenciais inválidas');

    const token = `local-token-${usuario.id}-${Date.now()}`;
    return {
      user: {
        id: usuario.id.toString(),
        nome: usuario.nome,
        email: usuario.email,
      },
      token,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao fazer login');
  }
}