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
import { forgotPasswordState } from '../../redux/ForgotPassword/forgotPasswordType'
import { forgotPasswordAction, setForgotPasswordValues } from "../../redux/ForgotPassword/forgotPasswordAction";
import * as Common from '../../components/utils/common'
import { loginState } from "../../redux/Login/loginType";
import { connect } from 'react-redux';
import ActivityIndicator from '../common/ActivityIndicator';
var _ = require('lodash');

class ForgotPassword extends React.Component<any, any> {
    static contextType = NavigationContext;


    validateForgotPassword() {
        let message = "";
        if (this.props.forgotPasswordReducer.forgotEmail.trim() == "") {
            message = Constants.Messages.Email;
        }
        else if (!Constants.EMAILREG.test(this.props.forgotPasswordReducer.forgotEmail)) {
            message = Constants.Messages.ValidEmail;
        }
        if (message === "") {
            return true;
        }
        Common.showAlertWithDefaultTitle(message);
        return false;
    }

    // *** CALL FORGOT PASSWORD API ***//
    onForgotPasswordPress() {
        if (this.validateForgotPassword()) {
            this.props.forgotPasswordAction({ 'email': this.props.forgotPasswordReducer.forgotEmail });
        }
    }

    // *** GET FORGOT PASSWORD API RESPONSE ***//
    getForgotPasswordResponse(response: forgotPasswordState) {
        if (response.isLoading === false && response.error === false && (response.isUpdated)) {
            const actions = [
                {
                    text: 'Ok',
                    onPress: () => {
                        this.props.navigation.navigate('Login')
                    }
                }
            ];
            Common.showAlertwithAction(Constants.PROJECTNAME, response.message, actions);
            this.props.setForgotPasswordValues({ 'isUpdated': false })
        }
        else if (response.errorMsg !== "") {
            Common.showAlertWithDefaultTitle(response.errorMsg);
            this.props.setForgotPasswordValues({ 'errorMsg': "" })
        }
    }

    render() {
        this.getForgotPasswordResponse(this.props.forgotPasswordReducer)
        return (
            <View style={styles.container}>
                <IoniconsIcon name='md-arrow-round-back' style={styles.backIcon}
                    onPress={() => this.props.navigation.goBack()} />
                <View style={styles.forgotView}>
                    <View >
                        <Text style={styles.forgotText}>Forgot Password</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.emailText}>Enter your email</Text>
                        <View style={styles.textInputView}>
                            <TextInput
                                autoCapitalize="none"
                                style={styles.textInputValue}
                                placeholderTextColor={Colors.white}
                                placeholder=""
                                keyboardType='email-address'
                                underlineColorAndroid='transparent'
                                onChangeText={text => this.props.setForgotPasswordValues({ 'forgotEmail': text })}
                                value={this.props.forgotPasswordReducer.forgotEmail}
                            >
                            </TextInput>
                        </View>

                        <TouchableOpacity style={{ flex: 0 }}
                            onPress={() => this.onForgotPasswordPress()}>
                            <View style={styles.submitView}>
                                <Text style={styles.submitText}>SignUp</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <ActivityIndicator isLoading={this.props.forgotPasswordReducer.isLoading} />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.black
    },
    forgotView: {
        marginTop: 50,
        padding: 30
    },
    backIcon: {
        color: Colors.white,
        fontSize: 30,
        marginTop: 44,
        marginLeft: 10
    },
    forgotText: {
        color: Colors.white,
        fontSize: 24,
        fontWeight: 'bold'
    },
    emailText: {
        fontSize: 16,
        color: Colors.white,
        marginTop: 10
    },
    textInputValue: {
        color: Colors.white,
        fontSize: 16,
        borderWidth: 1,
        borderColor: Colors.white,
        padding: 3,
        flex: 1
    },
    textInputView: {
        height: 40,
        marginTop: 10
    },
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
})



const mapStateToProps = (state) => ({
     forgotPasswordReducer: state.forgotPassword,
  });
  
  // Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
  const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        forgotPasswordAction: (data) => dispatch(forgotPasswordAction(data)),
        setForgotPasswordValues : (data) => dispatch(setForgotPasswordValues(data)),
        
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ForgotPassword);


// export default Login;