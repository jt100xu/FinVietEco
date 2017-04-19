import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
} from 'react-native';
import BaseScreen from './BaseScreen';
import CommonStyles from 'FinVietEco/js/CommonStyles';

export default class ProfileScreen extends BaseScreen {
    static navigationOptions = {
        title: 'Profile',
    };

    constructor(props) {
        super(props)
    }

    _onPressAgentInfo(){
        this._navigateTo('AgentInfo',this.props.navigation.state.params)
    }
    _onPressChangePass(){}
    _onPressSignout(){}

    render() {
        return <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>            
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={()=>this._onPressAgentInfo()}>
                <Text style={CommonStyles.roundedButtonText}>Thong tin diem ban hang</Text>                
            </TouchableHighlight>
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={()=>this._onPressChangePass()}>
                <Text style={CommonStyles.roundedButtonText}>Doi mat khau giao dich</Text>                
            </TouchableHighlight>
            <TouchableHighlight style={CommonStyles.roundedButton} underlayColor='honeydew' onPress={()=>this._onPressSignout()}>
                <Text style={CommonStyles.roundedButtonText}>Dang nhap voi so dien thoai khac</Text>                
            </TouchableHighlight>
        </View>
    }
}