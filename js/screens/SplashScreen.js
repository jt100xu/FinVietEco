import React from 'react';
import {
    View,
    Text,
} from 'react-native';
import BaseScreen from './BaseScreen';
import CommonStyles from 'FinVietEco/js/CommonStyles';
import { GLOBALSERVICE } from 'FinVietEco/js/network/GlobalService';

export default class SplashScreen extends BaseScreen {
    constructor(props) {
        super(props)
        let _update = setInterval(() => {
            if (GLOBALSERVICE._isConnected()) {
                clearInterval(_update)
                this._navigateToTop('Signin')
            }
        }, 1000)
    }

    render() {
        return <View style={[CommonStyles.styles.statusBarOverlayFix, { flex: 1, alignItems: 'center', justifyContent: 'center' }]}>
            <Text> Hello... </Text>
        </View>
    }
}