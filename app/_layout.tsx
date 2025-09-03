import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(usuario)" options={{ headerShown: false }} />
      <Stack.Screen name="home" />
      <Stack.Screen name="busca" options={{ title: 'Adicionar Gibi' }} />
    </Stack>
  );
}