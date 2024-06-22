import * as React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home.js';
import MyAccountScreen from './src/screens/MyAccount.js';
import PasswordResetScreen from './src/screens/PasswordReset.js';
import LoginScreen from './src/screens/Login.js';
import UserVerifyScreen from './src/screens/UserVerify.js';
import SignUpScreen from './src/screens/Signup.js';
import StepsScreen from './src/screens/Steps.js';
import SavedsScreen from './src/screens/Saveds.js';
import WordsScreen from './src/screens/Words.js';
import CrosswordScreen from './src/screens/Crossword.js';
import MatchingScreen from './src/screens/Matching.js';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle={'light-content'} />
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
        }}>
        <Stack.Screen name="MyAccount" component={MyAccountScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="UserVerify" component={UserVerifyScreen} />
        <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
        <Stack.Screen name="Signup" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Steps" component={StepsScreen} />
        <Stack.Screen name="Saveds" component={SavedsScreen} />
        <Stack.Screen name="Words" component={WordsScreen} />
        <Stack.Screen name="Crossword" component={CrosswordScreen} />
        <Stack.Screen name="Matching" component={MatchingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
