import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import BaseScreen from './BaseScreen';
import { GLOBALSERVICE } from 'FinVietEco/js/network/GlobalService';
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
            avatarUrl: 'https://afspot.net/forum/uploads/profile/photo-548884.gif?_r=1468893451',
        };
    }

    componentDidMount() {
        let data = this.props.navigation.state.params;
        let avatar = GLOBALSERVICE._getDownloadUrl(data.initiator, data.token, data.avatar)
        this.setState({
            avatarUrl: avatar,
        })
        console.log(`avatarUrl: ${avatar}`)
    }

    _onPressProfile() {
        this._navigateTo('Profile', this.props.navigation.state.params)
    }
    _onPressTopup() { }
    _onPressReport() { }

    render() {
        let data = this.props.navigation.state.params;
        return <ScrollView>
            <View style={[CommonStyles.styles.statusBarOverlayFix, CommonStyles.styles.verticalContainer]}>
                <Text style={CommonStyles.styles.text}>Xin chao {data.parent_name}</Text>
                <TouchableHighlight style={styles.avatar} underlayColor={CommonStyles.underlayColor} onPress={() => this._onPressProfile()}>
                    <Image
                        source={{
                            uri: this.state.avatarUrl,
                        }}
                        style={styles.avatar}
                        resizeMode='center'/*, 'contain', 'stretch', 'repeat', 'center'*/ />
                </TouchableHighlight>
                <Text style={CommonStyles.styles.text}>{this.state.dateString}</Text>               
                <TouchableHighlight style={CommonStyles.styles.roundedButton} underlayColor='honeydew' onPress={() => this._onPressTopup()}>
                    <Text style={CommonStyles.styles.roundedButtonText}>Dien thoai</Text>
                </TouchableHighlight>
                <TouchableHighlight style={CommonStyles.styles.roundedButton} underlayColor='honeydew' onPress={() => this._onPressReport()}>
                    <Text style={CommonStyles.styles.roundedButtonText}>Bao cao</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    }
}


const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 1,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        alignItems: "center",
        justifyContent: "center",
    },
});