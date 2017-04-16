import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import SplashScreen from './screens/SplashScreen'

const FinVietEco = StackNavigator({
});

AppRegistry.registerComponent('SplashScreen', () => SplashScreen);
