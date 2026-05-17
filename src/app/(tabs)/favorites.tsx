import CharacterFlatList from '@/src/features/characters/components/characterFlatList';
import { useFavoritesContext } from '@/src/hooks/favoritesContext';
import { Text } from 'react-native';
import Animated, { FadeIn, LinearTransition } from 'react-native-reanimated';

export default function Index() {
  const { favorites } = useFavoritesContext();

  return (
    <Animated.View layout={LinearTransition} className="flex-1">
      {favorites.length ? (
        <CharacterFlatList characters={favorites} />
      ) : (
        <Animated.View
          entering={FadeIn.duration(500)}
          className="flex-1 items-center justify-center"
        >
          <Text>No favorites yet</Text>
        </Animated.View>
      )}
    </Animated.View>
  );
}
