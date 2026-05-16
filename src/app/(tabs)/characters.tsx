import CharacterFlatList from '@/src/components/characterFlatList';
import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const { data, isLoading, error } = useCharactersReq();

  useEffect(() => {
    if (data) {
      console.log(data.info);
    }
  }, [data]);

  return (
    <View className="flex-1">
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data?.results ? (
        <CharacterFlatList characters={data.results} />
      ) : (
        <Text>No characters found</Text>
      )}
    </View>
  );
}
