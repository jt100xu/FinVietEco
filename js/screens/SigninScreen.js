import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import BaseScreen from './BaseScreen';
import App from 'FinVietEco/js/app';
import CommonStyles from 'FinVietEco/js/CommonStyles';
import CmdType from 'FinVietEco/js/network/CmdType';
import EventBus from 'eventbusjs';

export default class SigninScreen extends BaseScreen {
    static navigationOptions = {
        title: 'Sign in',
    };

    constructor(props) {
        super(props)
        this._subscribeEvents()
        this.state = {
            initiator: '01677779999',
        };
    }

    componentWillUnmount() {
        this._unsubcribeEvents()
    }

    _subscribeEvents() {
        EventBus.addEventListener(`${CmdType.SETUP}`, this._onMessage, this)
    }

    _unsubcribeEvents() {
        EventBus.removeEventListener(`${CmdType.SETUP}`, this._onMessage, this)
    }

    _onMessage(event, response) {
        switch (response.cmdtype) {
            case CmdType.SETUP:
                switch (response.result) {
                    case 3:
                        //agent not found
                        alert(response.message)
                        break;
                    case 20002:
                    case 0:
                        //agent invited
                        this._navigateTo('OTP', response)
                        break;
                }
                break;
        }
    }

    _onPressSignin(){
        App.globalService._sendSetup(this.state.initiator)
    }

    render() {
        return <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>
            <TextInput style={CommonStyles.textInput}
                onChangeText={(text) => this.setState({ initiator: text })}
                value={this.state.initiator}></TextInput>
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={()=>this._onPressSignin()}>
                <Text style={CommonStyles.roundedButtonText}>Sign in</Text>                
            </TouchableHighlight>
        </View>
    }
}