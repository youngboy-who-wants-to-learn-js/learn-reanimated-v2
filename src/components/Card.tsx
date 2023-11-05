import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { CARD_IMAGES } from '../constants/cardImage';

interface CardProps {
  src?: string;
  style?: any;
}

export function Card({ src = CARD_IMAGES.first, style }: CardProps) {
  return (
    <Image
      contentFit="cover"
      style={[styles.image, style]}
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
