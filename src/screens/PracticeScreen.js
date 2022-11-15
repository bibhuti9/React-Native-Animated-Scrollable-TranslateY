import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
} from 'react-native';
import React from 'react';

import {images} from '../data/dummyData';
import {SIZES, COLORS} from '../themes/colors';
export default function PracticeScreen() {
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={{uri: item.iconName}} style={styles.imageStyle} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <FlatList
            data={images}
            snapToInterval={SIZES.height - StatusBar.currentHeight}
            decelerationRate={'fast'}
            bounces={false}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: SIZES.width,
    height: SIZES.height - StatusBar.currentHeight,
    alignItems: 'center',
    borderWidth: 1,
    justifyContent: 'center',
    elevation: 5,
  },
  imageStyle: {
    width: SIZES.width / 1.2,
    height: 300,
    borderRadius: SIZES.radious,
  },
});
