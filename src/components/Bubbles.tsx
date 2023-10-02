import * as React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { type SharedValue } from 'react-native-reanimated';

import { Bubble } from './Bubble';

const { width: wWidth } = Dimensions.get('window');
const width = wWidth * 0.8;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: width,
    width,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#d3d3d3',
    borderTopLeftRadius: width / 2,
    borderTopRightRadius: width / 2,
    borderBottomLeftRadius: width / 2,
  },
});

interface BubbleProps {
  progress: SharedValue<number | null>;
}
const bubbles = [0, 1, 2];

const Bubbles = ({ progress }: BubbleProps) => {
  const delta = 1 / bubbles.length;
  return (
    <View style={styles.root}>
      <View style={styles.container}>
        {bubbles.map((i) => {
          return <Bubble delta={delta} progress={progress} index={i} key={i} />;
        })}
      </View>
    </View>
  );
};

export { Bubbles };
