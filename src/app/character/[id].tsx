import ErrorView from '@/src/components/errorView';
import { useCharacterReq } from '@/src/features/characters/api/characterRequests';
import CharacterHeartPress from '@/src/features/characters/components/characterHeartPress';
import { CharacterPageSkeleton } from '@/src/features/characters/components/characterPageSkeleton';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function CharacterScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const {
    data: character,
    isLoading,
    isFetching,
    isError,
    error,
  } = useCharacterReq(id as string);

  const loading = isLoading || isFetching;

  if (isError) {
    return (
      <ErrorView
        title="Failed to load character."
        message={error?.message || 'Please try again later.'}
        button={{ title: 'Go Back', onPress: () => router.back() }}
      />
    );
  }

  if (!character && !loading) {
    return <ErrorView message="Character not found" />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return 'bg-green-500';
      case 'Dead':
        return 'bg-red-500';
      default: // unknown
        return 'bg-gray-500';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <TouchableOpacity
        className={`absolute left-4  top-20 z-10 rounded-full bg-black/50 p-2`}
        onPress={router.back}
      >
        <Feather name="chevron-left" size={28} color="white" />
      </TouchableOpacity>
      {loading ? (
        <CharacterPageSkeleton />
      ) : (
        character && (
          <Animated.ScrollView
            className="flex-1"
            bounces={false}
            entering={FadeIn.duration(500)}
          >
            <View className="relative">
              <Image
                source={{ uri: character.image }}
                className="aspect-square h-auto w-full"
                resizeMode="cover"
              />

              <CharacterHeartPress
                character={character}
                wrapperClassName="absolute bottom-[-28px] right-6 rounded-full bg-white p-4 shadow-lg dark:bg-gray-800"
                size={28}
              />
            </View>

            <View className="px-6 pb-12 pt-10">
              <Text className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {character.name}
              </Text>

              <View className="mt-3 flex-row items-center">
                <View
                  className={`h-3.5 w-3.5 rounded-full ${getStatusColor(character.status)}`}
                />
                <Text className="ml-2 text-xl font-medium text-gray-700 dark:text-gray-300">
                  {character.status} • {character.species}
                </Text>
              </View>

              <View className="mt-8 flex-col gap-6">
                <View>
                  <Text className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Gender
                  </Text>
                  <Text className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                    {character.gender}
                  </Text>
                </View>

                {character.type ? (
                  <View>
                    <Text className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Type
                    </Text>
                    <Text className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                      {character.type}
                    </Text>
                  </View>
                ) : null}

                <View>
                  <Text className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Origin
                  </Text>
                  <Text className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                    {character.origin.name}
                  </Text>
                </View>

                <View>
                  <Text className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Last Known Location
                  </Text>
                  <Text className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                    {character.location.name}
                  </Text>
                </View>

                <View>
                  <Text className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                    Episodes
                  </Text>
                  <Text className="mt-1 text-lg text-gray-900 dark:text-gray-100">
                    Featured in {character.episode.length} episode
                    {character.episode.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
        )
      )}
    </SafeAreaView>
  );
}
