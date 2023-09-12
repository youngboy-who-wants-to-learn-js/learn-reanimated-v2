import { useEffect } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { CARD_IMAGES } from '../constants/cardImage';
import { AnimatedCard } from '../components/AnimatedCard';
import { useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';

const useSpring = (state) => {
  const value = useSharedValue(0);

  useEffect(() => {
    value.value = typeof state === 'number ' ? state : state ? 1 : 0;
  }, [state, value]);

  const transition = useDerivedValue(() => {
    return withSpring(value.value);
  });

  return transition;
};

export function ExampleTransitions() {
  const toggled = useSharedValue(false);

  // const transition = useSpring(toggled);

  const transition = useDerivedValue(() => {
    return withSpring(toggled.value);
  });

  return (
    <View style={styles.container}>
      {Object.values(CARD_IMAGES).map((srcCard, index) => (
        <AnimatedCard
          src={srcCard}
          key={index}
          index={index}
          // toggled={toggled}
          transition={transition}
        />
      ))}
      <Pressable
        style={styles.btn}
        onPress={() => {
          toggled.value = !toggled.value;
        }}
      >
        <Text style={styles.btnText}>{toggled.value ? 'Reset' : 'Start'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  btn: {
    width: '100%',
    backgroundColor: 'blue',
    padding: 16,
    alignItems: 'center',
  },
  btnText: {
    fontSize: 30,
    color: 'white',
  },
});
