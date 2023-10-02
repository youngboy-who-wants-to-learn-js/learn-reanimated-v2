import Animated, {
  useAnimatedStyle,
  interpolate,
  type SharedValue,
  Extrapolate,
} from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

interface BubbleProps {
  index: number;
  delta: number;
  progress: SharedValue<number | null>;
}

export const Bubble = ({ index, delta, progress }: BubbleProps) => {
  const aStyles = useAnimatedStyle(() => {
    const start = index * delta;
    const end = start + delta;

    const opacity = interpolate(progress.value, [start, end], [0.5, 1], Extrapolate.CLAMP);

    const scale = interpolate(progress.value, [start, end], [1, 1.5], Extrapolate.CLAMP);
    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return <Animated.View style={[styles.bubble, aStyles]} />;
};

const size = 32;

const styles = StyleSheet.create({
  bubble: {
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: '#3884ff',
  },
});
