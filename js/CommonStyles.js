import {
    Navigator,
    StyleSheet,
    Platform,
} from 'react-native';

module.exports = StyleSheet.create({
    statusBarOverlayFix: {
        marginTop: (Platform.OS === 'ios') ? Navigator.NavigationBar.Styles.General.StatusBarHeight : 0,
    },
    underlay: { color: "honeydew" },
    verticalContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    roundedButton: {
        height: 20,
        borderRadius: 3,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 3,
    },
    roundedButtonText: {
        fontSize: 10,
        backgroundColor: "transparent"
    },
    textInput: { height: 20, borderColor: 'gray', borderWidth: 1, fontSize: 10 },
});

