import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { initDatabase } from '../services/sqliteService';
import { clearAppStoragePrefix } from '../services/storageCleanup';
import { loginUsuario } from '../services/userService';
interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null; 
  loading: boolean;
  login(credentials: any): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData() {
      try {
        // inicializa DB primeiro
        console.log('[AuthContext] iniciando initDatabase, platform:', Platform.OS);
        await initDatabase();
        console.log('[AuthContext] initDatabase finalizado');
        // Não restaurar automaticamente o usuário ao iniciar a aplicação.
        // Isso garante que, ao abrir o site, o usuário veja a tela de login
        // e precise autenticar explicitamente (validando contra o SQLite local).
        // Se quiser habilitar "lembrar sessão", podemos implementar uma flag
        // separada e restaurar apenas quando essa opção for marcada.
      } catch (e) {
        console.warn('Erro ao carregar dados armazenados no AuthContext:', e);
      } finally {
        setLoading(false);
      }
    }

    loadStoragedData();
  }, []);

  const login = async (credentials: any) => {
    setLoading(true);
    try {
      
      const loginResponse = await loginUsuario(credentials); 
      
      const finalUser: User = {
        id: loginResponse.user.id,
        nome: loginResponse.user.nome,
        email: loginResponse.user.email
      };

      setUser(finalUser);
      setToken(loginResponse.token); 

      await AsyncStorage.setItem('@MinhaGibiteca:user', JSON.stringify(finalUser));
      await AsyncStorage.setItem('@MinhaGibiteca:token', loginResponse.token);

    } catch (error: any) {
      throw new Error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setUser(null);
      setToken(null); 
      // Limpar todas as chaves do app que começam com o prefixo
      await clearAppStoragePrefix();
    } catch (error) {
      console.error("Erro no logout:", error);
      setUser(null);
      setToken(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider');
  }
  
  return context;
}