import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
import BaseScreen from './BaseScreen';
import App from 'FinVietEco/js/app';
import CommonStyles from 'FinVietEco/js/CommonStyles';
import CmdType from 'FinVietEco/js/network/CmdType';
import EventBus from 'eventbusjs';

export default class MainScreen extends BaseScreen {
    static navigationOptions = {
        title: 'Main',
    };

    constructor(props) {
        super(props)
        this.state = {
        };
    }

    _subscribeEvents() {
    }

    _unsubcribeEvents() {
    }

    componentWillUnmount() {
        this._unsubcribeEvents()
    }

    _onMessage(event, response) {
        switch (response.cmdtype) {

        }
    }

    render() {
        return <ScrollView>
            <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>

            </View>
        </ScrollView>
    }
}