import { StyleSheet, View } from 'react-native';

import { NavItem } from '../components/NavItem';
import { ROUTES } from '../navigator/routes';

const navigation = [
  { label: '▶ Pan Gesture', link: ROUTES.panGesture },
  { label: '▶ Transitions', link: ROUTES.transitions },
  { label: '▶ Timing', link: ROUTES.bubbleLoader },
  { label: '▶ Swiping', link: ROUTES.swiping },
  { label: '▶ Drag to sort', link: ROUTES.dragToSort },
  { label: '▶ Like', link: ROUTES.heart },
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
