import { useFavoritesContext } from '@/src/hooks/favoritesContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Character } from '../characterTypes';

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const { addFavorite, removeFavorite, favorites } = useFavoritesContext();
  const router = useRouter();

  const isFavorite = favorites.some((f) => f.id === character.id);

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  };

  return (
    <TouchableOpacity
      className="m-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      onPress={() => router.push(`/character/${character.id}`)}
    >
      <Image
        source={{ uri: character.image }}
        className="aspect-square w-full"
        resizeMode="cover"
      />

      <TouchableOpacity
        className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm"
        onPress={handleFavorite}
      >
        {isFavorite ? (
          <FontAwesome name="heart" size={24} color="red" />
        ) : (
          <FontAwesome name="heart-o" size={24} color="black" />
        )}
      </TouchableOpacity>

      <View className="p-4">
        <Text
          className="text-xl font-bold text-gray-900 dark:text-white"
          numberOfLines={1}
        >
          {character.name}
        </Text>

        <View className="mt-1 flex-row items-center">
          <Text className="text-base text-gray-600 dark:text-gray-300">
            {character.species}
          </Text>
          <Text className="mx-2 text-base text-gray-400">•</Text>
          <Text className="text-base text-gray-600 dark:text-gray-300">
            {character.gender}
          </Text>
        </View>

        <View className="mt-2">
          <Text className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Origin
          </Text>
          <Text
            className="text-base text-gray-800 dark:text-gray-200"
            numberOfLines={1}
          >
            {character.origin.name}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
