import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Colors from '../utils/colors';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {Dispatch} from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import {
  setLoginValues,
  setRouterValues,
  userLoginAction,
} from '../../redux/Login/loginAction';
import * as Common from '../../components/utils/common';
import {loginState} from '../../redux/Login/loginType';
import ActivityIndicator from '../common/ActivityIndicator';
import {connect} from 'react-redux';
import ErrorMessage from '../common/ErrorMessage';
import {Formik} from 'formik';
import * as yup from 'yup';
import colors from '../utils/colors';

const passwordRef = React.createRef<TextInput>(null);

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .label('Email')
    .email('Please enter vaild email')
    .required(),
  password: yup
    .string()
    .label('Password')
    .required('Please enter Password')
    .min(2, 'Seems a bit short')
    .max(10, 'We prefer insecure system, try a shorter password'),
  //.min(2, I18n.translate('Login.Seems a bit short'))
  //.max(10,I18n.translate('Login.We prefer insecure system, try a shorter password')),
});
class Login extends React.Component<any, any> {
  static contextType = NavigationContext;

  constructor(props: Props) {
    super(props);
    // this.getDefaulLang()
    this.state = {
      email: props.email || '',
      password: props.password || '',
      email_check: false,
      showPassword: false,
      icEye: 'visibility-off',
    };
  }

  componentDidMount() {}

  handleSubmit = (values) => {
    ///  this.props.fetchUserLogin(values)
    // DEMO API IS NOT WORKING //
    AsyncStorage.setItem('userInfo', 'user');
    this.props.setRouterValues({isUserLogin: true});
    this.props.setLoginValues({isLoggedIn: false});
  };

  renderLoginContent() {
    const navigation = this.context;
    return (
      <SafeAreaView>
        <Formik
          initialValues={{email: '', password: ''}}
          onSubmit={(values) => {
            this.handleSubmit(values);
          }}
          validationSchema={validationSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            isValid,
            isSubmitting,
            values,
            errors,
            touched,
          }) => (
            <>
              <View style={styles.textInputView}>
                <TextInput
                  style={styles.textInputValue}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder={'ID'}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  onSubmitEditing={(event) => {
                    passwordRef.current.focus();
                  }}
                />
              </View>
              <ErrorMessage errorValue={touched.email && errors.email} />

              <View style={styles.marginTop20}>
                <View style={styles.textInputView}>
                  <TextInput
                    style={styles.textInputValue}
                    ref={passwordRef}
                    value={values.password}
                    onChangeText={handleChange('password')}
                    returnKeyType="done"
                    onBlur={handleBlur('password')}
                    secureTextEntry={this.state.showPassword}
                    //  placeholderTextColor={Colors.black}
                    placeholder="Password"
                  />
                </View>
                <ErrorMessage
                  errorValue={touched.password && errors.password}
                />
              </View>
              <TouchableOpacity
                onPress={handleSubmit}
                style={styles.submitView}>
                <Text style={{color: 'white'}}>Sign in</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
                <Text style={styles.fogotText}>{'Forgot Your Password?'} </Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </SafeAreaView>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 100}}>{this.renderLoginContent()}</View>
        <ActivityIndicator isLoading={this.props.loginReducer.isLoading} />
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 20,
  },
  textInputHeader: {
    color: Colors.black,
    fontSize: responsiveFontSize(2),
  },
  bottomButton: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  email_text: {
    color: Colors.black,
    fontSize: responsiveFontSize(2),
  },
  buttonShape: {
    height: 44,
    width: responsiveWidth(60),
    borderRadius: 22,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    width: responsiveWidth(30),
    height: responsiveWidth(30),
    alignSelf: 'center',
    marginBottom: responsiveWidth(10),
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
    flex: 1,
  },
  textinput_style: {
    color: Colors.black,
    padding: 5,
    width: 250,
  },
  divider_line: {
    borderWidth: 0.5,
    borderRadius: 1,
    marginBottom: 10,
    marginTop: 10,
    borderColor: Colors.black,
  },
  signUpText: {
    color: Colors.darkPrimaryColor,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontWeight: '600',
  },
  bottom_view: {
    marginTop: 20,
    flex: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },

  //RENDER LOGIN STYLE
  textInputView: {
    flexDirection: 'row',
    marginTop: 5,
    borderRadius: 5,
    alignSelf: 'center',
    //justifyContent: 'center',
    width: '98%',
    backgroundColor: colors.grey,
  },
  textInputValue: {
    color: Colors.black,
    padding: 0,
    alignSelf: 'center',
    margin: 15,
    flex: 1,
    height: responsiveWidth(5),
  },
  icon_style: {
    fontSize: 20,
    marginRight: 5,
    color: 'black',
    //padding: 5,
    margin: 10,
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  marginTop20: {
    marginTop: 0,
  },
  forgotHeaderText: {
    color: Colors.primary,
    fontSize: 22,
    textAlign: 'center',
  },

  submitView: {
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 5,

    width: '98%',
    height: responsiveWidth(12),
    //borderWidth: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: Colors.orang,
  },
  submitText: {
    flex: 0,
    fontSize: responsiveFontSize(2.0),
    color: 'black',
  },

  //RENDER FORGOT PASSWORD MODAL STYLE
  forgotModalContainer: {
    backgroundColor: Colors.black,
    justifyContent: 'center',
    padding: 10,
  },
  emailTextValue: {
    color: Colors.black,
    marginTop: 10,
  },
  textInputBox: {
    height: 40,
    marginTop: 10,
  },
  forgotTextInputValue: {
    color: Colors.black,
    fontSize: 16,
    borderWidth: 1,
    padding: 3,
    flex: 1,
  },
  fogotText: {
    color: Colors.mediumgrey,
    marginTop: 20,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
    //textDecorationLine: 'underline',
  },
  dontAccText: {
    color: Colors.black,
    alignSelf: 'center',
    padding: 3,
    textAlign: 'center',
  },
});

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
    setLoginValues: (data) => dispatch(setLoginValues(data)),
    setRouterValues: (data) => dispatch(setRouterValues(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

// export default Login;
