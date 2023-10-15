import {
  PanGestureHandler,
  type PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Image } from 'expo-image';
import { StyleSheet, Dimensions, View, Text } from 'react-native';
import { snapPoint } from 'react-native-redash';
import { type Ref, forwardRef, useImperativeHandle } from 'react';

interface Offset {
  x: number;
  y: number;
}

interface SwiperProps {
  onTop: boolean;
  onSwipe: () => void;
  src: string;
  scale: Animated.SharedValue<number>;
}

export interface SwiperActions {
  swipeLeft: () => void;
  swipeRight: () => void;
}

const { width, height } = Dimensions.get('window');

const a = Math.PI / 12;
const A = Math.sin(a) * height + Math.cos(a) * width;

const snapPoints = [-A, 0, A];

const swipe = (
  translateX: Animated.SharedValue<number>,
  dest: number,
  velocity: number,
  onSwipe: () => void
) => {
  'worklet';

  translateX.value = withSpring(
    dest,
    { velocity, restSpeedThreshold: dest === 0 ? 0.01 : 100 },
    () => {
      if (dest !== 0) {
        runOnJS(onSwipe)();
      }
    }
  );
};

const Swiper = ({ onTop, onSwipe, src, scale }: SwiperProps, ref: Ref<SwiperActions>) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useImperativeHandle(ref, () => ({
    swipeLeft: () => {
      swipe(translateX, -A, 25, onSwipe);
    },
    swipeRight: () => {
      swipe(translateX, A, 25, onSwipe);
    },
  }));

  const handleGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, Offset>({
    onStart: (_, ctx) => {
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },
    onActive: ({ translationX, translationY }, ctx) => {
      translateX.value = translationX + ctx.x;
      translateY.value = translationY + ctx.y;
      scale.value = interpolate(
        translateX.value,
        [-width / 2, 0, width / 2],
        [1, 0.95, 1],
        Extrapolate.CLAMP
      );
    },
    onEnd: ({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, snapPoints);
      swipe(translateX, dest, velocityX, onSwipe);
      translateY.value = withSpring(0, { velocity: velocityY });
    },
  });

  const animatedStyles = useAnimatedStyle(() => {
    const rotate = `${interpolate(
      translateX.value,
      [-width / 2, 0, width / 2],
      [-30, 0, 30],
      Extrapolate.CLAMP
    )}deg`;

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        {
          rotate,
        },
        {
          scale: scale.value,
        },
      ],
    };
  });

  const likeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [0, width / 4], [0, 1], Extrapolate.CLAMP),
    };
  });

  const dislikeStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(translateX.value, [-width / 4, 0], [1, 0], Extrapolate.CLAMP),
    };
  });

  return (
    <PanGestureHandler onGestureEvent={handleGestureEvent}>
      <Animated.View style={[StyleSheet.absoluteFill]}>
        <Animated.View style={[animatedStyles]}>
          <View style={styles.actions}>
            <Animated.View style={likeStyles}>
              <Text style={[styles.text, styles.textLike]}>Like</Text>
            </Animated.View>
            <Animated.View style={dislikeStyles}>
              <Text style={[styles.text, styles.textDislike]}>Dislike</Text>
            </Animated.View>
          </View>
          <Animated.View></Animated.View>
          <Image source={src} style={[styles.image]} />
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default forwardRef(Swiper);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  actions: {
    position: 'absolute',
    top: 0,
    zIndex: 3,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: '700',
  },
  textLike: {
    color: 'green',
  },
  textDislike: {
    color: 'red',
  },
});
