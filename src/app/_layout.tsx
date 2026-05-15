import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';
import { FavoritesProvider } from '../hooks/favoritesContext';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <FavoritesProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="character/[id]"
              options={{ headerShown: false }}
            />
          </Stack>
        </FavoritesProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
