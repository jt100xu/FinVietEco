import {
    Navigator,
    StyleSheet,
    Platform,
} from 'react-native';

module.exports = StyleSheet.create({
    statusBarOverlayFix: {
        marginTop: (Platform.OS === 'ios') ? Navigator.NavigationBar.Styles.General.StatusBarHeight : 0,
    },
    verticalContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    roundedButton: {
        height: 30,
        borderRadius: 5,
        backgroundColor: "#fff",
        borderColor: '#73AD21',
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        margin: 5,
    },
    roundedButtonText: {
        fontSize: 12,
        backgroundColor: "transparent"
    },
    textInput: { height: 30, borderColor: 'gray', borderWidth: 1, fontSize: 12 },
    text: { fontSize: 12 },
});

