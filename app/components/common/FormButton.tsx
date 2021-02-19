import React from 'react'
import { Button } from 'react-native-elements'
import colors from '../utils/colors';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from "react-native-responsive-dimensions";
const FormButton = ({ title, buttonType, buttonColor,buttonBackgroundColor, ...rest }) => (
  <Button
    {...rest}
    type={buttonType}
    title={title}
    buttonStyle={{ borderColor: buttonColor,borderRadius: 20,backgroundColor:buttonBackgroundColor ,width: (responsiveWidth(100) - 80)}}
    titleStyle={{ color: buttonColor }}
  />
)

export default FormButton