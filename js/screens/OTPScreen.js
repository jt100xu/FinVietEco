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

    componentDidMount() {
        this._startTimeoutCountdown()
    }

    componentWillUnmount() {
        clearInterval(this._timeout)
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
            App.globalService._sendSetup(this.props.navigation.state.params.initiator, (response, e) => {
                if (response !== null && response !== undefined) {
                    //success
                    this._startTimeoutCountdown()
                }
            })
        } else {
            console.log('chưa hết timeout')
        }
    }

    _onPressSendOTPConfirm() {
        App.globalService._sendOTPConfirm(this.props.navigation.state.params.initiator, this.state.otp, (response, e) => {
            if (response !== null && response !== undefined) {
                //success
                switch (response.result) {
                    case 0:
                        //go to main
                        break;
                    case 20001:
                        alert(response.message)
                        break;
                }
            }
        })
    }

    render() {
        const navigationParams = this.props.navigation.state.params;

        return <View style={[CommonStyles.statusBarOverlayFix, styles.container]}>
            <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({ otp: text })}
                value={this.state.otp}></TextInput>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => this._onPressResendOTP()}>
                <Text style={styles.roundedButtonText}>{this.state.remainTimeOutText}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => this._onPressSendOTPConfirm()}>
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