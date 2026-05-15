import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import { CharacterCard } from '@/src/features/characters/components/characterCard';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Index() {
  const { data, isLoading, error } = useCharactersReq();

  useEffect(() => {
    if (data) {
      console.log(data.info);
    }
  }, [data]);

  return (
    <View className="flex-1 items-center justify-center">
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data?.results ? (
        <Animated.FlatList
          entering={FadeInDown.duration(500)}
          columnWrapperClassName="w-full justify-evenly"
          contentContainerClassName="gap-y-6"
          numColumns={2}
          data={data.results}
          renderItem={({ item }) => <CharacterCard character={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text>No characters found</Text>
      )}
    </View>
  );
}
