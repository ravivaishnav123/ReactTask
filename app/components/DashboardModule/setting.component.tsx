import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, ScrollView, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Settings, AppRegistry } from 'react-native';
import Colors from '../utils/colors'
import { settingState } from "../../redux/Setting/settingTypes";
import * as Constants from '../utils/constants';
import * as Common from '../utils/common'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContext, useNavigation } from '@react-navigation/native';
import Modal from "react-native-modal";
import { setProfileValues, postProfileData, fetchChangePasswordApi } from "../../redux/Setting/settingAction";
import * as RNLocalize from "react-native-localize";
import { setRouterValues } from "../../redux/Login/loginAction";
import { connect } from 'react-redux';
import { AppState } from "../../redux/store";
import ActivityIndicator from '../common/ActivityIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import RNRestart from "react-native-restart";
import ImagePicker from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import * as I18n from '../Locales/i18n';
const options = {
    title: 'Select Avatar',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
var navigation = "";
export interface Props {

    // updateName?: (name: string) => void;
    // updateEmail?: (email: string) => void;
    // updatePhone?: (phone: string) => void;
    onLoginPress?: () => void;
    updateProfile?: () => void;
    navigateToRegister?: () => void;
}
interface State {
    email: string;
    name: string;
    phone: string;
    profile_pic?: string;
    showChangePasswordModal: boolean;
}

// const emailRef = React.createRef<TextInput>();
class Setting extends React.Component<any, any> {
    static contextType = NavigationContext;


    // constructor(props: Props) {
    //     super(props)

    state = {
        profile_pic: Constants.Images.introduction1,
        username: "Test",
        appLanguage: "en"
    }
    // }

    componentDidMount() {
        this.setNavigationHeader()
        this.getDefaulLang()
        RNLocalize.addEventListener("change", this.handleLocalizationChange);
        this.getUserDetail()
    }

    getDefaulLang() {
        AsyncStorage.getItem("appLanguage")
            .then(appLanguage => {
                console.log("app language", appLanguage)
                this.setState({ appLanguage: appLanguage });
                I18n.setI18nConfig(appLanguage)
            })
            .catch(error => {
                console.error(error);
            });
    }



    componentWillUnmount() {
        RNLocalize.removeEventListener("change", this.handleLocalizationChange);
    }

    handleLocalizationChange = () => {
        I18n.setI18nConfig(this.state.appLanguage);
        this.forceUpdate();
    };

    setNavigationHeader() {
        const navigation = this.context;
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => this.logout()}>
                    <MaterialCommunityIcons name='logout' size={30} style={{ color: Colors.white, padding: 5 }}></MaterialCommunityIcons>
                    {/* <Text style={{ color: 'white' }}>Logout</Text> */}
                </TouchableOpacity>
            )
        })
    }
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
                    this.logOut()
                }
            },

        ];
        Common.showAlertwithAction(Constants.PROJECTNAME, Constants.Messages.logout_message, actions);

    }
    logOut() {
        AsyncStorage.clear()
        // this.props.setLoginEmpty();
        // this.props.setForgotPasswordEmpty();
        // this.props.setRegisterEmpty();
        this.props.setRouterValues({ 'isUserLogin': false })

    }
    getUserDetail = async () => {
        try {
            const value = await AsyncStorage.getItem('userInfo')
            var obj = JSON.parse(value);
            if (obj != null) {
                this.props.setProfileValues({ 'name': obj.full_name })
                this.props.setProfileValues({ 'email': obj.email })
                this.props.setProfileValues({ 'user_id': (obj.id).toString() })
                //this.props.setProfileValues('profile_pic', obj.profile_photo)
                this.props.setProfileValues({ 'phone': obj.mobile })
            }
        } catch (e) {
            console.log(e)

        }
    }
    validateProfile() {
        var msg = ""
        if (this.props.settingReducer.name.trim() == "") {
            msg = Constants.Messages.Name
        } else if (this.props.settingReducer.phone.trim() == "") {
            msg = Constants.Messages.Mobile
        }
        if (msg === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(msg);
        return false;
    }

    updateProfile() {
        if (this.validateProfile()) {
            this.props.postProfileData({
                email: this.props.settingReducer.email,
                full_name: this.props.settingReducer.name,
                mobile: this.props.settingReducer.phone
            })
        }
    }

    getUpdateProfileResponse(response: settingState) {

        if (response.isLoading === false && response.error === false && response.isProfileUpdated) {
            Common.showAlertWithDefaultTitle(response.message);
            var userObj = JSON.stringify(response.profileResponse)
            AsyncStorage.setItem('userInfo', userObj)
            this.props.setProfileValues('name', userObj.full_name)
            this.props.setProfileValues('phone', userObj.phone)

            // this.props.setSideMenuValues('name', response.profileResponse.name)
            // this.props.setSideMenuValues('email', response.profileResponse.email)
            this.props.setProfileValues({ 'isProfileUpdated': false })
        }
        else if (response.isLoading === false && response.error === false && response.isPasswordUpdated) {
            const actions = [
                {
                    text: 'Ok',
                    onPress: () => {
                        this.props.setProfileValues({ 'showChangePasswordModal': false })
                    }
                }
            ];
            Common.showAlertwithAction(Constants.PROJECTNAME, response.message, actions);
            this.props.setProfileValues({ 'isPasswordUpdated': false })

        }
        else if (response.errorMsg !== "" && response.errorMsg != undefined) {
            this.props.setProfileValues({ 'errorMsg': "" })
            Common.showAlertWithDefaultTitle(response.errorMsg);
        }
    }

    validatePassword() {
        let message = "";
        const preg = Constants.PASSWORDREG;
        if (this.props.settingReducer.old_password === "") {
            message = Constants.Messages.OldPassword;
        } else if (this.props.settingReducer.password === "") {
            message = Constants.Messages.NewPassword;
        } else if (!preg.test(this.props.settingReducer.password)) {
            message = Constants.Messages.SpaceInPassword;
        } else if (this.props.settingReducer.password.length < 6) {
            message = Constants.Messages.PasswordLength
        } else if (this.props.settingReducer.confirm_password === "") {
            message = Constants.Messages.CPassword;
        } else if (this.props.settingReducer.confirm_password !== this.props.settingReducer.password) {
            message = Constants.Messages.PasswordNotMatch;
        }
        if (message === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(message);
        return false;
    }

    onChangePassword() {
        if (this.validatePassword()) {
            this.props.fetchChangePasswordApi({
                password: this.props.settingReducer.confirm_password,
                old_password: this.props.settingReducer.password,
                user_id: this.props.settingReducer.user_id
            });
        }
    }

    renderUserPhotoName() {
        return (
            <View style={styles.photoView}>
                <Image style={styles.imageView}
                    // defaultSource={Constants.Images.defaultProfilePic}
                    source={this.state.profile_pic}
                    resizeMode={'cover'}
                />
                <TouchableOpacity
                    onPress={() => this.openImagePicker()}>
                    <IoniconsIcon size={25} name='ios-camera' style={{ position: 'absolute', bottom: -5, alignSelf: 'center' }} color={Colors.darkPrimaryColor} />
                </TouchableOpacity>
            </View>
        )
    }

    renderSubmitView() {
        return (
            <TouchableWithoutFeedback style={{ flex: 0 }}
                onPress={() => this.updateProfile()}>
                <View style={styles.submitView}>
                    <Text style={styles.submitText}>SUBMIT</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    openImagePicker() {
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                const source = { uri: response.uri };
                this.setState({ 'profile_pic': source })
                // this.props.setProfileValues('profile_pic', source)
            }
        });
    }

    handleLanguageChange = lang => {
        AsyncStorage.setItem('appLanguage', lang)
        this.setState({ appLanguage: lang })
        I18n.setI18nConfig(lang);
        RNRestart.Restart()
        this.forceUpdate();
    }

    renderChangepasswordButton() {
        return (
            <TouchableWithoutFeedback onPress={() => this.props.setProfileValues({ 'showChangePasswordModal': true })} >
                <View style={styles.changePasswordButtonView}>

                    <View style={{ flex: 0.9 }}>
                        <Text style={{ fontSize: 18 }}>{I18n.translate('Setting.Change Password')}</Text>
                    </View>
                    <View style={{ flex: 0.1, alignItems: 'flex-end' }}>
                        <IoniconsIcon size={22} name='ios-arrow-forward' />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    renderChangepasswordModal() {
        return (
            <Modal isVisible={this.props.settingReducer.showChangePasswordModal}
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center', }}
                onRequestClose={() => {
                    console.log("Modal has been closed.");

                }}
            >
                <KeyboardAwareScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', borderRadius: 10 }}>
                    <View style={styles.changePasswordView}>

                        <View style={styles.changePasswordView2}>


                            <Text style={styles.changePasswordHeader}>{I18n.translate('Setting.Change Password')}</Text>
                            <Text style={styles.textHeader}>{I18n.translate('Setting.Enter Old Password')}</Text>

                            <View style={styles.height40}>
                                <TextInput
                                    style={styles.changePasswordInput}
                                    placeholderTextColor={Colors.black}
                                    placeholder=""
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={text => this.props.setProfileValues({ 'old_password': text })}
                                    value={this.props.settingReducer.old_password}
                                // onSubmitEditing={(event) => {
                                //     this.refs.password.focus();
                                // }}
                                >
                                </TextInput>
                            </View>

                            <Text style={styles.textHeader}>{I18n.translate('Setting.Enter New password')}</Text>
                            <View style={styles.height40}>
                                <TextInput
                                    ref='password'
                                    style={styles.changePasswordInput}
                                    placeholderTextColor={Colors.black}
                                    placeholder=""
                                    secureTextEntry={true}
                                    underlineColorAndroid='transparent'
                                    onChangeText={text => this.props.setProfileValues({ 'password': text })}
                                    value={this.props.settingReducer.password}
                                // onSubmitEditing={(event) => {
                                //     this.refs.confirm_password.focus();
                                // }}
                                >
                                </TextInput>
                            </View>

                            <Text style={styles.textHeader}>{I18n.translate('Setting.Enter Confirm Password')}</Text>
                            <View style={styles.height40}>
                                <TextInput
                                    ref='confirm_password'
                                    style={styles.changePasswordInput}
                                    placeholderTextColor={Colors.black}
                                    placeholder=""
                                    secureTextEntry={true}
                                    returnKeyType="done"
                                    underlineColorAndroid='transparent'
                                    onChangeText={text => this.props.setProfileValues({ 'confirm_password': text })}
                                    value={this.props.settingReducer.confirm_password}
                                >
                                </TextInput>
                            </View>



                            <View
                                style={styles.bottomButtonView}  >
                                <TouchableOpacity activeOpacity={0.8} onPress={() => this.onChangePassword()}  >
                                    <View style={styles.buttonShape}>
                                        <Text style={styles.buttonText}>{I18n.translate('Setting.Save')}</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => this.props.setProfileValues({ 'showChangePasswordModal': false })}
                                >
                                    <View
                                        style={[styles.buttonShape, { backgroundColor: "#bfbfbf", marginLeft: 7 }]}>
                                        <Text style={styles.buttonText}>{I18n.translate('Setting.Cancel')}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <ActivityIndicator isLoading={this.props.settingReducer.isLoading} />
            </Modal>
        )
    }

    render() {
        this.getUpdateProfileResponse(this.props.settingReducer)
        return (
            <ScrollView>
                <View style={{ flex: 1, backgroundColor: Colors.white }} >

                    <SafeAreaView >
                        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                            <View style={styles.margin50}>

                                {this.renderUserPhotoName()}

                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>{I18n.translate('Setting.Email')}</Text>
                                    <TextInput
                                        ref='email'
                                        style={styles.textInputValue}
                                        editable={false}
                                        returnKeyType="next"
                                        autoCapitalize="none"
                                        keyboardType='email-address'
                                        value={this.props.settingReducer.email}
                                        onChangeText={(text) => this.props.setProfileValues({ 'email': text })}
                                    // onSubmitEditing={() => this.refs.phone.focus()}
                                    />
                                    <View style={styles.dividerLine}
                                    />
                                </View>
                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>{I18n.translate('Setting.Name')}</Text>
                                    <TextInput
                                        style={styles.textInputValue}
                                        autoCapitalize={'words'}
                                        placeholderTextColor={'black'}
                                        returnKeyType="next"
                                        keyboardType='default'
                                        value={this.props.settingReducer.name}
                                        onChangeText={(text) => this.props.setProfileValues({ 'name': text })}
                                    // onSubmitEditing={() => this.refs.phone.focus()}
                                    />
                                    <View style={styles.dividerLine}
                                    />
                                </View>

                                <View style={styles.marginBottom15}>
                                    <Text style={styles.textValue}>{I18n.translate('Setting.Phone')}</Text>
                                    <TextInput
                                        ref='phone'
                                        style={styles.textInputValue}
                                        returnKeyType="done"
                                        autoCapitalize="none"
                                        keyboardType='phone-pad'
                                        value={this.props.settingReducer.phone}
                                        onChangeText={(text) => this.props.setProfileValues({ 'phone': text })}
                                    />
                                    <View style={styles.dividerLine} />

                                    {this.renderChangepasswordButton()}
                                    {this.renderSubmitView()}
                                    {this.renderChangepasswordModal()}

                                    <Text style={{ marginTop: 20 }}>{I18n.translate('login.welcome', { name: this.state.username })}</Text>
                                    <Picker
                                        selectedValue={this.state.appLanguage}
                                        onValueChange={appLanguage => {
                                            this.handleLanguageChange(appLanguage)
                                        }}
                                    >
                                        <Picker.Item label="Select Language" value="sl" />
                                        {/* <Picker.Item label="Arabic" value="ar" /> */}
                                        <Picker.Item label="English" value="en" />
                                        <Picker.Item label="Dutch" value="nl" />
                                        <Picker.Item label="Thai" value="th" />
                                        <Picker.Item label="Japanese" value="ja" />

                                    </Picker>
                                </View>


                            </View>

                        </TouchableWithoutFeedback>

                    </SafeAreaView>
                    <ActivityIndicator isLoading={this.props.settingReducer.isLoading} />
                </View>

            </ScrollView>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: responsiveWidth(3),
        backgroundColor: 'black'
    },
    changePasswordButtonView: {
        flexDirection: 'row',
        marginTop: responsiveWidth(5)
    },
    margin50: {
        margin: responsiveWidth(15),
        marginTop: responsiveWidth(5)
    },
    marginBottom15: {
        marginBottom: responsiveWidth(5)
    },
    textValue: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.5),
    },
    textInputValue: {
        marginTop: 10,
        fontSize: responsiveFontSize(1.8),
        color: Colors.black,
    },
    dividerLine: {
        flex: 0,
        height: 1.0,
        backgroundColor: Colors.black,
        marginTop: 5
    },
    // *** RENDER PHOTO VIEW STYLE***//
    photoView: {
        marginTop: responsiveWidth(5),
        marginBottom: responsiveWidth(5),
        alignItems: 'center'
    },
    imageView: {
        borderWidth: 2,
        borderColor: 'white',
        width: responsiveWidth(30),
        height: responsiveWidth(30),
        borderRadius: responsiveWidth(15),
    },
    // *** RENDER SUBMIT VIEW STYLE***//
    submitView: {
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: responsiveWidth(6),

        width: (responsiveWidth(100) - 80),
        height: responsiveWidth(12),
        borderWidth: 1.0,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        backgroundColor: Colors.darkPrimaryColor
    },
    submitText: {
        flex: 0,
        fontSize: responsiveFontSize(2.0),
        color: 'white'
    },
    // *** RENDER CHANGE PASSWORD MODAL STYLE***//
    changePasswordView: {
        // flex: 1,
        // justifyContent: 'center',
    },
    changePasswordView2: {
        backgroundColor: Colors.white,
        justifyContent: 'center',
        padding: responsiveWidth(3)
    },
    changePasswordHeader: {
        color: Colors.darkPrimaryColor,
        fontSize: responsiveFontSize(2.5),
        textAlign: 'center'
    },
    changePasswordInput: {
        color: Colors.black,
        fontSize: responsiveFontSize(2),
        borderWidth: 1,
        padding: responsiveWidth(3),
        flex: 1
    },
    textHeader: {
        color: Colors.black,
        fontSize: responsiveFontSize(2),
        paddingBottom: 5,
        marginTop: responsiveWidth(5)
    },
    height40: {
        height: responsiveHeight(6)
    },
    bottomButtonView: {
        justifyContent: "space-between",
        flexDirection: 'row',
        marginTop: responsiveWidth(4)
    },
    buttonShape: {
        height: responsiveHeight(5.5),
        padding: 5,
        borderRadius: 22,
        backgroundColor: Colors.black,
        justifyContent: "center",
        alignItems: "center",
        width: responsiveWidth(30),
    },
    buttonText: {
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
        color: Colors.white,
    }
})


const mapStateToProps = (state: AppState) => ({
    settingReducer: state.setting,
});

export default connect(
    mapStateToProps,
    { setProfileValues, postProfileData, fetchChangePasswordApi, setRouterValues }
)(Setting);
// export default Setting
