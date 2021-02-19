import React from 'react';
import { StyleSheet, SafeAreaView, ListRenderItemInfo, Text, Image, FlatList, ScrollView, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Settings } from 'react-native';
import Colors from '../utils/colors'
import * as Constants from '../utils/constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { NavigationContext, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as I18n from '../Locales/i18n';
import ListRow from './listRow.component'
const Data = [
  {
    key: '1',
    title: I18n.translate('Dashboard.title') + " 1",
    text: I18n.translate('Dashboard.text'),
    image: Constants.Images.introduction1,
  },
  {
    key: '2',
    title: I18n.translate('Dashboard.title') + " 2",
    text: I18n.translate('Dashboard.text'),
    image: Constants.Images.introduction2,
  },
  {
    key: '3',
    title: I18n.translate('Dashboard.title') + " 3",
    text: I18n.translate('Dashboard.text'),
    image: Constants.Images.introduction3,
  },
  {
    key: '4',
    title: I18n.translate('Dashboard.title') + " 4",
    text: I18n.translate('Dashboard.text'),
    image: Constants.Images.introduction1,
  },
  {
    key: '5',
    title: I18n.translate('Dashboard.title') + " 5",
    text: I18n.translate('Dashboard.text'),
    image: Constants.Images.introduction2,
  },
]


interface ListItemProps {
  title: string,
  text: string,
  image: string,

}

class Dashboard extends React.Component<ListItemProps> {
  static contextType = NavigationContext;

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

  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={Data}
          extraData={this.state}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyCart}>Cart is empty..</Text>
          }
          renderItem={({ item }: ListRenderItemInfo<ListItemProps>) => (
            <ListRow {...item} />
          )}
        />
      </View>
    );
  }
}


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  imageItem: {
    width: 120,
    height: 80,
    borderRadius: 5,
  },
  textItem: {
    color: Colors.black,
    fontSize: 16,
    paddingTop: 5
  },
  textItem2: {
    color: Colors.gray,
    fontSize: 16,
  },
  flatListView: {
    borderBottomColor: Colors.dividerColor,
    borderBottomWidth: 1
  },
  flatListView2: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10
  },
  flexView1: {
    flex: 0.4,
    marginRight: 5
  },
  flexView2: {
    flex: 0.6,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  emptyCart: {
    textAlign: 'center',
    flex: 1,
  },
});


export default Dashboard

