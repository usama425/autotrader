import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import colors from '../utils/colors';

const FacebookButton = ({
    onPress,
    mainStyle,
    title,
    titleAllCaps,
    disabled
}) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, mainStyle]} onPress={onPress} disabled={disabled}>
            <Text style={styles.titleColor}>{title ? title : title && titleAllCaps ? title?.toUpperCase() : "Login with Facebook"}</Text>
        </TouchableOpacity>
    )
}

export default FacebookButton

const styles = StyleSheet.create({
    mainContainer: {
        minWidth: 158,
        height: 45,
        backgroundColor: colors.blueBg,
        borderRadius: 5,
        justifyContent: "center",
        paddingHorizontal: 10
    },
    titleColor: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 14,
        textAlign: "center"
    }
})