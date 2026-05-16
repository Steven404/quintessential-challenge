import { ReduceMotion } from 'react-native-reanimated';

// got this straight from reanimated docs, can't really explain what each property does
export const wigglyConfigHeart = {
  duration: 200,
  dampingRatio: 0.5,
  mass: 20,
  overshootClamping: undefined,
  energyThreshold: 6e-9,
  velocity: 0,
  reduceMotion: ReduceMotion.Never,
};

export const wigglyConfigCard = {
  duration: 100,
  dampingRatio: 0.6,
  mass: 15,
  overshootClamping: undefined,
  energyThreshold: 6e-9,
  velocity: 0,
  reduceMotion: ReduceMotion.Never,
};
