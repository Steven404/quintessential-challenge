import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { wigglyConfigCard } from '../utils/animationConfigs';

type SelectButtonProps<T extends string> = {
  title: string;
  value: T;
  onValueChange: (value: T) => void;
  options: readonly T[];
};

type SelectOptionProps<T extends string> = {
  option: T;
  isSelected: boolean;
  onValueChange: (value: T) => void;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function SelectOption<T extends string>({
  option,
  isSelected,
  onValueChange,
}: SelectOptionProps<T>) {
  const colorProgress = useSharedValue(isSelected ? 1 : 0);
  const pressAnim = useSharedValue(1);

  useEffect(() => {
    colorProgress.value = withTiming(isSelected ? 1 : 0);
  }, [isSelected]);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      colorProgress.value,
      [0, 1],
      ['white', '#3b82f6'],
    ),
    opacity: pressAnim.value ** 4,
    transform: [{ scale: pressAnim.value }],
  }));

  const handlePressIn = () => {
    pressAnim.value = withSpring(0.9, wigglyConfigCard);
  };

  const handlePressOut = () => {
    pressAnim.value = withSpring(1, wigglyConfigCard);
  };

  return (
    <AnimatedPressable
      className="flex-1 items-center border-r border-gray-200 px-1 py-3 last:border-r-0"
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={() => onValueChange(option)}
    >
      <Text
        className={`text-xs font-semibold ${
          isSelected ? 'text-white' : 'text-gray-700'
        }`}
      >
        {option}
      </Text>
    </AnimatedPressable>
  );
}

export default function SelectButton<T extends string>({
  title,
  value,
  onValueChange,
  options,
}: SelectButtonProps<T>) {
  return (
    <View>
      <Text className="mb-3 text-lg font-bold text-gray-900">{title}</Text>
      <View className="flex-row overflow-hidden rounded-xl border border-gray-200">
        {options.map((option) => (
          <SelectOption
            key={option}
            option={option}
            isSelected={option === value}
            onValueChange={onValueChange}
          />
        ))}
      </View>
    </View>
  );
}
