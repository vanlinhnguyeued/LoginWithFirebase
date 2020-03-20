/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import Login from './src/components/LoginScreen/Login';
import MainScreen from './src/components/MainScreen/MainScreen';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Login);
