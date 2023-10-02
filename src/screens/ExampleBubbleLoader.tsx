import { useState } from 'react';
import { Pressable, View, StyleSheet, Text } from 'react-native';

import { Bubbles } from '../components/Bubbles';
import { Easing, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';

export const ExampleBubbleLoader = () => {
  const [play, setPlay] = useState(false);

  const progress = useSharedValue<number | null>(null);
  const paused = useSharedValue(!play);

  return (
    <View style={styles.container}>
      <Bubbles progress={progress} />
      <Pressable
        style={styles.btn}
        onPress={() => {
          setPlay((prev) => !prev);
          paused.value = !paused.value;
          if (progress.value === null) {
            progress.value = withRepeat(
              withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
              -1,
              true
            );
          }
        }}
      >
        <Text>{play ? 'Pause' : 'Play'}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    height: 100,
    width: '100%',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
