import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_PREFIX = '@MinhaGibiteca:';

export async function clearAppStoragePrefix(): Promise<void> {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const appKeys = keys.filter(k => typeof k === 'string' && k.startsWith(APP_PREFIX));
    if (appKeys.length === 0) return;
    await AsyncStorage.multiRemove(appKeys);
  } catch (error) {
    console.warn('Erro ao limpar storage do app:', error);
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error('Falha ao limpar AsyncStorage completamente:', e);
    }
  }
}

export default clearAppStoragePrefix;
