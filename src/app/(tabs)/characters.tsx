import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import CharacterFlatList from '@/src/features/characters/components/characterFlatList';
import { useRef } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const fetchNextPageTimeout = useRef<NodeJS.Timeout | null>(null);
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } =
    useCharactersReq();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-center text-lg text-red-500">
          Failed to load characters.
        </Text>
        <Text className="mt-2 text-center text-gray-500">
          {error && error.message ? error.message : 'Please try again later.'}
        </Text>
      </View>
    );
  }

  const characters = data?.pages.flatMap((page) => page.results); // page.results is an array of arrays, so we need to flatten it

  if (!characters?.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No characters found</Text>
      </View>
    );
  }

  const handleOnEndReached = () => {
    if (fetchNextPageTimeout.current) {
      return;
    }

    fetchNextPageTimeout.current = setTimeout(() => {
      fetchNextPage();
      fetchNextPageTimeout.current = null;
    }, 2000);
  };

  return (
    <View className="flex-1">
      <CharacterFlatList
        characters={characters}
        isInitialRender={true}
        onEndReached={hasNextPage ? handleOnEndReached : undefined}
      />
    </View>
  );
}
