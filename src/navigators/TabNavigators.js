import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HorizontalScroll from '../HorizontalScroll';

const Stack = createStackNavigator();
export default function TabNavigators() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Horizontal Scrol" component={HorizontalScroll} />
    </Stack.Navigator>
  );
}
