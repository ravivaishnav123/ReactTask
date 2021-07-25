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
  responsiveScreenHeight,
} from 'react-native-responsive-dimensions';
import {Dispatch} from 'redux';
import * as Constants from '../utils/constants';
import {NavigationContext, useNavigation} from '@react-navigation/native';
import PageControl from 'react-native-page-control';
import colors from '../utils/colors';
import {ScrollView} from 'react-native-gesture-handler';

class Intro extends React.Component<any, any> {
  static contextType = NavigationContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      pageCountImage: 0,
    };
  }

  componentDidMount() {
    //this.getDefaulLang()
  }

  renderLoginContent() {
    const navigation = this.context;
    return (
      <View>
        <View style={styles.textInputView}></View>

        <TouchableOpacity
          onPress={() => {}}
          style={[styles.submitView, {marginTop: 40}]}>
          <Text style={{color: 'white', fontSize: responsiveFontSize(2)}}>
            Login with Facebook
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Sign in');
          }}
          style={[styles.submitView, {backgroundColor: Colors.orang}]}>
          <Text style={{color: 'white', fontSize: responsiveFontSize(2)}}>
            Sign in
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'center',
            width: responsiveWidth(100) - 80,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Text style={styles.fogotText}>{"Haven't registered yet?"} </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <Text style={[styles.fogotText, {color: Colors.orang}]}>
              {'Join Now'}{' '}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  ImageRender() {
    //console.log('array', this.state.imageArry[index]);
    return (
      <View
        style={{
          marginVertical: 10,
          width: Constants.screenWidth,
          justifyContent: 'center',
        }}>
        <Image
          style={{
            alignSelf: 'center',
            backgroundColor: 'red',
            borderRadius: responsiveScreenHeight(30 / 2),
            height: responsiveScreenHeight(30),
            width: responsiveScreenHeight(30),
          }}
          source={Constants.Images.introduction1}></Image>
        <Text
          style={{
            alignSelf: 'center',
            margin: 20,
            fontSize: responsiveFontSize(2.5),
            color: Colors.mediumgrey,
          }}>
          Picking your travel destiantions
        </Text>
      </View>
    );
  }
  onScrollPropertyImage = (e) => {
    console.log('cal', e.nativeEvent.contentOffset.x, Constants.screenWidth);
    if (
      e.nativeEvent.contentOffset.x == 0 ||
      parseInt(e.nativeEvent.contentOffset.x) ==
        parseInt(Constants.screenWidth) ||
      parseInt(e.nativeEvent.contentOffset.x) ==
        parseInt(Constants.screenWidth * 2) ||
      parseInt(e.nativeEvent.contentOffset.x) ==
        parseInt(Constants.screenWidth * 3)
    ) {
      this.setState({
        pageCountImage:
          parseInt(e.nativeEvent.contentOffset.x) /
          parseInt(Constants.screenWidth),
      });
    }
  };
  pageControll() {
    return (
      <View style={{top: 10}}>
        <PageControl
          style={{left: 0, right: 0, bottom: 0}}
          numberOfPages={4}
          currentPage={this.state.pageCountImage}
          hidesForSinglePage
          pageIndicatorTintColor="gray"
          currentPageIndicatorTintColor={Colors.orang}
          indicatorStyle={{borderRadius: 5}}
          currentIndicatorStyle={{borderRadius: 5}}
          indicatorSize={{width: 8, height: 8}}
          // onPageIndicatorPress={{}}
        />
      </View>
    );
  }
  render() {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <View style={styles.container}>
            <View style={{height: responsiveScreenHeight(40)}}>
              <ScrollView
                contentContainerStyle={{alignSelf: 'center'}}
                horizontal
                pagingEnabled={true}
                onScroll={this.onScrollPropertyImage}
                showsHorizontalScrollIndicator={false}>
                {this.ImageRender()}
                {this.ImageRender()}
                {this.ImageRender()}
                {this.ImageRender()}
              </ScrollView>
            </View>

            {this.pageControll()}
            <View style={{}}>{this.renderLoginContent()}</View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    //padding: 20,
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
    width: responsiveWidth(100) - 80,
    backgroundColor: colors.grey,
  },
  textInputValue: {
    color: Colors.black,
    //  padding: 5,
    alignSelf: 'center',
    margin: 15,

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
    marginTop: 20,
    borderRadius: 5,

    width: responsiveWidth(100) - 80,
    height: responsiveWidth(12),
    //borderWidth: 1.0,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    backgroundColor: Colors.facebook,
  },
  submitText: {
    flex: 0,
    fontSize: responsiveFontSize(2.5),
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
    fontSize: responsiveFontSize(2),
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

export default Intro;
