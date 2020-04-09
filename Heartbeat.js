import { NativeModules } from 'react-native';
const { Heartbeat } = NativeModules;
Heartbeat.startService();
export default Heartbeat;
