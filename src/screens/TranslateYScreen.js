import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';

import {naturalImages} from '../data/dummyData';
import {SIZES, COLORS, commonStyle} from '../themes/colors';
const {width, height} = Dimensions.get('window');
const SPACING = 10;
const ITEM_SIZE = width * 0.72;
const SPACER = (width - ITEM_SIZE) / 2;
export default function TranslateYScreen() {
  const [images, setImages] = useState([
    {key: 'left-spacer'},
    ...naturalImages,
    {key: 'right-spacer'},
  ]);
  const scroll = useRef(new Animated.Value(0)).current;
  const renderItem = ({item, index}) => {
    if (!item.iconName) return <View style={{width: SPACER}}></View>;

    const inputRange = [
      (index - 2) * ITEM_SIZE,
      (index - 1) * ITEM_SIZE,
      index * ITEM_SIZE,
    ];

    const translateY = scroll.interpolate({
      inputRange,
      outputRange: [0, -50, 0],
    });

    return (
      <View style={{width: ITEM_SIZE}}>
        <Animated.View
          style={[
            styles.imageContainer,
            {transform: [{translateY: translateY}]},
          ]}>
          <Image source={{uri: item.iconName}} style={styles.imageStyle} />
          <Text style={styles.descStyle}>{item.desc}</Text>
        </Animated.View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={images}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scroll}}}],
          {useNativeDriver: false},
        )}
        contentContainerStyle={{alignItems: 'center'}}
        horizontal
        initialScrollIndex={1}
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => (item.id ? item.id : item?.key)}
        renderItem={renderItem}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {flex: 1},
  imageContainer: {
    marginHorizontal: SPACING,
    padding: SPACING * 2,
    alignItems: 'center',
    borderRadius: SIZES.radious,
    backgroundColor: COLORS.white,
    ...commonStyle.shadow,
  },
  imageStyle: {
    width: '100%',
    height: ITEM_SIZE * 1.1,
    borderRadius: SIZES.radious,
  },
  descStyle: {
    marginVertical: SIZES.margin,
  },
});
