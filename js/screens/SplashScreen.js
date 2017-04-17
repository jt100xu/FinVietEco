import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseScreen from './BaseScreen';
import App from 'FinVietEco/js/app';
import CommonStyles from 'FinVietEco/js/CommonStyles';

export default class SplashScreen extends BaseScreen {
    constructor(props) {
        super(props)
        let _update = setInterval(() => {
            if (App.globalService._isConnected()) {
                clearInterval(_update)
                super._navigateToTop('Signin')
            }
        }, 1000)
    }

    render() {
        return <View style={[CommonStyles.statusBarOverlayFix, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <Text> Hello... </Text>
        </View>
    }
}