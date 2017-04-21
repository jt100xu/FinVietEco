import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
} from 'react-native';
import BaseScreen from './BaseScreen';
import { GLOBALSERVICE } from 'FinVietEco/js/network/GlobalService';
import CommonStyles from 'FinVietEco/js/CommonStyles';
import CmdType from 'FinVietEco/js/network/CmdType';
import EventBus from 'eventbusjs';
import Utils from 'FinVietEco/js/Utils';
import MapView from 'react-native-maps';

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
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
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
                let avatar = GLOBALSERVICE._getDownloadUrl(data.initiator, data.token, agent.avatar)
                let birthday = Utils.formatBirthday(agent.birthday)
                let address = agent.location.number + ', ' + agent.location.ward.name + ', ' + agent.location.district.name + ', ' + agent.location.province.name
                let position = Utils.regionFrom(agent.location.position.lat, agent.location.position.long,0)
                this.setState({
                    avatarUrl: avatar,
                    agentInfo: response,
                    name: agent.name,
                    owner: agent.owner,
                    reference: agent.reference,
                    birthday: birthday,
                    cmnd: agent.cmnd,
                    address: address,
                    position: position,
                })
                break;
        }
    }

    _refreshAgentInfo() {
        let data = this.props.navigation.state.params;
        GLOBALSERVICE._sendAgentInfo(data.initiator, data.token, Date.now())
    }

    _onPressAvatar() {

    }

    render() {
        return <ScrollView>
            <View style={[CommonStyles.styles.statusBarOverlayFix, CommonStyles.styles.verticalContainer]}>
                <TouchableHighlight style={styles.avatar} underlayColor={CommonStyles.underlayColor} onPress={() => this._onPressAvatar()}>
                    <Image
                        source={{
                            uri: this.state.avatarUrl,
                        }}
                        style={styles.avatar}
                        resizeMode='center'/*, 'contain', 'stretch', 'repeat', 'center'*/ />
                </TouchableHighlight>
                <Text style={CommonStyles.styles.text}>{this.state.name}</Text>
                <Text style={CommonStyles.styles.text}>{this.state.reference}</Text>
                <Text style={CommonStyles.styles.text}>Chu cua hang {this.state.owner}</Text>
                <Text style={CommonStyles.styles.text}>Ngay sinh {this.state.birthday}</Text>
                <Text style={CommonStyles.styles.text}>CMND {this.state.cmnd}</Text>
                <Text style={CommonStyles.styles.text}>Dia chi {this.state.address}</Text>
                <MapView
                    style={styles.map}
                    initialRegion={this.state.position} 
                    region={this.state.position}/>
            </View>
        </ScrollView>
    }
}

var { width, height } = Dimensions.get('window');
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
    map: {
        width: width,
        height: 300,
    },
});