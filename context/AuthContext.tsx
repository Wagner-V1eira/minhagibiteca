import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { loginUsuario, logoutUsuario } from '../services/userService';

interface User {
  id: string;
  nome: string;
  email: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null; 
  loading: boolean;
  login(credentials: { email: string; senha: string }): Promise<void>;
  logout(): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      console.log('[AuthContext] Estado de autenticação mudou:', firebaseUser ? 'logado' : 'deslogado');
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            const finalUser: User = {
              id: firebaseUser.uid,
              nome: userData.nome,
              email: userData.email,
            };
            
            setUser(finalUser);
            setToken(await firebaseUser.getIdToken());
            
            console.log('[AuthContext] ✅ Usuário autenticado:', finalUser.email);
          } else {
            console.warn('[AuthContext] ⚠️ Usuário autenticado mas sem dados no Firestore');
          }
        } catch (error: any) {
          console.error('[AuthContext] ❌ Erro ao buscar dados do usuário:', error.message);
          if (error.code === 'unavailable') {
            console.warn('[AuthContext] ⚠️ Firestore offline - tentará reconectar automaticamente');
          }
        }
      } else {
        setUser(null);
        setToken(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (credentials: { email: string; senha: string }) => {
    setLoading(true);
    try {
      const usuario = await loginUsuario(credentials.email, credentials.senha);
      
      const finalUser: User = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email
      };

      setUser(finalUser);
      
      const firebaseToken = await auth.currentUser?.getIdToken();
      setToken(firebaseToken || null);

      console.log('[AuthContext] ✅ Login realizado com sucesso:', finalUser.email);
    } catch (error: any) {
      console.error('[AuthContext] ❌ Erro no login:', error.message);
      
      if (error.message.includes('network')) {
        throw new Error('Sem conexão com a internet. Verifique sua rede.');
      }
      
      throw new Error(error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await logoutUsuario();
      setUser(null);
      setToken(null);
      
      console.log('[AuthContext] Logout realizado com sucesso');
    } catch (error) {
      console.error('[AuthContext] Erro no logout:', error);
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