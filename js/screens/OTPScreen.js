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

const TIMEOUT = 300000;

export default class OTPScreen extends BaseScreen {
    static navigationOptions = {
        title: 'OTP',
    };


    constructor(props) {
        super(props)
        this.state = {
            otp: '',
            remainTimeOut: 0,
            remainTimeOutText: '',
        }

        this._subscribeEvents()
    }

    _subscribeEvents() {
        EventBus.addEventListener(`${CmdType.SETUP}`, this._onMessage, this)
        EventBus.addEventListener(`${CmdType.OTP_CONFIRM_RESPONSE}`, this._onMessage, this)
    }

    _unsubcribeEvents() {
        EventBus.removeEventListener(`${CmdType.SETUP}`, this._onMessage, this)
        EventBus.removeEventListener(`${CmdType.OTP_CONFIRM_RESPONSE}`, this._onMessage, this)
    }

    componentWillUnmount() {
        clearInterval(this._timeout)
        this._unsubcribeEvents()
    }

    componentDidMount() {
        this._startTimeoutCountdown()
    }

    _onMessage(event, response) {
        switch (response.cmdtype) {
            case CmdType.SETUP:
                this._startTimeoutCountdown()
                break;
            case CmdType.OTP_CONFIRM_RESPONSE:
                switch (response.result) {
                    case 0:
                        //go to main
                        this._navigateToTop('Main', response)
                        break;
                    case 20001:
                        alert(response.message)
                        break;
                }
                break;
        }
    }

    _updateTimeout() {
        let remain = this.state.remainTimeOut - 1000;
        if (remain <= 0) {
            clearInterval(this._timeout)
            this.setState({
                remainTimeOut: remain,
                remainTimeOutText: 'Gửi lại',
            })
        } else {
            this.setState({
                remainTimeOut: remain,
                remainTimeOutText: this._convertTimeToString(remain),
            })
        }
    }

    _resetTimeOutCountdown() {
        this.setState({
            remainTimeOut: TIMEOUT,
            remainTimeOutText: this._convertTimeToString(TIMEOUT),
        })
    }

    _genOTPcode() {
        if (this.props.navigation.state.params.initiator === '01677779999') {
            this.setState({ otp: '596863' })
        } else {
            this.setState({ otp: this._randomOtp() })
        }
    }

    _randomOtp() {
        return `${Math.random()}`.substr(2, 6);
    }

    _startTimeoutCountdown() {
        this._genOTPcode()
        this._resetTimeOutCountdown()
        this._timeout = setInterval(this._updateTimeout.bind(this), 1000)
    }


    _convertTo2char(num) {
        return num < 10 ? '0' + num : num;
    }

    _convertTimeToString(time) {
        return this._convertTo2char(Math.floor(time / 1000 / 60)) + ':' +
            this._convertTo2char(Math.floor(time / 1000 % 60));
    }

    _onPressResendOTP() {
        if (this.state.remainTimeOut <= 0) {
            console.log('đã hết timeout, request Setup')
            App.globalService._sendSetup(this.props.navigation.state.params.initiator)
        } else {
            console.log('chưa hết timeout')
        }
    }

    _onPressSendOTPConfirm() {
        App.globalService._sendOTPConfirm(this.props.navigation.state.params.initiator, this.state.otp)
    }

    render() {
        const navigationParams = this.props.navigation.state.params;

        return <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>
            <TextInput style={CommonStyles.textInput}
                onChangeText={(text) => this.setState({ otp: text })}
                value={this.state.otp}></TextInput>
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={() => this._onPressResendOTP()}>
                <Text style={CommonStyles.roundedButtonText}>{this.state.remainTimeOutText}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={() => this._onPressSendOTPConfirm()}>
                <Text style={CommonStyles.roundedButtonText}>Send Otp confirm</Text>
            </TouchableHighlight>
        </View>
    }
}