import { Character } from '@/src/features/characters/characterTypes';
import { CharacterCard } from '@/src/features/characters/components/characterCard';
import { ActivityIndicator } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

type CharacterFlatListProps = {
  characters: Character[];
  isInitialRender?: boolean;
  onEndReached?: () => void;
};

export default function CharacterFlatList(props: CharacterFlatListProps) {
  const { characters, isInitialRender = false, onEndReached } = props;

  return (
    <Animated.FlatList
      showsVerticalScrollIndicator={false}
      entering={FadeInDown.duration(500)}
      columnWrapperClassName="w-full justify-between"
      contentContainerClassName="gap-y-6 py-[5%] px-[2.5%]"
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
      onEndReached={onEndReached}
      onEndReachedThreshold={1}
      ListFooterComponent={
        onEndReached ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : undefined
      }
    />
  );
}
