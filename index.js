import {AppRegistry} from 'react-native';
import React from 'react';
// import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
// import {setHeartBeat, store} from './store';
import Heartbeat from './Heartbeat';
import firebase from 'react-native-firebase'

const MyHeadlessTask = async (params) => {

  console.log({ params });
  console.log('Receiving HeartBeat!');
 
};



AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => App );
