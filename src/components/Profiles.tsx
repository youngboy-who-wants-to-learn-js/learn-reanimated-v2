import { StyleSheet, SafeAreaView, View, Pressable } from 'react-native';
import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';

import { defaultProfiles } from '../constants/defaultProfiles';
import { MessageIcon } from '../icons/MessageIcon';
import { LikeIcon } from '../icons/LikeIcon';
import { ProfileIcon } from '../icons/ProfilesIcon';
import { CrossIcon } from '../icons/CrossIcon';
import Swiper, { type SwiperActions } from './Swiper';

export const Profiles = () => {
  const topCard = useRef<SwiperActions>(null);
  const scale = useSharedValue(1);
  const [profiles, setProfiles] = useState(defaultProfiles);

  const onSwipe = () => {
    setProfiles((state) => state.slice(0, state.length - 1));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <ProfileIcon width={32} height={32} />
          <MessageIcon width={32} height={32} />
        </View>
        <View style={styles.profiles}>
          {profiles.map((src, index) => {
            const onTop = index === profiles.length - 1;
            const ref = onTop ? topCard : null;
            return (
              <Swiper
                key={index}
                src={src}
                onTop={onTop}
                onSwipe={onSwipe}
                scale={scale}
                ref={ref}
              />
            );
          })}
        </View>
        <View style={styles.footer}>
          <Pressable
            onPress={() => {
              topCard.current?.swipeLeft();
            }}
          >
            <CrossIcon width={32} height={32} />
          </Pressable>
          <Pressable
            onPress={() => {
              topCard.current?.swipeRight();
            }}
          >
            <LikeIcon width={32} height={32} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profiles: {
    flex: 1,
    marginTop: 32,
    marginBottom: 32,
  },
});
