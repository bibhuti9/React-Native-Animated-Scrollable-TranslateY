import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('screen');
export const COLORS = {
  primary: '#34eba1',

  white: '#fff',
  black: '#0b120f',

  gray1: '#e6e8e7',
  gray2: '#bdbfbe',
};

export const SIZES = {
  L: 28,
  M: 25,
  S: 20,
  SM: 17,
  width: width,
  height: height,

  padding: 15,
  margin: 15,

  radious: 15,
};

export const commonStyle = {
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      height: 0,
      width: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.5,
    elevation: 5,
  },
};
