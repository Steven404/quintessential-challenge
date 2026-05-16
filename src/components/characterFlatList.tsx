import Animated, { FadeInDown } from 'react-native-reanimated';
import { Character } from '../features/characters/characterTypes';
import { CharacterCard } from '../features/characters/components/characterCard';

type CharacterFlatListProps = {
  characters: Character[];
  isInitialRender?: boolean;
};

export default function CharacterFlatList(props: CharacterFlatListProps) {
  const { characters, isInitialRender = false } = props;

  return (
    <Animated.FlatList
      entering={FadeInDown.duration(500)}
      columnWrapperClassName="w-full justify-between"
      contentContainerClassName="gap-y-6 py-[5%]"
      numColumns={2}
      data={characters}
      renderItem={({ item, index }) => (
        <CharacterCard
          character={item}
          index={index}
          isInitialRender={isInitialRender}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
