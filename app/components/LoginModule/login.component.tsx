import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, Alert, TouchableOpacity, SafeAreaView } from 'react-native';
import Colors from '../utils/colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { Dispatch } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as Constants from '../utils/constants';
import IoniconsIcon from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { NavigationContext, useNavigation } from '@react-navigation/native';
import { setLoginValues,userLoginAction } from "../../redux/Login/loginAction";
import { setForgotPasswordEmpty } from "../../redux/ForgotPassword/forgotPasswordAction";
import * as Common from '../../components/utils/common'
import { loginState } from "../../redux/Login/loginType";
import ActivityIndicator from '../common/ActivityIndicator';
import { connect } from 'react-redux';
import * as I18n from '../Locales/i18n';

// import { Button } from 'react-native-elements'
import FormInput from '../common/FormInput'
import FormButton from '../common/FormButton'
import ErrorMessage from '../common/ErrorMessage'
import { Formik } from 'formik'
import * as yup from 'yup';
import colors from '../utils/colors';

export interface Props {
  email: string;
  password: string;
  showPassword: Boolean;

  // setLoginValues: typeof setLoginValues;
  updateEmail?: (email: string) => void;
  updatePassword?: () => void;
  onLoginPress?: () => void;
  navigateToRegister?: () => void;
}

interface State {
  email?: string;
  password: string;
  showPassword: boolean;
  email_check: boolean;
  icEye: string
}

const passwordRef = React.createRef<TextInput>(null);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Please enter email')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required('Please enter Password')
    .min(2, 'Seems a bit short')
    .max(10,'We prefer insecure system, try a shorter password'),
    //.min(2, I18n.translate('Login.Seems a bit short'))
    //.max(10,I18n.translate('Login.We prefer insecure system, try a shorter password')),
});
class Login extends React.Component<any, any, State> {
  static contextType = NavigationContext;


  constructor(props: Props) {
    super(props)
    this.getDefaulLang()
    this.state = {
      email: props.email || "",
      password: props.password || "",
      email_check: false,
      showPassword: false,
      icEye: 'visibility-off'
    }
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

  updateEmail = (text: string) => {
    const reg = Constants.EMAILREG;
    this.props.setLoginValues({ 'email': text })
    if (reg.test(text)) {
      this.setState({ email_check: true })
    }
    else {
      this.setState({ email_check: false })
    }
  }

  updatePassword = (text: string) => {
    this.props.setLoginValues({ 'password': text })
    let newState = {
      icEye: this.state.icEye,
      showPassword: this.state.showPassword,
    }
    this.setState(newState);
  }


  navigateToForgotPassword() {
    const navigation = this.context;
    this.props.setForgotPasswordEmpty()
    navigation.navigate('ForgotPassword')
  }

  changePwdType = () => {
    let newState;
    if (this.state.showPassword) {
      newState = {
        icEye: 'visibility',
        showPassword: false,
      }
    } else {
      newState = {
        icEye: 'visibility-off',
        showPassword: true,
      }
    }
    this.setState(newState)
  };

  getLoginResponse(response: loginState) {
    if (response.isLoading === false && response.error === false && (response.isLoggedIn)) {
      console.log("UserInfo", response.user)
      AsyncStorage.setItem('userInfo', JSON.stringify(response.user))
      this.props.setRouterValues({ "isUserLogin": true })
      this.props.setLoginValues({ 'isLoggedIn': false })
    }
    else if (response.errorMsg !== "") {
      Common.showAlertWithDefaultTitle(response.errorMsg);
      this.props.setLoginValues({ 'errorMsg': "" })
    }
  }


  handleSubmit = values => {
    this.props.fetchUserLogin(values)

    // DEMO API IS NOT WORKING //
    this.props.setRouterValues({ "isUserLogin": true })
    this.props.setLoginValues({ 'isLoggedIn': false })

  }


  renderLoginContent() {
    const navigation = this.context;
    return (
      <SafeAreaView>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={values => { this.handleSubmit(values) }}
          validationSchema={validationSchema}
        >
          {({ handleChange, handleBlur, handleSubmit, isValid, isSubmitting, values, errors }) => (
            <>
              <Image style={styles.imageView}
                source={Constants.Images.appLogo}
                resizeMode={'cover'}
              />
              <Text style={styles.textInputHeader}>{I18n.translate('Login.Email')}</Text>
              <View style={styles.textInputView}>
                <TextInput style={styles.textInputValue}
                  // value={this.props.loginReducer.email}
                  // onChangeText={this.updateEmail}
                  placeholderTextColor={Colors.white}
                  keyboardType='email-address'
                  autoCapitalize='none'
                  placeholder={I18n.translate('Login.Email')}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onSubmitEditing={(event) => {
                    passwordRef.current.focus();
                  }} />
                {this.state.email_check ?
                  <IoniconsIcon name='md-checkmark' style={styles.icon_style} /> : null}
              </View>

              <View style={styles.divider_line}></View>
              <ErrorMessage errorValue={errors.email} />

              <View style={styles.marginTop20}>
                <Text style={styles.textInputHeader}>{I18n.translate('Login.Password')}</Text>
                <View style={styles.textInputView}>
                  <TextInput
                    style={styles.textInputValue}
                    ref={passwordRef}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    returnKeyType='done'
                    onBlur={handleBlur('password')}
                    secureTextEntry={this.state.showPassword}
                    placeholderTextColor={Colors.white}
                    placeholder="*******" />

                  <MaterialIcons style={styles.icon_style} name={this.state.icEye} size={16} onPress={this.changePwdType} />

                </View>
                <View style={styles.divider_line}></View>
                <ErrorMessage errorValue={errors.password} />
              </View>



              <View style={styles.submitView}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title={I18n.translate('Login.Login')}
                  buttonColor={colors.white}
                  buttonBackgroundColor={colors.darkPrimaryColor}
                  loading={isSubmitting}

                // disabled={!isValid}
                />
              </View>
              <TouchableOpacity activeOpacity={0.7}
                onPress={() => this.navigateToForgotPassword()}
              >
                <Text style={styles.fogotText}>{I18n.translate('Login.Forgot Your Password?')} </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </SafeAreaView>
    )
  }

  renderBottomView() {
    const navigation = this.context;
    return (
      <SafeAreaView style={{ justifyContent: 'flex-end', flex: 1 }}>

        <View style={styles.bottom_view}>
          <Text style={styles.dontAccText}>{I18n.translate('Login.DONT HAVE AN ACCOUNT?')}</Text>
          <Text onPress={() => navigation.navigate(I18n.translate('Register.Register'))} style={styles.signUpText}> {I18n.translate('Login.Register Now')}</Text>
        </View>
      </SafeAreaView>
    )
  }

  render() {
    this.getLoginResponse(this.props.loginReducer)
    return (
      <View style={styles.container}>
        <View style={{ margin: 40 }}>
          {this.renderLoginContent()}
        </View>
        {this.renderBottomView()}
        <ActivityIndicator isLoading={this.props.loginReducer.isLoading} />
      </View>
    );
  }
}


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    padding: 20
  },
  textInputHeader: {
    color: Colors.white,
    fontSize: responsiveFontSize(2),
  },
  bottomButton: {
    justifyContent: "space-between",
    flexDirection: 'row'
  },
  email_text: {
    color: Colors.white,
    fontSize: responsiveFontSize(2),
  },
  buttonShape: {
    height: 44,
    width: responsiveWidth(60),
    borderRadius: 22,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center"
  },
  imageView: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    alignSelf: 'center',
    marginBottom: responsiveWidth(10)
  },
  buttonText: {
    fontSize: responsiveFontSize(3),
    fontWeight: '500',
    color: '#fff',
  },
  text_search: {
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 3,
    flex: 1
  },
  textinput_style: {
    color: Colors.white,
    padding: 5,
    width: 250
  },
  divider_line: {
    borderWidth: 0.5,
    borderRadius: 1,
    marginBottom: 10,
    marginTop: 10,
    borderColor: Colors.white
  },
  signUpText: {
    color: Colors.darkPrimaryColor,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600'
  },
  bottom_view: {
    marginTop: 20,
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  //RENDER LOGIN STYLE
  textInputView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  textInputValue: {
    color: Colors.white,
    padding: 5,
    width: responsiveWidth(60)
  },
  icon_style: {
    fontSize: 20,
    marginRight: 5,
    color: 'white',
    padding: 5,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  marginTop20: {
    marginTop: 20
  },
  forgotHeaderText: {
    color: Colors.primary,
    fontSize: 22,
    textAlign: 'center'
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

  //RENDER FORGOT PASSWORD MODAL STYLE
  forgotModalContainer: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    padding: 10
  },
  emailTextValue: {
    color: Colors.black,
    marginTop: 10
  },
  textInputBox: {
    height: 40,
    marginTop: 10
  },
  forgotTextInputValue: {
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 3,
    flex: 1
  },
  fogotText: {
    color: Colors.darkPrimaryColor,
    marginTop: 20,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  dontAccText: {
    color: Colors.white,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
  },

});


const mapStateToProps = (state) => {
  //loginReducer: state.login,
  return {
    loginReducer: state.login
  }
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
      userLoginAction: (data) => dispatch(userLoginAction(data)),
      setLoginValues : (data) => dispatch(setLoginValues(data)),
      
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);



// export default Login;