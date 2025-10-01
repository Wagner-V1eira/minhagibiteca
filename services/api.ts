export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000';

export async function apiFetch(endpoint: string, options: RequestInit = {}, token?: string) {
  const url = `${API_BASE_URL}${endpoint}`; 
  console.log('Fazendo requisição para:', url);
  console.log('Opções da requisição:', options);
  
  if (token) {
    options.headers = {
      ...options.headers, 
      'Authorization': `Bearer ${token}`,
    };
  }
  
  try {
    const response = await fetch(url, options);
    console.log('Status da resposta:', response.status);
    console.log('Headers da resposta:', response.headers.get('content-type'));
    
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const textResponse = await response.text();
      console.log('Resposta não é JSON:', textResponse);
      throw new Error(`Servidor retornou ${response.status}: ${response.statusText}. Verifique se a API está rodando.`);
    }
    
    const data = await response.json();
    console.log('Resposta da API:', { status: response.status, data });
    
    if (!response.ok) {
      throw new Error(data.error || data.message || `Erro ${response.status}: ${response.statusText}`);
    }
    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    if (error instanceof Error && error.message.includes('Network request failed')) {
      throw new Error('Erro de conexão. Verifique se o servidor está rodando e acessível.');
    }
    throw error;
  }
}