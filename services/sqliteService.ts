import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

let db: any = null;
let resolveDbReady: () => void = () => {};
const dbReady = new Promise<void>((resolve) => {
  resolveDbReady = resolve;
});

if (Platform.OS !== 'web') {
  (async () => {
    const maxAttempts = 6;
    let attempt = 0;
    while ((!db || typeof db.transaction !== 'function') && attempt < maxAttempts) {
      try {
        const mod: any = await import('expo-sqlite');
        const SQLite: any = mod && (mod.openDatabase ? mod : mod.default);
        if (SQLite && typeof SQLite.openDatabase === 'function') {
          db = SQLite.openDatabase('minhagibiteca.db');
          break;
        } else if (SQLite && typeof SQLite.openDatabaseSync === 'function') {
          db = SQLite.openDatabaseSync('minhagibiteca.db');
          break;
        }
      } catch (err) {
        console.warn(`[sqlite] import attempt ${attempt + 1} failed`, err);
      }
      attempt += 1;
      await new Promise((r) => setTimeout(r, 150));
    }
    try {
      console.log('[sqlite] depois das tentativas de import - estado do db:', {
        platform: Platform.OS,
        dbType: typeof db,
        hasTransaction: !!(db && typeof db.transaction === 'function'),
        dbKeys: db && typeof db === 'object' ? Object.keys(db) : null,
      });
    } catch {
    }
    if (!db || typeof db.transaction !== 'function') {
      console.warn('[sqlite] DB nativo não disponível — ativando fallback AsyncStorage (native)');
      db = {
        transaction: (cb: any) => {
          const tx = {
            executeSql: async (sql: string, params: any[] = [], success?: any, error?: any) => {
              try {
                const key = '@MinhaGibiteca:native_users';
                if (/INSERT\s+INTO\s+usuarios/i.test(sql)) {
                  const raw = await AsyncStorage.getItem(key);
                  const users = raw ? JSON.parse(raw) as any[] : [];
                  const nome = params[0];
                  const email = params[1];
                  const senha = params[2];
                  const newUser = { id: Date.now(), nome, email, senha };
                  users.push(newUser);
                  await AsyncStorage.setItem(key, JSON.stringify(users));
                  const result = { rows: { length: 0, _array: [], item: (_i: number) => null }, insertId: newUser.id, rowsAffected: 1 };
                  success && success(tx, result);
                  return;
                }

                if (/SELECT\s+id,\s*nome,\s*email,\s*senha\s+FROM\s+usuarios/i.test(sql)) {
                  const raw = await AsyncStorage.getItem(key);
                  const users = raw ? JSON.parse(raw) as any[] : [];
                  const email = (params && params[0]) ? params[0].toLowerCase() : '';
                  const found = users.find(u => (u.email || '').toLowerCase() === (email || '').toLowerCase());
                  const rows = found ? [ { id: found.id, nome: found.nome, email: found.email, senha: found.senha } ] : [];
                  const result = { rows: { length: rows.length, _array: rows, item: (i: number) => rows[i] }, insertId: undefined, rowsAffected: rows.length };
                  success && success(tx, result);
                  return;
                }

                const result = { rows: { length: 0, _array: [], item: (_i: number) => null }, insertId: undefined, rowsAffected: 0 };
                success && success(tx, result);
              } catch (e) {
                console.error('[sqlite-fallback] erro no executeSql mock', { sql, params, e });
                error && error(tx, e);
              }
            }
          };
          cb(tx);
        }
      };
    }

    try { resolveDbReady(); } catch {}
  })();
} else {
  console.warn('expo-sqlite não disponível no Web — usando fallback mock (sem persistência).');
  db = {
    transaction: (cb: any) => {
      const tx = {
        executeSql: (sql: string, params: any[] = [], success?: any, error?: any) => {
          console.log('[sqlite mock] executeSql', sql, params);
          const result = {
            rows: {
              length: 0,
              _array: [],
              item: (_i: number) => null,
            },
            insertId: undefined,
            rowsAffected: 0,
          };
          success && success(tx, result);
        },
      };
      cb(tx);
    },
  };
  try {
    resolveDbReady();
  } catch {
  }
}

export async function executeSql<T = any>(sql: string, params: any[] = []): Promise<T> {
  await dbReady;
  if (Platform.OS !== 'web' && (!db || typeof db.transaction !== 'function')) {
    try {
      const mod: any = await import('expo-sqlite');
      const SQLite: any = mod && (mod.openDatabase ? mod : mod.default);
      if (SQLite && typeof SQLite.openDatabase === 'function') {
        db = SQLite.openDatabase('minhagibiteca.db');
      } else if (SQLite && typeof SQLite.openDatabaseSync === 'function') {
        db = SQLite.openDatabaseSync('minhagibiteca.db');
      }
    } catch (err) {
      console.warn('[sqlite] falha no import dinâmico dentro de executeSql:', err);
    }
  }

  const maxRetries = 8;
  let attempt = 0;
  while (( !db || typeof db.transaction !== 'function') && attempt < maxRetries) {
    await new Promise((r) => setTimeout(r, 100));
    attempt += 1;
  }

  return new Promise((resolve, reject) => {
    try {
      if (!db || typeof db.transaction !== 'function') {
        const err = new Error('Banco de dados não inicializado corretamente.');
        console.error('[sqlite] executeSql chamado mas DB não inicializado', { sql, params, err });
        return reject(err);
      }
      db.transaction((tx: any) => {
        tx.executeSql(
          sql,
          params,
          (_: any, result: any) => resolve(result as unknown as T),
          (_: any, error: any) => {
            console.error('[sqlite] erro executeSql', { sql, params, error });
            reject(error);
            return false;
          }
        );
      });
    } catch (err) {
      console.error('[sqlite] exceção em executeSql', { sql, params, err });
      reject(err);
    }
  });
}

export async function initDatabase() {
  await dbReady;
  if (Platform.OS !== 'web' && (!db || typeof db.transaction !== 'function')) {
    try {
      const mod: any = await import('expo-sqlite');
      const SQLite: any = mod && (mod.openDatabase ? mod : mod.default);
      if (SQLite && typeof SQLite.openDatabase === 'function') {
        db = SQLite.openDatabase('minhagibiteca.db');
      } else if (SQLite && typeof SQLite.openDatabaseSync === 'function') {
        db = SQLite.openDatabaseSync('minhagibiteca.db');
      }
    } catch (err) {
      console.warn('[sqlite] initDatabase: falha no import dinâmico:', err);
    }

    const maxRetries = 8;
    let attempt = 0;
    while (( !db || typeof db.transaction !== 'function') && attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, 100));
      attempt += 1;
    }
  }

  await executeSql(
    `CREATE TABLE IF NOT EXISTS usuarios (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      criado_em DATETIME DEFAULT (datetime('now'))
    );`
  );
}

export default db;
