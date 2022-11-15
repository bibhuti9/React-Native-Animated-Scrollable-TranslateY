import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Animated,
  StyleSheet,
} from 'react-native';
import React, {useRef} from 'react';

import {images} from '../data/dummyData';
import {SIZES, COLORS} from '../themes/colors';

const WIDTH = SIZES.width * 0.8;
export default function HorizontalScrollVI() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}) => {
    const inputRange = [
      (index - 1) * WIDTH,
      index * WIDTH,
      (index + 1) * WIDTH,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
    });

    return (
      <View style={{width: WIDTH, backgroundColor: 'pink'}} key={index}>
        <Animated.View
          style={[styles.imageContainer, {transform: [{scale: scale}]}]}>
          <Image source={{uri: item.iconName}} style={styles.imageStyle} />
        </Animated.View>
      </View>
    );
  };

  const Indecators = ({data, scrollX}) => {
    return (
      <View style={styles.indicatorContainerStyle}>
        {data.map((_, index) => {
          const inputRange = [
            (index - 1) * WIDTH,
            index * WIDTH,
            (index + 1) * WIDTH,
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [20, 30, 20],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={String(index)}
              style={[
                styles.dot,
                {opacity: opacity, width: dotWidth},
              ]}></Animated.View>
          );
        })}
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View>
        <View>
          <FlatList
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            scrollEventThrottle={16}
            decelerationRate="fast"
            snapToInterval={WIDTH}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            data={images}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
        <View>
          <Indecators data={images} scrollX={scrollX} />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: 'pink',
  },
  imageStyle: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 12,
  },
  dot: {
    width: SIZES.SM,
    height: SIZES.SM,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.margin - 10,
  },
  indicatorContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginVertical: SIZES.margin + 10,
  },
});
