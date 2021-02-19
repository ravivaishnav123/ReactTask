import React from "react";
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import * as Constants from '../utils/constants';
import Colors from '../utils/colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
const ActivityLoader: React.SFC<{
    isLoading: boolean;
}> = ({ isLoading }) => (
    <View style={isLoading ? styles.loadingContainer : styles.container}>
        <ActivityIndicator
            animating={isLoading}
            color={Colors.darkPrimaryColor}
            size="large"
            style={styles.activityIndicator} />
    </View>

    //*** RN PROGRESSHUD ***/
    //     isLoading ?
    //     <RNProgressHUD
    //      isVisible={isLoading}
    //      color={Colors.darkPrimaryColor}
    //      label="Loading"
    //      isActivityIndicator={true}
    //    />
);

export default ActivityLoader;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: Constants.screenHeight / 2.5,
        left: Constants.screenWidth / 2.5
    },
    loadingContainer: {
        flex: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        position: 'absolute',
        top: Constants.screenHeight / 2.5,
        left: Constants.screenWidth / 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'gray',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,

    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: responsiveWidth(20),
        width: responsiveWidth(20)
    }
})