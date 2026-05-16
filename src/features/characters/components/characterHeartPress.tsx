import { useFavoritesContext } from '@/src/hooks/favoritesContext';
import { wigglyConfigHeart } from '@/src/utils/animationConfigs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Character } from '../characterTypes';

type CharacterHeartPressProps = {
  character: Character;
  size?: number;
  wrapperClassName?: string;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function CharacterHeartPress(props: CharacterHeartPressProps) {
  const { character, size = 24, wrapperClassName } = props;
  const { favorites, addFavorite, removeFavorite } = useFavoritesContext();

  const pressAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pressAnim.value }],
    opacity: pressAnim.value ** 4,
  }));

  const isFavorite = favorites.filter((f) => f.id === character.id).length > 0;

  const handlePress = () => {
    if (isFavorite) {
      removeFavorite(character);
    } else {
      addFavorite(character);
    }
  };

  const handlePressIn = () => {
    pressAnim.value = withSpring(0.9, wigglyConfigHeart);
  };

  const handlePressOut = () => {
    pressAnim.value = withSpring(1, wigglyConfigHeart);
  };

  return (
    <AnimatedPressable
      className={wrapperClassName}
      onPress={handlePress}
      style={animatedStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {/* TODO: Use one icon (svg) instead of two and animate the fill color*/}
      {isFavorite ? (
        <FontAwesome name="heart" size={size} color="red" />
      ) : (
        <FontAwesome name="heart-o" size={size} color="black" fill="black" />
      )}
    </AnimatedPressable>
  );
}
