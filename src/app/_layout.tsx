import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../../global.css';
import { FavoritesProvider } from '../hooks/favoritesContext';

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <KeyboardProvider>
          <BottomSheetModalProvider>
            <QueryClientProvider client={queryClient}>
              <FavoritesProvider>
                <Stack>
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="character/[id]"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </FavoritesProvider>
            </QueryClientProvider>
          </BottomSheetModalProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
