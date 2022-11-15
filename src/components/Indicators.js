import {
  View,
  Text,
  StyleSheet,
  Animated,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../themes/colors';

export default function Indicators({data, scroll}) {
  const {width} = useWindowDimensions();
  return (
    <View
      style={{flexDirection: 'row', height: 64, marginVertical: SIZES.margin}}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scroll.interpolate({
          inputRange,
          outputRange: [10, 30, 10],
          extrapolate: 'clamp',
        });
        const opacity = scroll.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            style={[styles.dot, {width: dotWidth, opacity: opacity}]}
            key={String(i)}></Animated.View>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.padding - 10,
  },
});
