
import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../components/utils/colors';
import { NavigationContainer, } from '@react-navigation/native';

import { createStackNavigator, } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Dashboard from '../components/DashboardModule/homeScreen.component';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Setting from '../components/DashboardModule/setting.component';
import DrawerContent from '../components/common/sideMenu';
import * as Constants from '../components/utils/constants';
import { createDrawerNavigator } from '@react-navigation/drawer';
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
                },
            }}>
            <Stack.Screen name={I18n.translate('Dashboard.Dashboard')} component={Dashboard}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <MaterialIcons name='menu' size={30} style={{ color: Colors.darkPrimaryColor, padding: 5 }}></MaterialIcons>
                        </TouchableOpacity>
                    )
                })} />
        </Stack.Navigator>
    );
}

//*** SETTING DRAWER NAVIGATION SCREEN ***//
function SettingNavigation() {
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
            <Stack.Screen name={I18n.translate('Setting.Setting')} component={Setting}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <MaterialIcons name='menu' size={30} style={{ color: Colors.darkPrimaryColor, padding: 5 }}></MaterialIcons>
                        </TouchableOpacity>
                    )
                })} />
        </Stack.Navigator>
    );
}


//*** DRAWER DASHBOARD SCREENS FOR CUSTOM DRAWER ***/
function DashboardDrawerNavigation() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitleAlign: 'center',
                headerStyle: {
                    backgroundColor: 'white',
                },
                headerTintColor: 'black',
                headerTitleStyle: {
                    fontWeight: 'bold',
                }
            }}>
            <Stack.Screen name={I18n.translate('Dashboard.Dashboard')} component={Dashboard}
                options={({ navigation }) => ({
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <MaterialIcons name='menu' size={30} style={{ color: Colors.darkPrimaryColor, padding: 5 }}></MaterialIcons>
                        </TouchableOpacity>
                    )
                })}
            />

            <Stack.Screen name={I18n.translate('Setting.Setting')} component={Setting}
                options={({ navigation }) => ({

                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <MaterialIcons name='menu' size={30} style={{ color: Colors.darkPrimaryColor, padding: 5 }}></MaterialIcons>
                        </TouchableOpacity>
                    )
                }
                )
                }
            />
        </Stack.Navigator>
    );
}

//**** WHEN IN APP SHOW ONLY TABBAR ****//
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let image;
                    if (route.name === I18n.translate('Dashboard.Dashboard')) {
                        image = focused === true ? <MaterialCommunityIcons name='home-outline' style={styles.active_icon} /> : <MaterialCommunityIcons name='home-outline' style={styles.inactive_icon} />
                    } else if (route.name === I18n.translate('Setting.Setting')) {
                        image = focused === true ? <MaterialCommunityIcons name='settings-outline' style={styles.active_icon} /> : <MaterialCommunityIcons name='settings-outline' style={styles.inactive_icon} />
                    }
                    return image;
                },
            })}

            tabBarOptions={{
                activeTintColor: Colors.darkPrimaryColor,
                inactiveTintColor: Colors.black,
                showLabel: true,//CAN FALSE FOR HIDE LABEL
                //TABBAR STYLE
                tabStyle: { backgroundColor: 'transparent' }
            }}>

            <Tab.Screen name={I18n.translate('Dashboard.Dashboard')} component={DashboardNavigation} />
            <Tab.Screen name={I18n.translate('Setting.Setting')} component={SettingNavigation} />

        </Tab.Navigator>
    );
}

//**** DRAWER NAVIGATION ****//
function DrawerNavigation() {
    return (

        <Drawer.Navigator
            drawerStyle={{
                // backgroundColor: '#c6cbef',
                //width: 240,
            }}
            drawerType={Constants.screenWidth >= 768 ? 'permanent' : 'front'}
            drawerContentOptions={{ activeBackgroundColor: Colors.darkPrimaryColor, activeTintColor: '#ffffff' }}>
            <Drawer.Screen name={I18n.translate('Dashboard.Dashboard')} component={DashboardNavigation}
            />
            <Drawer.Screen name={I18n.translate('Setting.Setting')} component={SettingNavigation} />
        </Drawer.Navigator>

        //*** Used For Custom Drawer ***/
        //   <Drawer.Navigator
        //     drawerStyle={{
        //       backgroundColor: '#c6cbef',
        //       //width: 240,
        //     }}
        //     drawerType={Constants.screenWidth >= 768 ? 'permanent' : 'front'}
        //     drawerContentOptions={{ activeBackgroundColor: '#5cbbff', activeTintColor: '#ffffff' }}
        //     drawerContent={(props) => <DrawerContent  {...props} />}>
        //     {
        //       <Drawer.Screen name="Main" component={DashboardDrawerNavigation} />
        //     }
        //   </Drawer.Navigator>
    );
}



export default function Router() {
    return (
        <NavigationContainer>{DrawerNavigation()}</NavigationContainer>
    );
}

const styles = StyleSheet.create({
    active_icon: {
        color: Colors.darkPrimaryColor,
        fontSize: 26
    },
    inactive_icon: {
        color: Colors.black,
        fontSize: 24

    }
})