import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

export function CharacterPageSkeleton() {
  const opacity = useSharedValue(1);

  const router = useRouter();

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0.4, { duration: 700 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View exiting={FadeOut} className="flex-1">
      {/* Image placeholder */}
      <Animated.View style={animatedStyle} className="relative">
        <View className="aspect-square h-auto w-full bg-gray-200 dark:bg-gray-700" />
      </Animated.View>

      <Animated.View style={animatedStyle} className="gap-y-4 px-6 pb-12 pt-10">
        {/* Name */}
        <View className="h-10 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />

        {/* Status • Species */}
        <View className="mt-1 flex-row items-center gap-x-2">
          <View className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-700" />
          <View className="h-5 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
        </View>

        {/* Info rows */}
        <View className="mt-4 flex-col gap-6">
          {['Gender', 'Origin', 'Last Known Location', 'Episodes'].map(
            (_, i) => (
              <View key={i}>
                <View className="h-3 w-1/4 rounded-md bg-gray-200 dark:bg-gray-700" />
                <View className="mt-2 h-5 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700" />
              </View>
            ),
          )}
        </View>
      </Animated.View>
    </Animated.View>
  );
}
