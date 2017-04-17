import {
    Navigator,
    StyleSheet,
    Platform,
} from 'react-native';

module.exports = StyleSheet.create({
    statusBarOverlayFix: {
        marginTop: (Platform.OS === 'ios') ? Navigator.NavigationBar.Styles.General.StatusBarHeight : 0,
    },
});

