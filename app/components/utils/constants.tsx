import { Dimensions, Platform } from 'react-native';
export const Messages = {
    server_error: 'Something went wrong, please try again.',
    no_internet: 'No internet, please check your internet.',
    logout_message: 'Are you sure you want to logout?',
    openSettingForLocation: 'Please allow location access from your setting.',
    openSetting: 'Please allow camera or photo library access from your setting.',
    Card_Detail: 'Please enter card details.',

    Email: 'Please enter email.',
    ValidEmail: 'Please enter valid email.',

    OTP: 'Please enter otp',
    Password: 'Please enter password.',
    SpaceInPassword: 'Password does not allow space.',
    Name: 'Please enter name.',
    Address: 'Please enter address.',
    Mobile: 'Please enter mobile number.',
    City: 'Please enter city.',
    State: 'Please enter state.',
    Country: 'Please enter country.',
    DOB: 'Please Select DOB.',
    Pincode: 'Please enter pincode.',
    InvalidPincode: 'Please enter valid pincode',
    CPassword: 'Please enter confirm password.',
    OldPassword:'Please enter old password.',
    NewPassword:'Please enter new password.',
    PasswordLength: 'Password should have at least 6 characters.',
    PasswordNotMatch: 'Confirm password not match with password.',
    TermCondition: 'Please check Terms & Condition.',

    metricType: 'Please select metric type.',
    searchMessage: 'Please enter search keywords.',
    CameraAssess: 'Open setting for camera asscess permission.',

    PhoneNumber: 'Phone number must be have 9 to 13 digite.',
    InValidPhoneNumber: 'Invalid Phone number.',
    InValidMobileNumber: 'Invalid Mobile number.',
    InValidLandlineNumber: 'Invalid Landline number.',

    RegisterSuccess: 'You are successfully registered.',
    LoginSuccess: "You are successfully logged in.",
    PasswordChangeSuccess: "Password changed successfully.",
    ForgotSuccessMessage: "We have sent new password on your email, Please check your email."

};

export const PROJECTNAME = 'ReactNative Template';

export const EMAILREG = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const PASSWORDREG = /^\S{3,}$/;
export const AlPHABETREG = /^[A-z_ -]+$/;
export const WHITESPACE = /^[^\s]+$/

export const PHONEREG = /^\s*(?:\+?(\d{1,3}))?[- (]*(\d{3})[- )]*(\d{3})[- ]*(\d{4})(?: *[x/#]{1}(\d+))?\s*$/
export const MOBILEREG = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
export const PINCODEREG = /(^\d{5}$)|(^\d{5}-\d{4}$)/;

export const screenWidth = Dimensions.get('window').width;
export const isLargeScreen = screenWidth >= 768;
export const screenHeight =Dimensions.get('window').height;
export const GOOGLEKEY = "AIzaSyBBWsEojxUgOTgfkJBCxowW0iKlczCyrU8"
export const GOOGLEMAPURL = 'https://maps.googleapis.com/maps/api/place/details/json';
export const DeviceType = (Platform.OS === 'ios' ? 'iOS' : 'android')

// API METHODS NAME //
export const BASE_URL = 'https://api-daao-dev.24livehost.com/misc/v1/'
// export const BASE_URL = 'http://61.12.67.132:8080/apisimulator/mockapi/reactnativetemplate/';
export const ApiMethods = {
    login: 'users/login',
    register: 'users/register',
    forgot: 'users/forgot',
    changePassword:'users/change-password',
    userProfile:'users/profile',
    currencyConvert: '/currency/conversion-ratio',
}

export const Images = {

    introduction1:require('../../assets/images/introductionImages/0.jpg'),
    introduction2:require('../../assets/images/introductionImages/1.jpg'),
    introduction3:require('../../assets/images/introductionImages/2.jpg'),
    appLogo:require('../../assets/images/introductionImages/appLogo.jpg'),
   
}