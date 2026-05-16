import CharacterFlatList from '@/src/components/characterFlatList';
import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const { data, isLoading, isError, error } = useCharactersReq();

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

  if (!data?.results?.length) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>No characters found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <CharacterFlatList characters={data.results} isInitialRender={true} />
    </View>
  );
}
