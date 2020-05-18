import Reactotron from 'reactotron-react-native';

// This variable returns true when working in a development environment
if (__DEV__) {
  // Put your IP Network if you are emulating with a mobile phone
  const tron = Reactotron.configure({ hot: '192.168.0.105' })
    .useReactNative()
    .connect();

  // Add tron functionalily to console.log
  console.tron = tron;

  // uncomment this function for clear TimeLine Reactotron on all refresh app
  // tron.clear();
}
