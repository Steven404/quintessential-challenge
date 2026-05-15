import React from 'react';
import { View, Text, Image } from 'react-native';
import { Character } from '../characterTypes';

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <View className="m-2 overflow-hidden rounded-xl bg-white shadow-sm dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <Image
        source={{ uri: character.image }}
        className="w-full aspect-square"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-xl font-bold text-gray-900 dark:text-white" numberOfLines={1}>
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
          <Text className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Origin
          </Text>
          <Text className="text-base text-gray-800 dark:text-gray-200" numberOfLines={1}>
            {character.origin.name}
          </Text>
        </View>
      </View>
    </View>
  );
}
