import React from 'react';
import { StyleSheet, SafeAreaView,
   ListRenderItemInfo, Text, Image, 
   FlatList, ScrollView, View, TextInput, 
   Button, ImageBackground, Keyboard, Alert, TouchableOpacity, Settings } from 'react-native';
import Colors from '../utils/colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Constants from '../utils/constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize, responsiveScreenHeight, responsiveScreenFontSize } from "react-native-responsive-dimensions";
import { NavigationContext, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import * as I18n from '../Locales/i18n';
import ListRow from './listRow.component'
import colors from '../utils/colors';
 
const DATA  =   
[Constants.Images.introduction1,
   Constants.Images.introduction2,
    Constants.Images.introduction3]
const array1 = [
   {
     name:'Hotel',
     icon:'domain'
   },
   {
    name:'Tours',
    icon:'map-marker'
  },
  {
    name:'Cars',
    icon:'car'
  },
  {
    name:'Flight',
    icon:'airplane'
  }
]

const array2 = [
  {
    name:'Cruise',
    icon:'ferry'
  },
  {
   name:'Bus',
   icon:'bus'
 },
 {
   name:'Event',
   icon:'calendar-check-outline'
 },
 {
   name:'More',
   icon:'dots-horizontal'
 }
]
class Dashboard extends React.Component<any,any> {
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

  buutonView(title,icon){
    return(
      <View style={{flexDirection:'column'}}>
      <View style={{height:40,width:40,justifyContent:'center',
        borderRadius:20,backgroundColor:colors.grey}}>
      <MaterialCommunityIcons
                  name={icon}
                  style={{ color: Colors.orang,alignSelf:'center',
                    fontSize: 26,}}
                />
      </View>
      <Text style={{alignSelf:'center'}}>
        {title}
      </Text>
    </View>   
    )
  }

  viewServices(array){
    return(
      <View style={{flexDirection:'row',justifyContent:'space-around',margin:10}}>
        {this.buutonView(array[0].name,array[0].icon)}
        {this.buutonView(array[1].name,array[1].icon)}
        {this.buutonView(array[2].name,array[2].icon)}
        {this.buutonView(array[3].name,array[3].icon)}
    </View>
    )
  }
  List(title){
    return(
      <View style={{top:responsiveScreenHeight(22),margin:10}}>
         <Text style={{marginHorizontal:10,marginVertical:10, fontWeight:'700'}}>
           {title}
         </Text>
         <FlatList
         showsHorizontalScrollIndicator={false}
          horizontal
          data={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => {
            return(
              
                <View style={{marginHorizontal:8,borderRadius:5,overflow:'hidden'}}>
                  <ImageBackground 
                  style={{height:responsiveScreenHeight(25),
                  width:Constants.screenWidth/2.8}}
                  source={item}>
                    <View style={{justifyContent:'flex-end',flex:1,backgroundColor:'rgba(0,0,0,0.3)'}}>
                    <Text  style={{color:'white',marginHorizontal:5,fontSize:responsiveScreenFontSize(1.5)}}>
                        Action & Activity
                      </Text>
                      <Text  style={{color:'white',marginHorizontal:5,fontSize:responsiveScreenFontSize(2)}}>
                        Barcelona
                      </Text>
                    <View style={{width:80,margin:5,marginBottom:10,
                      backgroundColor:colors.orang,borderRadius:5}}>
                    <Text style={{alignSelf:'center',color:'white'}}>
                      Book Now
                    </Text>
                    </View>
                   
                    </View>
                   
                  </ImageBackground>
                </View>
            )
          }}
        />
      </View>
    )
  }

  render() {

    return (
      <View style={styles.container}>
         <ScrollView
         showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow:1,height:Constants.screenHeight+responsiveScreenHeight(20)
                  }}>
                     <Image style={{width:Constants.screenWidth,
          height:responsiveScreenHeight(25),backgroundColor:'red'}}
          source={Constants.Images.introduction1}>
          </Image>
           <View style={{backgroundColor:Colors.white,borderRadius:5,
          width:'90%',
          top:responsiveScreenHeight(25)-80,
          shadowColor: 'gray',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
          elevation: 2,
          position:'absolute',
          alignSelf:'center',flexDirection:'column'}}>
             <TextInput
             style={{height:responsiveScreenHeight(6),margin:10,backgroundColor:Colors.lightgrey}}
             placeholder={"What're you looking for?"}>

             </TextInput>
           {this.viewServices(array1)}
           {this.viewServices(array2)}
          </View>
         {this.List("Promos Today")}
         {this.List("Tours")}
         </ScrollView>
       
      </View>
    );
  }
}


// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // padding: 10
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

