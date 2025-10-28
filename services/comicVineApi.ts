import { Platform } from 'react-native';

const API_KEY = '69aa70e79bdae1f921d407c48a3bf6835d013217';
const BASE_URL = 'https://comicvine.gamespot.com/api';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

function buildUrl(endpoint: string): string {
  const url = `${BASE_URL}${endpoint}`;
  return Platform.OS === 'web' ? `${CORS_PROXY}${url}` : url;
}

export interface ComicVineIssue {
  id: number;
  name: string | null;
  volume: {
    name: string;
  };
  issue_number: string;
  image: {
    original_url: string;
    medium_url: string;
    small_url: string;
  };
  description: string | null;
  cover_date: string | null;
}

export interface BuscaGibiParams {
  nomePersonagem: string;
  titulo: string;
  numeroEdicao: string;
}

export async function buscarGibi(params: BuscaGibiParams): Promise<ComicVineIssue[]> {
  const { nomePersonagem, titulo, numeroEdicao } = params;

  if (!nomePersonagem || !titulo || !numeroEdicao) {
    throw new Error('Todos os campos são obrigatórios');
  }

  console.log('[Comic Vine API] Iniciando busca:', { nomePersonagem, titulo, numeroEdicao });
  console.log('[Comic Vine API] API Key:', API_KEY ? 'Configurada' : 'FALTANDO!');
  console.log('[Comic Vine API] Platform:', Platform.OS);

  const query = `${titulo} ${nomePersonagem} ${numeroEdicao}`.trim();
  
  const endpoint = `/search/?api_key=${API_KEY}&format=json&resources=issue&query=${encodeURIComponent(query)}&limit=200`;
  const searchUrl = buildUrl(endpoint);

  console.log('[Comic Vine API] URL de busca:', searchUrl);
  console.log('[Comic Vine API] Query:', query);

  try {
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'MinhaGibiteca/1.0',
      }
    });

    console.log('[Comic Vine API] Response status:', response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    console.log('[Comic Vine API] Response:', { 
      error: json.error, 
      statusCode: json.status_code,
      numberOfResults: json.number_of_total_results,
      limit: json.limit 
    });

    if (json.error === 'OK' && json.status_code === 1) {
      let results = json.results as ComicVineIssue[];

      console.log('[Comic Vine API] Total de resultados recebidos:', results.length);

      results = results.filter(issue => {
        if (!issue.volume || !issue.volume.name) return false;
        
        const volumeName = issue.volume.name.toLowerCase().trim();
        const tituloLower = titulo.toLowerCase().trim();
        const volumeMatch = volumeName === tituloLower || 
                           volumeName.startsWith(`${tituloLower} (`);
        
        const issueMatch = issue.issue_number === numeroEdicao;
        
        return volumeMatch && issueMatch;
      });

      console.log('[Comic Vine API] Resultados após filtro de volume e edição:', results.length);

      results.sort((a, b) => {
        const dateA = a.cover_date ? new Date(a.cover_date).getTime() : Infinity;
        const dateB = b.cover_date ? new Date(b.cover_date).getTime() : Infinity;
        return dateA - dateB;
      });

      if (results.length > 0) {
        console.log('[Comic Vine API] Edições encontradas:', 
          results.map(r => `${r.volume.name} #${r.issue_number} (${r.cover_date})`).join(', ')
        );
      }

      return results;
    } else {
      console.error('[Comic Vine API] API Error:', {
        error: json.error,
        statusCode: json.status_code
      });
      throw new Error(`API retornou erro: ${json.error} (código: ${json.status_code})`);
    }
  } catch (error) {
    console.error('[Comic Vine API] Fetch Error:', error);
    throw new Error('Erro ao buscar gibis. Verifique sua conexão e a API Key.');
  }
}

export async function searchIssues(query: string) {
  const endpoint = `/search/?api_key=${API_KEY}&format=json&resources=issue&query=${encodeURIComponent(query)}`;
  const searchUrl = buildUrl(endpoint);

  try {
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'MinhaGibiteca/1.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.error === 'OK') {
      return json.results;
    } else {
      console.error('API Error:', json.error);
      return [];
    }
  } catch (error) {
    console.error('Fetch Error:', error);
    return [];
  }
}
