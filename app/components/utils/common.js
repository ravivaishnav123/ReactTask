import React from 'react';
import { Alert,Platform,Dimensions } from 'react-native';
import * as Constant from './constants';


export function showAlertWithDefaultTitle(message) {
  Alert.alert(
    Constant.PROJECTNAME,
    message,
    [
      { text: 'Ok', onPress: () => { } }
    ],
    { cancelable: false });
}


export function showAlertWithDefaultTitleForConfirmOrder(message) {
  Alert.alert(
    Constant.PROJECTNAME,
    message,
    [
      { text: 'OK', onPress: () => { } }
    ],
    { cancelable: false });
}

export function showAlert(title, message) {
  Alert.alert(
    title,
    message,
    [
      { text: 'OK', onPress: () => { } }
    ],
    { cancelable: false });
}
export function showAlertwithAction(title, message, actions) {
  Alert.alert(title, message, actions, { cancelable: false });
  
}


export function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&

    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

export function isIPhoneXSize(dim) {
  return dim.height == 812 || dim.width == 812;
}

export function isIPhoneXrSize(dim) {
  return dim.height == 896 || dim.width == 896;
}