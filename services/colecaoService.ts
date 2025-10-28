import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where
} from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

export interface Gibi {
  id: string;
  nome: string;
  titulo: string;
  numeroEdicao: string;
  capaUrl: string;
  adicionadoEm: string;
}

export interface Colecao {
  id: string;
  userId: string;
  nome: string;
  criadaEm: string;
  gibis: Gibi[];
}

export async function buscarColecoes(): Promise<Colecao[]> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) {
      console.log('[colecaoService] Usuário não autenticado');
      return [];
    }

    const q = query(
      collection(db, 'colecoes'), 
      where('userId', '==', userId)
    );

    const querySnapshot = await getDocs(q);
    
    const colecoes = querySnapshot.docs.map(doc => doc.data() as Colecao);
    
    console.log('[colecaoService] Coleções carregadas:', colecoes.length);
    
    return colecoes;
  } catch (error: any) {
    console.error('[colecaoService] Erro ao buscar coleções:', error);
    return [];
  }
}

export async function criarColecao(nome: string): Promise<{ message: string; colecao: Colecao }> {
  try {
    const userId = auth.currentUser?.uid;
    if (!userId) throw new Error('Usuário não autenticado');

    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da coleção é obrigatório');
    }

    const colecaoId = `${userId}_${Date.now()}`;
    const colecao: Colecao = {
      id: colecaoId,
      userId,
      nome: nome.trim(),
      criadaEm: new Date().toISOString(),
      gibis: [],
    };

    await setDoc(doc(db, 'colecoes', colecaoId), colecao);

    console.log('[colecaoService] Coleção criada:', colecao.nome);

    return {
      message: 'Coleção criada com sucesso!',
      colecao
    };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao criar coleção:', error);
    throw error;
  }
}

export async function adicionarGibiNaColecao(
  colecaoId: string,
  gibi: Omit<Gibi, 'id' | 'adicionadoEm'>
): Promise<{ message: string }> {
  try {
    const colecaoRef = doc(db, 'colecoes', colecaoId);
    const colecaoDoc = await getDoc(colecaoRef);

    if (!colecaoDoc.exists()) {
      throw new Error('Coleção não encontrada');
    }

    const colecao = colecaoDoc.data() as Colecao;

    const novoGibi: Gibi = {
      ...gibi,
      id: `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      adicionadoEm: new Date().toISOString(),
    };

    colecao.gibis.push(novoGibi);

    await updateDoc(colecaoRef, {
      gibis: colecao.gibis
    });

    console.log('[colecaoService] Gibi adicionado:', novoGibi.nome);

    return { message: 'Gibi adicionado à coleção com sucesso!' };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao adicionar gibi:', error);
    throw error;
  }
}

export async function removerColecao(colecaoId: string): Promise<{ message: string }> {
  try {
    await deleteDoc(doc(db, 'colecoes', colecaoId));
    
    console.log('[colecaoService] Coleção removida:', colecaoId);
    
    return { message: 'Coleção excluída com sucesso!' };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao remover coleção:', error);
    throw error;
  }
}

export async function removerGibiDaColecao(
  colecaoId: string,
  gibiId: string
): Promise<{ message: string }> {
  try {
    const colecaoRef = doc(db, 'colecoes', colecaoId);
    const colecaoDoc = await getDoc(colecaoRef);

    if (!colecaoDoc.exists()) {
      throw new Error('Coleção não encontrada');
    }

    const colecao = colecaoDoc.data() as Colecao;
    colecao.gibis = colecao.gibis.filter(g => g.id !== gibiId);

    await updateDoc(colecaoRef, {
      gibis: colecao.gibis
    });

    console.log('[colecaoService] Gibi removido:', gibiId);

    return { message: 'Gibi removido da coleção com sucesso!' };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao remover gibi:', error);
    throw error;
  }
}
