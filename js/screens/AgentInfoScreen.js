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
import { formatBirthday } from 'FinVietEco/js/Utils';

export default class AgentInfoScreen extends BaseScreen {
    static navigationOptions = {
        title: 'AgentInfo',
    };

    constructor(props) {
        super(props)
        this._subscribeEvents()
        this.state = {
            avatarUrl: 'https://afspot.net/forum/uploads/profile/photo-548884.gif?_r=1468893451',
            name: '',
            owner: '',
            reference: '',
            birthday: '',
            cmnd: '',
            address: '',
            position: {
                desc: '',
                long: 0,
                lat: 0
            },
        };
    }

    componentWillUnmount() {
        this._unsubcribeEvents()
    }

    componentDidMount() {
        this._refreshAgentInfo()
    }

    _subscribeEvents() {
        EventBus.addEventListener(`${CmdType.AGENT_INFO}`, this._onMessage, this)
    }

    _unsubcribeEvents() {
        EventBus.removeEventListener(`${CmdType.AGENT_INFO}`, this._onMessage, this)
    }

    _onMessage(event, response) {
        let data = this.props.navigation.state.params;

        switch (response.cmdtype) {
            case CmdType.AGENT_INFO:
                let agent = response.agent
                let avatar = App.globalService._getDownloadUrl(data.initiator, data.token, agent.avatar)
                let birthday = formatBirthday(agent.birthday)
                let address = agent.location.number + ', ' + agent.location.ward.name + ', ' + agent.location.district.name + ', ' + agent.location.province.name
                this.setState({
                    avatarUrl: avatar,
                    agentInfo: response,
                    name: agent.name,
                    owner: agent.owner,
                    reference: agent.reference,
                    birthday: birthday,
                    cmnd: agent.cmnd,
                    address: address,
                    position: agent.position,
                })
                break;
        }
    }

    _refreshAgentInfo() {
        let data = this.props.navigation.state.params;
        App.globalService._sendAgentInfo(data.initiator, data.token, Date.now())
    }

    render() {
        return <ScrollView>
            <View style={[CommonStyles.statusBarOverlayFix, CommonStyles.verticalContainer]}>
                <TouchableHighlight style={styles.avatar} underlayColor={underlayColor} onPress={() => this._onPressProfile()}>
                    <Image
                        source={{
                            uri: this.state.avatarUrl,
                        }}
                        style={styles.avatar}
                        resizeMode='center'/*, 'contain', 'stretch', 'repeat', 'center'*/ />
                </TouchableHighlight>
                <Text style={CommonStyles.text}>{this.state.name}</Text>
                <Text style={CommonStyles.text}>{this.state.reference}</Text>
                <Text style={CommonStyles.text}>Chu cua hang {this.state.owner}</Text>
                <Text style={CommonStyles.text}>Ngay sinh {this.state.birthday}</Text>
                <Text style={CommonStyles.text}>CMND {this.state.cmnd}</Text>
                <Text style={CommonStyles.text}>Dia chi {this.state.address}</Text>
                
            </View>
        </ScrollView>
    }
}

const underlayColor = 'honeydew';
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