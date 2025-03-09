import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { RouteList } from './src/utils/RouteList';
import { store } from './src/redux/store';
// ------------ SCREENS ------------
import HomeScreen from './src/screens/Home';
// import MyAccountScreen from './src/screens/MyAccount';
// import PasswordResetScreen from './src/screens/PasswordReset';
import LoginScreen from './src/screens/Login';
// import UserVerifyScreen from './src/screens/UserVerify';
// import SignUpScreen from './src/screens/Signup';
import StepsScreen from './src/screens/Steps';
import SavedsScreen from './src/screens/Saveds';
import WordsScreen from './src/screens/Words';
import CrosswordScreen from './src/screens/Crossword';
import MatchingScreen from './src/screens/Matching';
// ------------ SCREENS ------------

export type RootStackParamList = {
  MyAccount: undefined;
  Login: undefined;
  UserVerify: undefined;
  PasswordReset: undefined;
  Signup: undefined;
  Home: undefined;
  Steps: { categoryId: string, categoryTitle:string };
  Saveds: { categoryId: string, categoryTitle:string };
  Words: { categoryId: string, categoryTitle:string };
  Crossword: { categoryId: string, categoryTitle:string };
  Matching: { categoryId: string, categoryTitle:string }; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <StatusBar barStyle={'light-content'} />
        <Stack.Navigator
          initialRouteName={RouteList.home}
          screenOptions={{
            // tabBarShowLabel: false,
            headerShown: false,
          }}>
          {/* <Stack.Screen name={RouteList.myAccount} component={MyAccountScreen} /> */}
          <Stack.Screen name={RouteList.login} component={LoginScreen} />
          {/* <Stack.Screen name={RouteList.userVerify} component={UserVerifyScreen} />
          <Stack.Screen name={RouteList.passwordReset} component={PasswordResetScreen} />
          <Stack.Screen name={RouteList.signup} component={SignUpScreen} /> */}
          <Stack.Screen name={RouteList.home} component={HomeScreen} />
          <Stack.Screen name={RouteList.steps} component={StepsScreen} />
          <Stack.Screen name={RouteList.saveds} component={SavedsScreen} />
          <Stack.Screen name={RouteList.words} component={WordsScreen} />
          <Stack.Screen name={RouteList.crossword} component={CrosswordScreen} />
          <Stack.Screen name={RouteList.matching} component={MatchingScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}
export default App;
