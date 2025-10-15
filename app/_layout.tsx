import { Stack } from 'expo-router';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../components/ui/ToastConfig';
import { AuthProvider } from '../context/AuthContext';


export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(usuario)" />
          <Stack.Screen name="tela_inicial" />
          <Stack.Screen name="colecao" />
        </Stack>
        <Toast config={toastConfig} />
      </AuthProvider>
    </>
  );
}