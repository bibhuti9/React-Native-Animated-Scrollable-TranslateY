import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HorizontalScrollVI from '../screens/HorizontalScrollVI';
import PracticeScreen from '../screens/PracticeScreen';
import Normal_imageScroll from '../screens/Normal_imageScroll';
import TranslateYScreen from '../screens/TranslateYScreen';

const Drawer = createDrawerNavigator();
export default function DrawerStack() {
  return (
    <Drawer.Navigator
      initialRouteName="Translate To Up"
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="Vi Scroll Animation"
        component={HorizontalScrollVI}
      />
      <Drawer.Screen name="Own Slider" component={PracticeScreen} />
      <Drawer.Screen name="Normal Scroll" component={Normal_imageScroll} />
      <Drawer.Screen name="Translate To Up" component={TranslateYScreen} />
    </Drawer.Navigator>
  );
}
