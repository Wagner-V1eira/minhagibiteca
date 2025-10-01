import Toast from 'react-native-toast-message'; 
import { Alert } from 'react-native';

const showToast = {
  success: (message: string, title?: string, visibilityTime: number = 3000) => {
    Toast.show({
      type: 'success',
      text1: title || 'Sucesso',
      text2: message,
      position: 'top',
      visibilityTime: visibilityTime,
    });
  },
  error: (message: string, title?: string, visibilityTime: number = 4000) => {
    Toast.show({
      type: 'error',
      text1: title || 'Erro',
      text2: message,
      position: 'top',
      visibilityTime: visibilityTime,
    });
  },
  info: (message: string, title?: string, visibilityTime: number = 3000) => {
    Toast.show({
      type: 'info',
      text1: title || 'Informação',
      text2: message,
      position: 'top',
      visibilityTime: visibilityTime,
    });
  }
};

export const showAlert = {
  success: (message: string, title?: string, onOk?: () => void) => {
    Alert.alert(
      title || 'Sucesso',
      message,
      [{ text: 'OK', onPress: onOk }]
    );
  },
  error: (message: string, title?: string) => {
    Alert.alert(
      title || 'Erro',
      message,
      [{ text: 'OK' }]
    );
  },
  confirm: (message: string, onConfirm: () => void, title?: string) => {
    Alert.alert(
      title || 'Confirmação',
      message,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'OK', onPress: onConfirm }
      ]
    );
  }
};

export const notify = {
  success: (message: string, title?: string, onOk?: () => void) => {
    try {
      showToast.success(message, title);
      if (onOk) setTimeout(onOk, 1000); 
    } catch (e) {
      console.error("Erro ao mostrar toast, usando Alert (success):", e);
      showAlert.success(message, title, onOk);
    }
  },
  error: (message: string, title?: string) => {
    try {
      showToast.error(message, title);
    } catch (e) {
      console.error("Erro ao mostrar toast, usando Alert (error):", e);
      showAlert.error(message, title);
    }
  },
  info: (message: string, title?: string) => {
    try {
      showToast.info(message, title);
    } catch (e) {
      console.error("Erro ao mostrar toast, usando Alert (info):", e);
      showAlert.error(message, title); 
    }
  },
  confirm: showAlert.confirm,
};