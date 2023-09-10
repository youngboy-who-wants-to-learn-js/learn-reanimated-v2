import { Link } from '@react-navigation/native';
import { View, StyleSheet, Text } from 'react-native';

interface NavItemProps {
  label: string;
  link: string;
}

export const NavItem = ({ label, link }: NavItemProps) => {
  return (
    <View style={styles.container}>
      <Link to={{ screen: link }}>
        <Text style={styles.text}>{label}</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingLeft: 32,
    borderWidth: 1,
    backgroundColor: 'gray',
    borderRadius: 16,
  },
  text: {
    fontSize: 32,
    fontWeight: '500',
  },
});
