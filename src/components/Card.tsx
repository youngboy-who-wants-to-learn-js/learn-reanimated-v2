import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { CARD_IMAGES } from '../constants/cardImage';

interface CardProps {
  src?: string;
}

export function Card({ src = CARD_IMAGES.first }: CardProps) {
  return (
    <Image
      style={styles.image}
      source={{
        uri: src,
      }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 220,
    height: 120,
  },
});
