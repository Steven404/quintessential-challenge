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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

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
        {options.map((option) => {
          const isSelected = option === value;

          const colorProgress = useSharedValue(0);
          const pressAnim = useSharedValue(1);

          colorProgress.value = withTiming(isSelected ? 1 : 0);
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
              key={option}
              className={`flex-1 items-center border-r border-gray-200 px-1 py-3 last:border-r-0 ${
                isSelected ? 'bg-blue-500' : 'bg-white'
              }`}
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
        })}
      </View>
    </View>
  );
}
