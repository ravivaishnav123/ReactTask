
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Login from '../components/LoginModule/login.component';
import Intro from '../components/IntroScreen/Intro';

import Colors from '../components/utils/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
          backgroundColor: Colors.white,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf:'center',
          color: Colors.mediumgrey
        },
      }}>
         <Stack.Screen name={'Intro'} component={Intro} options={{headerShown:false}}
         />
      <Stack.Screen name={'Sign in'} component={Login} 
      options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
              {/* <MaterialCommunityIcons name='arrow-left' 
              size={30} style={{ color: Colors.orang, padding: 5 }}></MaterialCommunityIcons> */}
          </TouchableOpacity>
      ),
        headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name='arrow-left' size={30} style={{ color: Colors.orang, padding: 5 }}></MaterialCommunityIcons>
            </TouchableOpacity>
        )
    })} />

    </Stack.Navigator>
  );
}

export default function beforeRouter() {
  return (
    <NavigationContainer>{AppStackScreen()}</NavigationContainer>
  );
}


