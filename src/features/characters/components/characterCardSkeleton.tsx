import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function CharacterCardSkeleton() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.4, { duration: 700 }), -1, true); // -1 = times to repeat (-1 equals forever)
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={animatedStyle}
      className="dark:bg-gray-80 max-w-[48.5%] flex-1 basis-[48.5%] overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-700"
    >
      {/* Image placeholder */}
      <View className="aspect-square w-full bg-gray-200 dark:bg-gray-700" />

      {/* Heart button placeholder */}
      <View className="absolute right-3 top-3 h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700" />

      <View className="gap-y-3 p-4">
        {/* Name */}
        <View className="h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* Species • Gender */}
        <View className="flex-row items-center gap-x-2">
          <View className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
          <View className="h-4 w-1/3 rounded-md bg-gray-200 dark:bg-gray-700" />
        </View>

        {/* Origin label */}
        <View className="h-3 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* Origin value */}
        <View className="h-4 w-2/3 rounded-md bg-gray-200 dark:bg-gray-700" />
      </View>
    </Animated.View>
  );
}
