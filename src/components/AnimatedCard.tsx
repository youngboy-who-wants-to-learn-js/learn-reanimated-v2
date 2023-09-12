import { StyleSheet } from 'react-native';
import { Card } from './Card';
import Animated, {
  useAnimatedStyle,
  type AnimatableValue,
  type SharedValue,
  interpolate,
} from 'react-native-reanimated';

interface AnimatedCardProps {
  src: string;
  index: number;
  toggled: boolean;
  transition: SharedValue<AnimatableValue>;
}

const origin = -196;

export const AnimatedCard = ({ src, index, toggled, transition }: AnimatedCardProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(transition.value, [0, 1], [0, (((index - 1) * Math.PI) / 6) * 45]);

    return {
      transform: [{ translateX: origin }, { rotate: `${rotate}deg` }, { translateX: -origin }],
    };
  });

  return (
    <Animated.View style={[styles.overlay, animatedStyles]}>
      <Card src={src} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8 * 4,
  },
});
