import { useCharactersReq } from '@/src/features/characters/api/characterRequests';
import { CharacterCard } from '@/src/features/characters/components/characterCard';
import { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';

export default function Index() {
  const { data, isLoading, error } = useCharactersReq();

  useEffect(() => {
    if (data) {
      console.log(data.info);
    }
  }, [data]);

  return (
    <View className="flex-1 items-center justify-center">
      {data?.results ? (
        <FlatList
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
