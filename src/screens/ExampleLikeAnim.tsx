import { Pressable, StyleSheet, View } from 'react-native';

import Animated, {
  createAnimatedPropAdapter,
  processColor,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Path, Svg, type SvgProps } from 'react-native-svg';

const ASvg = Animated.createAnimatedComponent(Svg);
const APath = Animated.createAnimatedComponent(Path);

interface LikeSvgProps extends SvgProps {
  aStyles?: any;
  animatedProps: any;
}

const adapter = createAnimatedPropAdapter(
  (props) => {
    if (Object.keys(props).includes('fill')) {
      props.fill = { type: 0, payload: processColor(props.fill) };
    }
    if (Object.keys(props).includes('stroke')) {
      props.stroke = { type: 0, payload: processColor(props.stroke) };
    }
  },
  ['fill', 'stroke']
);

export const LikeSvg = ({ aStyles, animatedProps, style, ...props }: LikeSvgProps) => {
  console.log('animatedProps', animatedProps);
  return (
    <ASvg
      xmlns="http://www.w3.org/2000/svg"
      fill="#000000"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      style={[aStyles, style]}
      {...props}
    >
      {/* <G> */}
      <APath
        d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"
        animatedProps={animatedProps}
      />
      {/* </G> */}
    </ASvg>
  );
};

export const ExampleLikeAnim = () => {
  const selected = useSharedValue(false);

  const handleLikePress = () => {
    selected.value = !selected.value;
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: selected.value
            ? withSpring(1.5, {
                mass: 2,
                stiffness: 400,
              })
            : withSpring(1, {
                mass: 2,
                stiffness: 400,
              }),
        },
      ],
    };
  });

  const animatedProps = useAnimatedProps(
    () => {
      return {
        fill: selected.value ? 'red' : 'black',
      };
    },
    [],
    adapter
  );

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLikePress}>
        <LikeSvg width={60} height={60} aStyles={animatedStyles} animatedProps={animatedProps} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
