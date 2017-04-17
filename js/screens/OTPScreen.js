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
import LAF from 'FinVietEco/js/LAF';

const TIMEOUT = 300000;

export default class OTPScreen extends BaseScreen {
    static navigationOptions = {
        title: 'OTP',
    };


    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            remainTimeOut: TIMEOUT,
            remainTimeOutText: this._convertTimeToString(TIMEOUT),
        }
    }

    _timeoutTictac() {
        let remain = this.state.remainTimeOut - 1000;
        if (remain <= 0) {
            clearInterval(_timeout)
            this.setState({
                remainTimeOutText: 'Gửi lại',
            })
        } else {
            this.setState({
                remainTimeOut: remain,
                remainTimeOutText: this._convertTimeToString(remain),
            })
        }
    }

    componentDidMount() {
        this._toggleInputOTP()
    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        clearInterval(this._timeout)
    }

    _toggleInputOTP() {
        const navigationParams = this.props.navigation.state.params;

        if (navigationParams.initiator === '01677779999') {
            this.setState({ otp: '596863' })
        } else {
            let randomOTP = '';
            this.setState({ otp: randomOTP })
        }

        this._timeout = setInterval(this._timeoutTictac(), 1000)
    }

    _convertTo2char(num) {
        return num < 10 ? '0' + num : num;
    }

    _convertTimeToString(time) {
        return this._convertTo2char(Math.floor(time / 1000 / 60)) + ':' +
            this._convertTo2char(Math.floor(time / 1000 % 60));
    }

    render() {
        const navigationParams = this.props.navigation.state.params;

        return <View style={[LAF.statusBarOverlayFix, styles.container]}>
            <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({ otp: text })}
                value={this.state.otp}></TextInput>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => {
                if (this.state.remainTimeOut <= 0) {
                    console.log('đã hết timeout, request Setup')
                    App.globalService._sendSetup(navigationParams.initiator, (response, e) => {
                        if (e === null || e === undefined) {
                            //success
                            this._toggleInputOTP()
                        }
                    })
                } else {
                    console.log('chưa hết timeout')
                }
            }}>
                <Text style={styles.roundedButtonText}>{this.state.remainTimeOutText}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => {
                App.globalService._sendOTPConfirm(navigationParams.initiator, this.state.otp, (response, e) => {
                    if (e === null) {
                        //success                        
                    }
                })
            }}>
                <Text style={styles.roundedButtonText}>Send Otp confirm</Text>
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