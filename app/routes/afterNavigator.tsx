import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../components/utils/colors';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Dashboard from '../components/DashboardModule/homeScreen.component';
import Profile from '../components/Account/Profile';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerContent from '../components/common/sideMenu';
import * as Constants from '../components/utils/constants';
import {createDrawerNavigator} from '@react-navigation/drawer';
import * as I18n from '../components/Locales/i18n';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Drawer = createDrawerNavigator();

function DashboardNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.black,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          alignSelf: 'center',
        },
      }}>
      <Stack.Screen
        name={'Home'}
        component={Dashboard}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

//*** SETTING DRAWER NAVIGATION SCREEN ***//
function AccountNavigation() {
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

<Stack.Screen
        name={'Profile'}
        component={Profile}
        options={{headerShown: false}}
      />
      </Stack.Navigator>
  );
}

//**** WHEN IN APP SHOW ONLY TABBAR ****//
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let image;
          if (route.name === 'Home') {
            image =
              focused === true ? (
                <MaterialCommunityIcons
                  name="home-outline"
                  style={styles.active_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="home-outline"
                  style={styles.inactive_icon}
                />
              );
          } else if (route.name === 'Booking') {
            image =
              focused === true ? (
                <MaterialCommunityIcons
                  name="bookmark"
                  style={styles.active_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="bookmark"
                  style={styles.inactive_icon}
                />
              );
          } else if (route.name === 'Message') {
            image =
              focused === true ? (
                <MaterialCommunityIcons
                  name="email"
                  style={styles.active_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="email"
                  style={styles.inactive_icon}
                />
              );
          } else if (route.name === 'News') {
            image =
              focused === true ? (
                <MaterialCommunityIcons
                  name="email-newsletter"
                  style={styles.active_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="email-newsletter"
                  style={styles.inactive_icon}
                />
              );
          } else if (route.name === 'Account') {
            image =
              focused === true ? (
                <MaterialCommunityIcons
                  name="account-circle"
                  style={styles.active_icon}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-circle"
                  style={styles.inactive_icon}
                />
              );
          }
          return image;
        },
      })}
      tabBarOptions={{
        activeTintColor: Colors.darkPrimaryColor,
        inactiveTintColor: Colors.black,
        showLabel: true, //CAN FALSE FOR HIDE LABEL
        //TABBAR STYLE
        tabStyle: {backgroundColor: 'transparent'},
      }}>
      <Tab.Screen name={'Home'} component={DashboardNavigation} />
      <Tab.Screen name={'Booking'} component={DashboardNavigation} />
      <Tab.Screen name={'Message'} component={DashboardNavigation} />
      <Tab.Screen name={'News'} component={DashboardNavigation} />
      <Tab.Screen name={'Account'} component={AccountNavigation} />
    </Tab.Navigator>
  );
}

export default function Router() {
  return <NavigationContainer>{TabNavigator()}</NavigationContainer>;
}

const styles = StyleSheet.create({
  active_icon: {
    color: Colors.orang,
    fontSize: 26,
  },
  inactive_icon: {
    color: Colors.mediumgrey,
    fontSize: 24,
  },
});
