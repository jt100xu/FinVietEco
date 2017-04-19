import React from 'react';
import {
  AppRegistry,
  AppState,
} from 'react-native';
import { NavigationActions, StackNavigator } from 'react-navigation'
import SplashScreen from './screens/SplashScreen'
import SigninScreen from './screens/SigninScreen'
import OTPScreen from './screens/OTPScreen'
import MainScreen from './screens/MainScreen'
import ProfileScreen from './screens/ProfileScreen'
import AgentInfoScreen from './screens/AgentInfoScreen'
import GlobalService from './network/GlobalService'
import GlobalMessageHandler from './network/GlobalMessageHandler'

export default class App { }

const server = GlobalService.SERVER;
App.socket = new WebSocket(server);
App.socket.onopen = () => {
  console.log(`WebSocket ---> client connected to ${server}`);
  App.globalMessageHandler._onSocketOpen()
};
App.socket.onmessage = (e) => {
  console.log(`WebSocket ---> client receive: ${e.data}`);
  App.globalMessageHandler._onSocketMessage(e.data)
};
App.socket.onerror = (e) => {
  console.error(`WebSocket ---> client error: ${e}`);
  App.globalMessageHandler._onSocketError(e)
};
App.socket.onclose = (e) => {
  console.log(`WebSocket ---> client closed: ${e}`);
  App.globalMessageHandler._onSocketClose(e)
};
App.globalService = new GlobalService();
App.globalMessageHandler = new GlobalMessageHandler();

const FinVietEco = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    Signin: { screen: SigninScreen },
    OTP: { screen: OTPScreen },
    Main: { screen: MainScreen },
    Profile: { screen: ProfileScreen },
    AgentInfo: { screen: AgentInfoScreen },
  },
  {
    headerMode: 'none'
  });

AppRegistry.registerComponent('FinVietEco', () => FinVietEco);
