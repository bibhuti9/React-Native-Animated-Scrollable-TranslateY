import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useRef} from 'react';

import {images} from './data/dummyData';
import {SIZES} from './themes/colors';
import Indicators from './components/Indicators';
const SIZE = SIZES.width * 0.8;
export default function HorizontalScroll() {
  const scroll = useRef(new Animated.Value(0)).current;
  const RenderItem = ({item, style}) => {
    return (
      <Animated.View
        style={[styles.imageContainer, {transform: [{scale: style}]}]}>
        <Image source={{uri: item.iconName}} style={styles.imageStyle} />
      </Animated.View>
    );
  };
  return (
    <SafeAreaView>
      <ScrollView
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scroll}}}],
          {useNativeDriver: false},
        )}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {images.map((item, index) => {
          const inputRange = [
            (index - 2) * SIZE,
            (index - 2) * SIZE,
            index * SIZE,
          ];
          const style = scroll.interpolate({
            inputRange,
            outputRange: [0.96, 1, 0.96],
          });
          return <RenderItem key={String(index)} style={style} item={item} />;
        })}
      </ScrollView>
      <View style={styles.container}>
        <Indicators data={images} scroll={scroll} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SIZE,
    overflow: 'hidden',
    borderRadius: SIZES.radious,
  },
  imageStyle: {
    width: '100%',
    height: 300,
  },
});
