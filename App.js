import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, PermissionsAndroid, Image, AppState} from 'react-native';
import Heartbeat from './Heartbeat';

async function requestReadSmsPermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_SMS, {
            title: 'تایید خودکار کد فعال سازس',
            message: 'ما برای تایید خودکار کد فعال سازی نیاز به دسترسی به پیامک های شما داریم',
        });
        console.log(granted);
    } catch (err) {
        console.warn(err);
    }
}

async function requestReceiveSmsPermission() {
    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECEIVE_SMS, {
            title: 'تایید خودکار کد فعال سازس',
            message: 'ما برای تایید خودکار کد فعال سازی نیاز به دسترسی به پیامک های شما داریم',
        });
        console.log(granted);
    } catch (err) {
        console.warn(err);
    }
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            appState: AppState.currentState,
        };
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!');
        }
        this.setState({appState: nextAppState});
    };

    async componentDidMount() {
        console.log('componentDidMount');
        AppState.addEventListener('change', this._handleAppStateChange);
        await requestReadSmsPermission();
        await requestReceiveSmsPermission();
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    render() {

        return (
            <View style={styles.container}>
             <Text>Welcome to app</Text>
            </View>
        );
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'cyan',
    },
    
});
