import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseScreen from './BaseScreen';
import App from 'FinVietEco/js/app';
import LAF from 'FinVietEco/js/LAF';

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
        return <View style={[LAF.statusBarOverlayFix, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <Text> Hello... </Text>
        </View>
    }
}