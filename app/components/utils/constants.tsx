import { Dimensions, Platform } from 'react-native';
export const Messages = {
 
  logout_message: 'Are you sure you want to logout?',

};

export const PROJECTNAME = 'ReactNative Task';

export const EMAILREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORDREG = /^\S{3,}$/;
export const AlPHABETREG = /^[A-z_ -]+$/;
export const WHITESPACE = /^[^\s]+$/

export const PHONEREG = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
export const MOBILEREG = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const PINCODEREG = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export const screenWidth = Dimensions.get('window').width;
export const isLargeScreen = screenWidth >= 768;
export const screenHeight = Dimensions.get('window').height;
export const DeviceType = (Platform.OS === 'ios' ? 'iOS' : 'android')


export const Images = {

    introduction1: require('../../assets/images/introductionImages/1.jpg'),
    introduction2: require('../../assets/images/introductionImages/2.jpg'),
    introduction3: require('../../assets/images/introductionImages/3.jpg'),

}