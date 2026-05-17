import { Pressable, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { wigglyConfigCard } from '../utils/animationConfigs';

type SimpleButtonProps = {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'cancel';
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SimpleButton({
  title,
  onPress,
  type = 'primary',
}: SimpleButtonProps) {
  const pressAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnim.value }],
    opacity: pressAnim.value ** 4,
  }));

  const handlePressIn = () => {
    pressAnim.value = withSpring(0.94, wigglyConfigCard);
  };

  const handlePressOut = () => {
    pressAnim.value = withSpring(1, wigglyConfigCard);
  };

  return (
    <AnimatedPressable
      className={`w-full items-center rounded-xl py-4 ${
        type === 'cancel' ? 'bg-red-500' : 'bg-blue-500'
      }`}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
    >
      <Text className="font-bold text-white">{title}</Text>
    </AnimatedPressable>
  );
}
