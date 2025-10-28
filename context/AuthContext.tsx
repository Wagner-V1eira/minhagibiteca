import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
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
        console.log('[AuthContext] Carregando dados armazenados...');

        const storedUser = await AsyncStorage.getItem('@MinhaGibiteca:user');
        const storedToken = await AsyncStorage.getItem('@MinhaGibiteca:token');

        if (storedUser && storedToken) {
          const parsedUser = JSON.parse(storedUser) as User;
          console.log('[AuthContext] Sessão restaurada:', { 
            email: parsedUser.email, 
            hasToken: !!storedToken 
          });
          setUser(parsedUser);
          setToken(storedToken);
        } else {
          console.log('[AuthContext] Nenhuma sessão armazenada encontrada');
        }
      } catch (e) {
        console.warn('[AuthContext] Erro ao carregar dados armazenados:', e);
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
      
      await AsyncStorage.multiRemove([
        '@MinhaGibiteca:user',
        '@MinhaGibiteca:token'
      ]);
      
      console.log('[AuthContext] Logout realizado - sessão limpa');
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