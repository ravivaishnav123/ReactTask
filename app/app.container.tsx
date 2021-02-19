import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import BeforeLoginRouter from './routes/appNavigator';
import AfterLoginRouter from './routes/afterNavigator';
import { AppState } from "./redux/store";
import { connect } from 'react-redux';
import { setRouterValues, } from "./redux/Login/loginAction";
import * as I18n from './components/Locales/i18n';
import * as RNLocalize from "react-native-localize";
var _ = require('lodash');
export interface State {
  isUserLogin: boolean,
  appLanguage: string
}
export interface Props {
  isUserLogin: boolean,
  appLanguage: string
}

class App extends React.Component<Props, State> {


  constructor(props: Props) {
    super(props)
    this.state = {
      isUserLogin: false,
      appLanguage: "en"
    }
  }

  componentDidMount() {

    this.getDefaulLang();
  }

  getDefaulLang() {
    AsyncStorage.getItem("appLanguage")
      .then(appLanguage => {
        console.log("app language", appLanguage)
        this.setState({ appLanguage: appLanguage });
        I18n.setI18nConfig(appLanguage)
        this.getLoginInfo();
      })
      .catch(error => {
        console.error(error);
      });
  }


  componentWillUnmount() {
    //RNLocalize.removeEventListener("change", this.handleLocalizationChange);
  }

  handleLocalizationChange = () => {
    I18n.setI18nConfig(this.state.appLanguage);
    this.forceUpdate();
  };

  getLoginInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('userInfo')
      if (value != undefined && value != null && !_.isEmpty(value)) {
        this.props.setRouterValues({ 'isUserLogin': true })
        // this.setState({ isUserLogin: true })
      }
      else {
        this.props.setRouterValues({ 'isUserLogin': false })
        // this.setState({ isUserLogin: false })
      }
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      // <BeforeLoginRouter />
      (this.props.isUserLogin ?
        <AfterLoginRouter /> :
        <BeforeLoginRouter />)

    )
  }
}

const mapStateToProps = (state) => {
  //loginReducer: state.login,
  console.log(state)
  return {
    isUserLogin: state.router.isUserLogin
  }
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
  // Action
  return {
      setRouterValues : (data) => dispatch(setRouterValues(data)),
      
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);


// export default App;
