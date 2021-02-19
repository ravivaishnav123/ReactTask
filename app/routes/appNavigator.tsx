
import React, { Component } from 'react';
import Login from '../components/LoginModule/login.component';
import Register from '../components/LoginModule/register.component';
import forgotPassword from '../components/LoginModule/forgotPassword.component';
import Colors from '../components/utils/colors';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as I18n from '../components/Locales/i18n';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
function AppStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name={I18n.translate('Login.Login')} component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name="ForgotPassword" component={forgotPassword}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function beforeRouter() {
  return (
    <NavigationContainer>{AppStackScreen()}</NavigationContainer>
  );
}

 
