import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ListRenderItemInfo,
  Text,
  Image,
  FlatList,
  ScrollView,
  View,
  TextInput,
  Button,
  ImageBackground,
  Keyboard,
  Alert,
  TouchableOpacity,
  Settings,
} from 'react-native';
import Colors from '../utils/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Constants from '../utils/constants';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as I18n from '../Locales/i18n';
import colors from '../utils/colors';
import * as Common from '../../components/utils/common';
import {setRouterValues} from '../../redux/Login/loginAction';
import {connect} from 'react-redux';

class Profile extends React.Component<any, any> {
  static contextType = NavigationContext;

  logout() {
    const actions = [
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          AsyncStorage.clear();
          this.props.setRouterValues({isUserLogin: false});
        },
      },
    ];
    Common.showAlertwithAction(
      Constants.PROJECTNAME,
      Constants.Messages.logout_message,
      actions,
    );
  }
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity style={{width:'80%',height:50,alignSelf:'center',
        backgroundColor:colors.orang,justifyContent:'center'}} onPress={() => this.logout()}>
          <Text style={{fontSize: responsiveScreenFontSize(2),alignSelf:'center'}}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  //loginReducer: state.login,
  return {
    loginReducer: state.login,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
    setRouterValues: (data) => dispatch(setRouterValues(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
