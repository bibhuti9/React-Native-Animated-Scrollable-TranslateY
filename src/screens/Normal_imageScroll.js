import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Animated,
  SafeAreaView,
} from 'react-native';
import React, {useRef} from 'react';

import {images} from '../data/dummyData';
import {COLORS, SIZES} from '../themes/colors';

const WIDTH = SIZES.width;
export default function Normal_imageScroll() {
  const scroll = useRef(new Animated.Value(0)).current;
  const renderItem = ({item}) => {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: item.iconName}}
          resizeMode="cover"
          style={styles.imageStyle}
        />
      </View>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      {images.map((item, index) => {
        const inputRange = [
          (index - 1) * WIDTH,
          index * WIDTH,
          (index + 1) * WIDTH,
        ];
        const opacity = scroll.interpolate({
          inputRange,
          outputRange: [0, 1, 0],
          extrapolate: 'clamp',
        });
        const translateX = scroll.interpolate({
          inputRange,
          outputRange: [-WIDTH * 1, 0, -WIDTH * 1],
        });
        return (
          <View style={StyleSheet.absoluteFill}>
            <Animated.Image
              source={{uri: item.iconName}}
              style={[
                StyleSheet.absoluteFill,
                {
                  opacity: opacity,
                  transform: [
                    {
                      translateX: translateX,
                    },
                  ],
                },
              ]}
            />
          </View>
        );
      })}
      <View style={{flex: 1}}>
        <Animated.FlatList
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scroll}}}],
            {useNativeDriver: true},
          )}
          data={images}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  imageContainer: {
    width: WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: '90%',
    height: undefined,
    aspectRatio: 10 / 9,
    borderRadius: SIZES.radious,
  },
});
