import { CARD_IMAGES } from '../constants/cardImage';
import { SortableList } from '../components/SortableList';
import { StyleSheet } from 'react-native';

import { Card } from '../components/Card';

const cards = [CARD_IMAGES.first, CARD_IMAGES.seconds, CARD_IMAGES.third];

export const ExampleDragToSort = () => {
  return (
    <SortableList item={{ width: 220, height: 120 + 32 }}>
      {cards.map((card, index) => (
        <Card style={styles.card} src={card} key={index} />
      ))}
    </SortableList>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 120,
    width: '100%',
    alignItems: 'center',
    marginTop: 32,
  },
});
