import React from 'react';
import { StyleSheet, SafeAreaView, Text, Image, ScrollView, View, TextInput, Button, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity, Settings } from 'react-native';
import Colors from '../utils/colors'
import * as Constants from '../utils/constants'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
import { NavigationContext, useNavigation } from '@react-navigation/native';
import * as I18n from '../Locales/i18n';
interface listRowProps {
    title: string,
    text: string,
    image: string,

}

const ListRow: React.SFC<listRowProps> = ({ text, title, image }) => (

    <View style={styles.flatListView}>
        {/* <TouchableOpacity onPress={() => this.props.navigation.navigate('DetailPage', { item: item })}> */}
            <View style={styles.flatListView2}>
                <View style={styles.flexView1}>
                    <Image style={styles.imageItem}
                        source={image}
                        resizeMode='cover'>
                    </Image>
                </View>
                <View style={styles.flexView2}>
                    <Text style={styles.textItem}>{I18n.translate('Dashboard.title')}</Text>
                    <Text style={styles.textItem2}>{I18n.translate('Dashboard.text')}</Text>
                </View>
            </View>
        {/* </TouchableOpacity> */}
    </View>
)

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
})

export default ListRow;