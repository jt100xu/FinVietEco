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
            avatarUrl: 'https://afspot.net/forum/uploads/profile/photo-548884.gif?_r=1468893451',
        };
    }

    _subscribeEvents() {
    }

    _unsubcribeEvents() {
    }

    _onMessage(event, response) {
        switch (response.cmdtype) {
        }
    }

    componentWillUnmount() {
        this._unsubcribeEvents()
    }

    componentDidMount() {
        let data = this.props.navigation.state.params;
        let avatar = App.globalService._getDownloadUrl(data.initiator, data.token, data.parent_avatar)
        this.setState({
            avatarUrl: avatar,
        })
        console.log(`avatarUrl: ${avatar}`)
    }


    render() {
        let data = this.props.navigation.state.params;
        return <ScrollView>
            <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>
                <Text style={CommonStyles.text}>Xin chao {data.parent_name}</Text>
                <Image
                    source={{
                        uri: this.state.avatarUrl,
                    }}
                    style={{ width: 50, height: 50 }}
                    resizeMode='contain'/*, 'contain', 'stretch', 'repeat', 'center'*/ />
                <Text style={CommonStyles.text}>{this.state.dateString}</Text>
            </View>
        </ScrollView>
    }
}