import React from 'react';
import { StyleSheet, SafeAreaView, Text, FlatList, Image, ScrollView, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Settings, AppRegistry } from 'react-native';
import Colors from '../utils/colors'
import { settingState } from "../../redux/Setting/settingTypes";
import * as Constants from '../utils/constants';
import * as Common from '../utils/common'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Modal from "react-native-modal";
import { setProfileValues, postProfileData, fetchChangePasswordApi } from "../../redux/Setting/settingAction";
import { setRouterValues } from "../../redux/Login/loginAction";
import { connect } from 'react-redux';
import { AppState } from "../../redux/store";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActivityIndicator from './ActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ImagePicker from 'react-native-image-picker';

const Data = [
  {
    name: 'Home',
    icon_name: 'home-outline'
  },
  {
    name: 'Setting',
    icon_name: 'settings-outline'
  },
]
export interface Props {
  name: string;
  email?: number;
}



const DrawerContent: React.FC<Props> = (props) => {
  const { navigate } = useNavigation();


  const onMenuPressed = (index: number) => {

    // this.props.setSideMenuValues('selectedIndex', index)
    switch (index) {
      case 0: navigate("Dashboard");
        break;
      case 1: navigate("Setting");
        break;
      default:
        break;
    }
    // navigation.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ flex: 1 }}>

        <View style={{ alignItems: 'center' }}>
          <MaterialIcons name='account-circle' size={60} color={'white'} />
          <Text style={{
            marginTop: 10,
            color: 'white',
            fontSize: responsiveFontSize(2.3),
          }}>{"Name"}</Text>
          <Text style={{
            marginTop: 0,
            color: 'white',
            fontSize: responsiveFontSize(2.1),
          }}>{"Email"}</Text>

        </View>

        <FlatList
          automaticallyAdjustContentInsets={false}
          style={{ flex: 1, margin: 10, }}
          data={Data}
          keyExtractor={index => index}
          renderItem={({ item, index }) =>
            <TouchableOpacity style={{ flex: 0 }}
              onPress={() => onMenuPressed(index)}
            >
              <View style={{ flex: 0, }}>
                <View style={{ flex: 0, flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name={item.icon_name} size={22}
                  //color={this.props.sideMenu.selectedIndex == index ? Colors.darkPrimaryColor : 'white'}
                  />
                  <Text style={{
                    flex: 1,
                    margin: 12,
                    marginLeft: 10,
                    lineHeight: responsiveFontSize(3.3),
                    fontSize: responsiveFontSize(1.9),
                    color: 'white'
                    // color: this.props.sideMenu.selectedIndex == index ? Colors.darkPrimaryColor : 'white'

                  }}>{item.name}</Text>
                </View>
                <View style={{
                  marginLeft: 10,
                  height: 1,
                  borderBottomColor: 'rgba(92, 92, 92, 0.9)',
                  borderBottomWidth: 1
                }} />
              </View>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  )
};

export default DrawerContent;