import { wigglyConfigCard } from '@/src/utils/animationConfigs';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Character } from '../characterTypes';
import CharacterHeartPress from './characterHeartPress';

type CharacterCardProps = {
  character: Character;
  index: number;
  isInitialRender?: boolean;
};

export function CharacterCard({
  character,
  index,
  isInitialRender = false,
}: CharacterCardProps) {
  const router = useRouter();

  // const enteringAnimation = isInitialRender
  //   ? FadeIn.delay((index % 20) * 150) // added modulo 20 to compensate for useInfiniteQuery usage
  //   : FadeIn;
  // const exitingAnimation = FadeOut.duration(500).delay(index * 150); not sure if I want this after all

  const pressAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnim.value }],
  }));

  const handlePressIn = () => {
    pressAnim.value = withSpring(0.94, wigglyConfigCard);
  };

  const handlePressOut = () => {
    pressAnim.value = withSpring(1, wigglyConfigCard);
  };

  const handlePress = () => {
    router.navigate(`/character/${character.id}`);
  };

  return (
    <Animated.View
      style={animatedStyle}
      className="max-w-[48.5%] flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
      // entering={enteringAnimation}
      // exiting={exitingAnimation}
      exiting={FadeOut}
      entering={FadeIn}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
      >
        <Image
          source={{ uri: character.image }}
          className="aspect-square w-full"
          resizeMode="cover"
        />

        <CharacterHeartPress
          character={character}
          wrapperClassName="absolute right-3 top-3 rounded-full bg-white p-2 shadow-sm"
        />

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
      </Pressable>
    </Animated.View>
  );
}
