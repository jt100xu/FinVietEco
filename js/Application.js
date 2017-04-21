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
import { GLOBALSERVICE } from './network/GlobalService';
import GlobalMessageHandler from './network/GlobalMessageHandler'

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

export const SERVER = 'ws://app.finviet.com.vn:3979';
export const DOWNLOAD_PATH = 'http://app.finviet.com.vn:3000/download?initiator=';
class Application extends React.Component {

  constructor(props) {
    super(props)

    this.socket = new WebSocket(SERVER);
    this.socket.onopen = () => {
      console.log(`WebSocket ---> client connected to ${SERVER}`);
      this.globalMessageHandler._onSocketOpen()
    };
    this.socket.onmessage = (e) => {
      console.log(`WebSocket ---> client receive: ${e.data}`);
      this.globalMessageHandler._onSocketMessage(e.data)
    };
    this.socket.onerror = (e) => {
      console.error(`WebSocket ---> client error: ${e.message}`);
      this.globalMessageHandler._onSocketError(e)
    };
    this.socket.onclose = (e) => {
      console.log(`WebSocket ---> client closed: ${e.code}::${e.reason}`);
      this.globalMessageHandler._onSocketClose(e)
    };

    this.globalMessageHandler = new GlobalMessageHandler();
    GLOBALSERVICE._setSocket(this.socket)
  }

  componentWillUnmount() {
    this.socket.close()
  }

  render() {
    return (
      <FinVietEco ref={nav => { this.navigator = nav; }} />
    );
  }
}

AppRegistry.registerComponent('FinVietEco', () => Application);
