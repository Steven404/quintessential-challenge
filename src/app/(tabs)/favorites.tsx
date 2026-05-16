import CharacterFlatList from '@/src/features/characters/components/characterFlatList';
import { useFavoritesContext } from '@/src/hooks/favoritesContext';
import { Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function Index() {
  const { favorites } = useFavoritesContext();

  if (favorites.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No favorites yet</Text>
      </View>
    );
  }

  return (
    <Animated.View layout={LinearTransition} className="flex-1">
      <CharacterFlatList characters={favorites} />
    </Animated.View>
  );
}
