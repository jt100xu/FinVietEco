import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
} from 'react-native';
import BaseScreen from './BaseScreen';
import CommonStyles from 'FinVietEco/js/CommonStyles';

export default class AgentInfoScreen extends BaseScreen {
    static navigationOptions = {
        title: 'AgentInfo',
    };

    constructor(props) {
        super(props)
    }

    render() {
        return <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>                        
        </View>
    }
}