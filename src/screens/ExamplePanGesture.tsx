import { StyleSheet, View } from 'react-native';
import { Card } from '../components/Card';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
} from 'react-native-reanimated';

export function ExamplePanGesture() {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart(event, context) {
      context.offsetX = translateX.value;
      context.offsetY = translateY.value;
    },
    onActive(event, context) {
      translateX.value = context.offsetX + event.translationX;
      translateY.value = context.offsetY + event.translationY;
    },
    onEnd(event, context) {
      translateX.value = withDecay({
        velocity: event.velocityX,
        clamp: [0, 1000],
      });
      translateY.value = withDecay({
        velocity: event.velocityY,
        clamp: [0, 1000],
      });
    },
  });

  const animationStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    };
  });

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={handleGestureEvent}>
        <Animated.View style={animationStyles}>
          <Card />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    padding: 16,
  },
});
