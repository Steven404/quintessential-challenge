import { Character } from '@/src/features/characters/characterTypes';
import { CharacterCard } from '@/src/features/characters/components/characterCard';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { CharacterCardSkeleton } from './characterCardSkeleton';

type CharacterFlatListProps = {
  characters: Character[];
  isInitialRender?: boolean;
  onEndReached?: () => void;
  showSkeletons?: boolean;
};

export default function CharacterFlatList(props: CharacterFlatListProps) {
  const {
    characters,
    isInitialRender = false,
    onEndReached,
    showSkeletons = false,
  } = props;

  return (
    <View className="flex-1 px-[2.5%]">
      {showSkeletons ? (
        <Animated.View
          entering={FadeIn.delay(300).duration(500)}
          exiting={FadeOut.duration(500)}
          className="flex-row flex-wrap justify-between gap-y-6 px-[2.5%] py-[5%]"
        >
          <CharacterCardSkeleton />
          <CharacterCardSkeleton />
          <CharacterCardSkeleton />
          <CharacterCardSkeleton />
        </Animated.View>
      ) : (
        <Animated.FlatList
          renderScrollComponent={(props) => (
            <KeyboardAwareScrollView {...props} />
          )}
          showsVerticalScrollIndicator={false}
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
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            onEndReached ? (
              <View className="flex-row justify-between">
                <CharacterCardSkeleton />
                <CharacterCardSkeleton />
              </View>
            ) : undefined
          }
        />
      )}
    </View>
  );
}
