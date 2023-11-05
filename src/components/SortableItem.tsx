import { type ReactElement } from 'react';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface SortableItemProps {
  offsets: Array<{ x: Animated.SharedValue<number>; y: Animated.SharedValue<number> }>;
  index: number;
  children: ReactElement;
  width: number;
  height: number;
  activeCard: Animated.SharedValue<number>;
}

export const SortableItem = ({
  offsets,
  index,
  children,
  width,
  height,
  activeCard,
}: SortableItemProps) => {
  const currentOffset = offsets[index];

  const isGestureActive = useSharedValue(false);
  const x = useSharedValue(0);
  const y = useSharedValue(currentOffset.y.value);

  const handleGestureEvent = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      isGestureActive.value = true;
      ctx.offsetY = currentOffset.y.value;
      activeCard.value = index;
    },
    onActive: (event, ctx) => {
      x.value = event.translationX;
      y.value = event.translationY + ctx.offsetY;

      const offsetY = Math.round((y.value / height) * height);

      offsets.forEach((offset, i) => {
        if (offset.y.value === offsetY && index !== i) {
          offset.y.value = currentOffset.y.value;
          currentOffset.y.value = offsetY;
        }
      });
    },
    onEnd: () => {
      x.value = withSpring(0);
      y.value = withSpring(currentOffset.y.value, {}, () => {
        isGestureActive.value = false;
      });
    },
  });

  const translateY = useDerivedValue(() => {
    if (isGestureActive.value) {
      return y.value;
    } else {
      return withSpring(currentOffset.y.value);
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      width,
      height,
      zIndex: index === activeCard.value ? 100 : 1,
      transform: [
        { translateY: translateY.value },
        { translateX: x.value },
        { scale: withSpring(isGestureActive.value ? 1.1 : 1) },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <Animated.View style={animatedStyle}>{children}</Animated.View>
    </PanGestureHandler>
  );
};
