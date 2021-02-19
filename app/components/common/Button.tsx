import React from "react";
import { View, ActivityIndicator,TouchableOpacity, StyleSheet, Text } from "react-native";
import * as Constants from '../utils/constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../utils/colors'
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
const ActivityLoader: React.FC<{
    isLoading: boolean;
        
}> = ({ isLoading }) => (
    <TouchableOpacity onPress={() => this.props.onPress()}>
            <MaterialIcons name={this.props.iconName} size={30} style={{ color: Colors.darkPrimaryColor, padding: 5 }}></MaterialIcons>
    </TouchableOpacity>
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