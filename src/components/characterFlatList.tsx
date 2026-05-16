import Animated, { FadeInDown } from 'react-native-reanimated';
import { Character } from '../features/characters/characterTypes';
import { CharacterCard } from '../features/characters/components/characterCard';

type CharacterFlatListProps = {
  characters: Character[];
};

export default function CharacterFlatList(props: CharacterFlatListProps) {
  const { characters } = props;

  return (
    <Animated.FlatList
      entering={FadeInDown.duration(500)}
      columnWrapperClassName="w-full justify-between"
      contentContainerClassName="gap-y-6"
      numColumns={2}
      data={characters}
      renderItem={({ item }) => <CharacterCard character={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
