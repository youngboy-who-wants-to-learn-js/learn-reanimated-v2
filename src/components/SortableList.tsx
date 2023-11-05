import React, { type ReactElement } from 'react';
import { ScrollView } from 'react-native';
import { SortableItem } from './SortableItem';
import { useSharedValue } from 'react-native-reanimated';

interface SortableListProps {
  children: ReactElement[];
  item: { width: number; height: number };
}

export const SortableList = ({ children, item }: SortableListProps) => {
  const activeCard = useSharedValue(-1);

  const offsets = children.map((_, index) => {
    return {
      x: 0,
      y: useSharedValue(index * item.height),
    };
  });

  return (
    <ScrollView contentContainerStyle={{ height: item.height * children.length }}>
      {children.map((child, index) => {
        return (
          <SortableItem
            offsets={offsets}
            index={index}
            key={index}
            width={item.width}
            height={item.height}
            activeCard={activeCard}
          >
            {child}
          </SortableItem>
        );
      })}
    </ScrollView>
  );
};
