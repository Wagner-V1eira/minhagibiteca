import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  criadoEm: string;
}

export async function cadastrarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
}): Promise<{ message: string; usuario: Usuario }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth, 
      data.email, 
      data.senha
    );

    const userId = userCredential.user.uid;

    const usuario: Usuario = {
      id: userId,
      nome: data.nome,
      email: data.email,
      criadoEm: new Date().toISOString(),
    };

    await setDoc(doc(db, 'users', userId), usuario);

    console.log('[userService] Cadastro realizado com sucesso:', usuario.email);

    return {
      message: 'Usuário cadastrado com sucesso!',
      usuario
    };
  } catch (error: any) {
    console.error('[userService] Erro ao cadastrar:', error);
    
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('Este e-mail já está cadastrado');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('E-mail inválido');
    }
    throw new Error('Erro ao cadastrar usuário');
  }
}

export async function loginUsuario(
  email: string, 
  senha: string
): Promise<Usuario> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const userId = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, 'users', userId));
    
    if (!userDoc.exists()) {
      throw new Error('Usuário não encontrado');
    }

    console.log('[userService] Login realizado com sucesso:', email);

    return userDoc.data() as Usuario;
  } catch (error: any) {
    console.error('[userService] Erro ao fazer login:', error);
    
    if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      throw new Error('E-mail ou senha incorretos');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Senha incorreta');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('E-mail inválido');
    }
    throw new Error('Erro ao fazer login');
  }
}

export async function logoutUsuario(): Promise<void> {
  await signOut(auth);
  console.log('[userService] Logout realizado');
}