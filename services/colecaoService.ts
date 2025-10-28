import AsyncStorage from '@react-native-async-storage/async-storage';

const COLECOES_KEY = '@MinhaGibiteca:colecoes';

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
  nome: string;
  criadaEm: string;
  gibis: Gibi[];
}


export async function buscarColecoes(): Promise<Colecao[]> {
  try {
    const raw = await AsyncStorage.getItem(COLECOES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (error) {
    console.error('[colecaoService] Erro ao buscar coleções:', error);
    return [];
  }
}

export async function criarColecao(nome: string): Promise<{ message: string; colecao: Colecao }> {
  try {
    if (!nome || nome.trim().length === 0) {
      throw new Error('Nome da coleção é obrigatório');
    }

    const colecoes = await buscarColecoes();
    
    if (colecoes.find(c => c.nome.toLowerCase() === nome.toLowerCase().trim())) {
      throw new Error('Já existe uma coleção com este nome');
    }

    const novaColecao: Colecao = {
      id: Date.now().toString(),
      nome: nome.trim(),
      criadaEm: new Date().toISOString(),
      gibis: []
    };

    colecoes.push(novaColecao);
    await AsyncStorage.setItem(COLECOES_KEY, JSON.stringify(colecoes));

    return {
      message: 'Coleção criada com sucesso!',
      colecao: novaColecao
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
    const colecoes = await buscarColecoes();
    const colecao = colecoes.find(c => c.id === colecaoId);

    if (!colecao) {
      throw new Error('Coleção não encontrada');
    }

    const novoGibi: Gibi = {
      ...gibi,
      id: Date.now().toString(),
      adicionadoEm: new Date().toISOString()
    };

    colecao.gibis.push(novoGibi);
    await AsyncStorage.setItem(COLECOES_KEY, JSON.stringify(colecoes));

    return {
      message: `Gibi adicionado à coleção "${colecao.nome}" com sucesso!`
    };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao adicionar gibi:', error);
    throw error;
  }
}

export async function removerColecao(colecaoId: string): Promise<{ message: string }> {
  try {
    const colecoes = await buscarColecoes();
    const novasColecoes = colecoes.filter(c => c.id !== colecaoId);
    
    await AsyncStorage.setItem(COLECOES_KEY, JSON.stringify(novasColecoes));
    
    return { message: 'Coleção removida com sucesso!' };
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
    const colecoes = await buscarColecoes();
    const colecao = colecoes.find(c => c.id === colecaoId);

    if (!colecao) {
      throw new Error('Coleção não encontrada');
    }

    colecao.gibis = colecao.gibis.filter(g => g.id !== gibiId);
    await AsyncStorage.setItem(COLECOES_KEY, JSON.stringify(colecoes));

    return {
      message: 'Gibi removido da coleção com sucesso!'
    };
  } catch (error: any) {
    console.error('[colecaoService] Erro ao remover gibi:', error);
    throw error;
  }
}
