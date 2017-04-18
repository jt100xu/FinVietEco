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

export default class SigninScreen extends BaseScreen {
    static navigationOptions = {
        title: 'Sign in',
    };

    constructor(props) {
        super(props)
        this.state = {
            initiator: '01677779999',
        };

        App.globalMessageHandler._getEventBus()._subscribe(`${CmdType.SETUP}`, this._onMessage, this)
    }

    componentWillUnmount() {
        App.globalMessageHandler._getEventBus()._unsubscribe(`${CmdType.SETUP}`, this._onMessage, this)
    }

    _onMessage(self, response) {
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
                        self._navigateTo('OTP', response)
                        break;
                }
                break;
        }
    }

    render() {
        return <View style={[CommonStyles.statusBarOverlayFix, styles.container]}>
            <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({ initiator: text })}
                value={this.state.initiator}></TextInput>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => {
                App.globalService._sendSetup(this.state.initiator)
            }}>
                <Text style={styles.roundedButtonText}>Sign in</Text>
            </TouchableHighlight>
        </View>
    }
}

const underlayColor = "honeydew";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    roundedButton: {
        height: 50,
        borderRadius: 11,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    roundedButtonText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
    textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
});