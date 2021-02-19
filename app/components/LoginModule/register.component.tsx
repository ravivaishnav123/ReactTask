import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, TextInput, Alert } from 'react-native';
import Colors from '../utils/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import * as Constant from '../utils/constants';
import * as Common from '../utils/common'
import { setRegisterValues ,setEmpty, userRequest, userRegisterAction} from "../../redux/Register/registerAction";
import AsyncStorage from '@react-native-community/async-storage';
// import { AppState } from "../../redux/store";
import { registerState } from "../../redux/Register/registerType";
import { NavigationContext } from '@react-navigation/native';
import { connect } from 'react-redux';
import ActivityIndicator from '../common/ActivityIndicator';
// const navigation = useNavigation();
const phoneRef = React.createRef<TextInput>(null);
const emailRef = React.createRef<TextInput>(null);
const passwordRef = React.createRef<TextInput>(null);
const confirmPasswordRef = React.createRef<TextInput>(null);

import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import ErrorMessage from '../common/ErrorMessage'
import { Formik } from 'formik'
import * as yup from 'yup';
import * as I18n from '../Locales/i18n';
const validationSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .label('FullName')
        .required(),
    email: yup
        .string()
        .label('Email')
        .email()
        .required(),
    mobile: yup
        .string()
        .label('Mobile')
        .required()
        .max(10, 'Please enter valid number'),
    password: yup
        .string()
        .label('Password')
        .required()
        .min(2, 'Seems a bit short...')
        .max(10, 'We prefer insecure system, try a shorter password.'),
    confirmPassword: yup
        .string()
        .label('confirmPassword')
        .required()
        .test('passwords-match', 'Passwords must match.', function (value) {
            return this.parent.password === value;
        }),
});

class Register extends React.Component<any, any> {

    static contextType = NavigationContext;
    //*** Set Values using hooks ***/
    // const [fullName, setUserName] = React.useState(props.fullName);
    // const [mobileNumber, setMobileNumber] = React.useState(props.mobileNumber);
    // const [email, setEmail] = React.useState(props.email);
    // const [password, setPassword] = React.useState(props.password);
    // const [confirmPassword, setConfirmPassword] = React.useState(props.confirmPassword);

    navigateToLogin() {
        const navigation = this.context;
        navigation.goBack()
    }

    componentDidMount() {
        this.getDefaulLang()
      }
    
    
      getDefaulLang() {
        AsyncStorage.getItem("appLanguage")
          .then(appLanguage => {
            console.log("app language", appLanguage)
            I18n.setI18nConfig(appLanguage)
            this.forceUpdate()
          })
          .catch(error => {
            console.error(error);
          });
      }


    getRegisterResponse(response: registerState) {
         console.log('respo',response)
        const navigation = this.context;
        if (response.isLoading === false && response.error === false && (response.hasData)) {
            const actions = [
                {
                    text: 'Yes',
                    onPress: () => {
                        //navigation.goBack()
                        
                        this.props.setEmpty()

                        console.log('last',this.props)
                    }
                },
            ];
            Common.showAlertwithAction(Constant.PROJECTNAME, response.message, actions);
            this.props.setRegisterValues({ "hasData": false })
        }
        else if (response.errorMsg !== "") {
            Common.showAlertWithDefaultTitle(response.errorMsg);
            this.props.setRegisterValues({ 'errorMsg': "" })
        }
    }

    handleSubmit = values => {
       // this.props.postRegisterData(values)
        this.props.userRegisterAction({name:'raj'})
        // DEMO API IS NOT WORKING //
        //this.props.setRegisterValues({ "hasData": false })
        // this.props.setRouterValues({ "isUserLogin": true })
       //  this.props.setLoginValues({ 'isLoggedIn': false })

    }

    render() {
     this.getRegisterResponse(this.props.registerReducer)
        return (

            <ScrollView style={{ backgroundColor: Colors.black }} >
                <Formik
                    initialValues={{ name: 'fdf', email: 'f@gmail.com', password: '1235', 
                    confirmPassword: '1235', mobile: '654654' }}
                    onSubmit={values => { this.handleSubmit(values) }}
                    validationSchema={validationSchema}
                >
                    {({ handleChange, handleBlur, handleSubmit, isValid, isSubmitting, values, errors }) => (
                        <View style={{ backgroundColor: Colors.black }}>

                            <View style={styles.container}>
                                <Text style={styles.textInputHeader}>{I18n.translate('Register.Full Name')}</Text>
                                <TextInput
                                    style={styles.textInputValue}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    value={values.name}
                                    placeholderTextColor={Colors.white}
                                    placeholder={I18n.translate('Register.Enter Your Name')}
                                    onSubmitEditing={(event) => {
                                        phoneRef.current.focus();
                                    }}
                                />
                                <View style={styles.divider_line}></View>
                                <ErrorMessage errorValue={errors.name} />

                                <View style={{ marginTop: 15 }}>
                                    <Text style={styles.textInputHeader}>{I18n.translate('Register.Phone')}</Text>
                                    <TextInput
                                        ref={phoneRef}
                                        style={styles.textInputValue}
                                        keyboardType="numeric"
                                        onChangeText={handleChange('mobile')}
                                        onBlur={handleBlur('mobile')}
                                        value={values.mobile}
                                        placeholderTextColor={Colors.white}
                                        //maxLength={10}
                                        placeholder={I18n.translate('Register.Enter Your Mobile Number')}
                                        onSubmitEditing={(event) => {
                                            emailRef.current.focus();
                                        }}
                                    />
                                    <View style={styles.divider_line}></View>
                                    <ErrorMessage errorValue={errors.mobile} />
                                </View>

                                <View style={styles.marginTop15}>
                                    <Text style={styles.textInputHeader}>{I18n.translate('Register.Email')}</Text>
                                    <TextInput
                                        ref={emailRef}
                                        style={styles.textInputValue}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        autoCapitalize='none'
                                        keyboardType='email-address'
                                        placeholderTextColor={Colors.white}
                                        placeholder= {I18n.translate('Register.Enter Your Email')}
                                        onSubmitEditing={(event) => {
                                            passwordRef.current.focus();
                                        }}
                                    />
                                    <View style={styles.divider_line}></View>
                                    <ErrorMessage errorValue={errors.email} />
                                </View>

                                <View style={styles.marginTop15}>
                                    <Text style={styles.textInputHeader}>{I18n.translate('Register.Password')}</Text>
                                    <TextInput
                                        ref={passwordRef}
                                        style={styles.textInputValue}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                        placeholderTextColor={Colors.white}
                                        placeholder="********"
                                        secureTextEntry={true}
                                        onSubmitEditing={(event) => {
                                            confirmPasswordRef.current.focus();
                                        }}
                                    />
                                    <View style={styles.divider_line}></View>
                                    <ErrorMessage errorValue={errors.password} />
                                </View>

                                <View style={{ marginTop: 15 }}>
                                    <Text style={styles.textInputHeader}>{I18n.translate('Register.Confirm Password')}</Text>
                                    <TextInput
                                        ref={confirmPasswordRef}
                                        style={styles.textInputValue}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                        placeholderTextColor={Colors.white}
                                        secureTextEntry={true}
                                        placeholder="********"
                                        returnKeyType='done'
                                    />
                                    <View style={styles.divider_line}></View>
                                    <ErrorMessage errorValue={errors.confirmPassword} />
                                </View>

                                <View style={styles.submitView}>
                                    <FormButton
                                        buttonType='outline'
                                        onPress={handleSubmit}
                                        title={I18n.translate('Register.Register')}
                                        buttonColor={Colors.white}
                                        buttonBackgroundColor={Colors.darkPrimaryColor}
                                        loading={isSubmitting}
                                    // disabled={!isValid}
                                    />
                                </View>

                                <View style={styles.bottomView}>
                                    <Text style={styles.haveAccountText}>{I18n.translate('Register.HAVE AN ACCOUNT?')}</Text>
                                    <Text style={styles.signUpText} onPress={() => this.navigateToLogin()}>{I18n.translate('Register.Login')}</Text>
                                </View>
                            </View>
                            <ActivityIndicator isLoading={this.props.registerReducer.isLoading} />
                        </View>
                    )}
                </Formik>
            </ScrollView>
        );
    }
}

// styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.black,
        padding: 20
    },
    textInputValue: {
        color: Colors.white,
        padding: 5,
    },
    textInputHeader: {
        color: Colors.white,
        padding: 5,
        fontSize: responsiveFontSize(2.5),
    },
    haveAccountText: {
        color: Colors.white,
        alignSelf: 'center',
        padding: 3,
        textAlign: 'center',
    },
    signUpText: {
        color: Colors.darkPrimaryColor,
        alignSelf: 'center',
        padding: 3,
        fontSize: responsiveFontSize(2),
        fontWeight: '600',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    divider_line: {
        borderWidth: 0.5,
        borderRadius: 1,
        marginBottom: 10,
        marginTop: 10,
        borderColor: Colors.white
    },
    bottomView: {
        flex: 1,
        marginTop: 30
    },
    marginTop15: {
        marginTop: 15
    },
    submitView: {
        alignSelf: 'center',
        marginTop: 30,
        // borderRadius: responsiveWidth(6),
        // width: (responsiveScreenWidth(100) - 80),
        // height: responsiveWidth(12),
        // borderWidth: 1.0,
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderColor: 'white',
        // backgroundColor: Colors.darkPrimaryColor
    },
    submitText: {
        flex: 0,
        fontSize: responsiveFontSize(2.0),
        color: 'white'
    },
});




const mapStateToProps = (state) => ({
    registerReducer: state.register,
});

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        userRegisterAction: (data) => dispatch(userRegisterAction(data)),
        setRegisterValues : (data) => dispatch(setRegisterValues(data)),
        setEmpty:() => dispatch(setEmpty()),
    };
  };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
// export default Register


