import React from 'react';
import {
    View,
    TouchableHighlight,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import App from 'FinVietEco/js/app';
import LAF from 'FinVietEco/js/LAF';

export default class SigninScreen extends React.Component {
    static navigationOptions = {
        title: 'Sign in',
    };

    constructor(props) {
        super(props)
        this.state = {
            initiator: '01677779999',
        };
    }

    render() {
        const { navigate } = this.props.navigation;

        return <View style={[LAF.statusBarOverlayFix, styles.container]}>
            <TextInput style={styles.textInput}
                onChangeText={(text) => this.setState({ initiator: text })}
                value={this.state.initiator}></TextInput>
            <TouchableHighlight style={styles.roundedButton} underlayColor={underlayColor} onPress={() => {
                App.globalService._sendSetup(this.state.initiator)
            }}>
                <Text style={styles.roundedButtonText}>Sign in</Text>
            </TouchableHighlight>
        </View>
    }
}

const underlayColor = "honeydew";
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    roundedButton: {
        height: 50,
        borderRadius: 11,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    roundedButtonText: {
        fontSize: 14,
        backgroundColor: "transparent"
    },
    textInput: { height: 40, borderColor: 'gray', borderWidth: 1 },
});