import React from 'react';
import {
  AppRegistry,
} from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation'
import SplashScreen from './screens/SplashScreen'
import SigninScreen from './screens/SigninScreen'
import GlobalService from './network/GlobalService'

export default class App { }
App.globalService = new GlobalService();

const FinVietEco = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    Signin: { screen: SigninScreen },
  },
  {
    headerMode: 'none'
  });

AppRegistry.registerComponent('FinVietEco', () => FinVietEco);
