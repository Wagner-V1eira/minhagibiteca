import { apiFetch } from './api';

export async function cadastrarUsuario(data: {
  nome: string;
  email: string;
  senha: string;
}): Promise<{ message: string }> {
  
  const json = await apiFetch('/users/register', { 
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return json;
}

export async function loginUsuario(data: { email: string; senha: string; }): Promise<{ user: { id: string; nome: string; email: string }; token: string; }> {
  console.log('userService: Fazendo login com:', { email: data.email });

  const json = await apiFetch('/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  
  console.log('userService: Resposta completa da API:', JSON.stringify(json, null, 2));
  
  if (json.user && json.token) {
    return {
      user: {
        id: json.user.id.toString(),
        nome: json.user.nome,
        email: json.user.email,
      },
      token: json.token,
    };
  }
  
  throw new Error('Resposta da API em formato inesperado');
}