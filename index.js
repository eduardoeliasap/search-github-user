/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

// Note: If you skip this step, your app may crash in production even if it works fine in development.
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
