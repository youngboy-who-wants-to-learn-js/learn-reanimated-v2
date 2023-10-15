import { StyleSheet, View } from 'react-native';

import { ROUTES } from '../navigator/routes';
import { NavItem } from '../components/NavItem';

const navigation = [
  { label: '▶ Pan Gesture', link: ROUTES.panGesture },
  { label: '▶ Transitions', link: ROUTES.transitions },
  { label: '▶ Timing', link: ROUTES.bubbleLoader },
  { label: '▶ Swiping', link: ROUTES.swiping },
];

export function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.navContainer}>
        {navigation.map(({ label, link }, index) => (
          <NavItem label={label} link={link} key={index} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 32,
  },
  navContainer: {
    gap: 30,
  },
});
