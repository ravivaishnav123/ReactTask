
import {
    Dimensions
} from 'react-native';

import * as Constant from './common'
const { height, width } = Dimensions.get('window');

export const responsiveHeight = (h: number) => {
    if (height > 736.0) {
        return 800.0 * (h / 100);
    } else {
        return height * (h / 100);
    }
};

export const responsiveWidth = (w: number) => {
    if (width > 414) {
        return 600.0 * (w / 100);
    } else {
        return width * (w / 100);
    }
};

export const responsiveScreenWidth = (w: number) => {
    return width * (w / 100);
};
export const responsiveScreenHeight = (h: number) => {
    return height * (h / 100);
};

export const responsiveFontSize = (f: number) => {
    if (width > 375) {
        return Math.sqrt((668 * 375) + (375 * 668)) * (f / 100);
    } else {
        return Math.sqrt((height * width) + (width * height)) * (f / 100);
    }
};

export const responsiveFontSizeX = (f: number) => {
    const point = Constant.isIphoneX() ? f : f + 0.3;
    return Math.sqrt((height * width) + (width * height)) * (point / 100);
};


