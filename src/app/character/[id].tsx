import { useCharacterReq } from '@/src/features/characters/api/characterRequests';
import { useFavoritesContext } from '@/src/hooks/favoritesContext';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CharacterScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addFavorite, removeFavorite, favorites } = useFavoritesContext();

  const { data: character, isLoading, error } = useCharacterReq(id as string);

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1">
        <Animated.View
          exiting={FadeOut}
          className="flex-1  items-center justify-center bg-white dark:bg-gray-900"
        >
          <ActivityIndicator size="large" color="#3b82f6" />
        </Animated.View>
      </SafeAreaView>
    );
  }

  if (error || !character) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <Text className="text-lg text-red-500">Failed to load character.</Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-4 rounded-lg bg-blue-500 px-4 py-2"
        >
          <Text className="font-medium text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isFavorite = favorites.some((f) => f.id === character.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  };

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
      <ScrollView className="flex-1" bounces={false}>
        <View className="relative">
          <Animated.Image
            source={{ uri: character.image }}
            className="h-96 w-full"
            resizeMode="cover"
          />

          <TouchableOpacity
            className="absolute left-4 top-4 rounded-full bg-black/50 p-2"
            onPress={router.back}
          >
            <Feather name="chevron-left" size={28} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            className="absolute bottom-[-28px] right-6 rounded-full bg-white p-4 shadow-lg dark:bg-gray-800"
            onPress={handleFavorite}
          >
            {isFavorite ? (
              <FontAwesome name="heart" size={28} color="red" />
            ) : (
              <FontAwesome name="heart-o" size={28} color="black" />
            )}
          </TouchableOpacity>
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
      </ScrollView>
    </SafeAreaView>
  );
}
