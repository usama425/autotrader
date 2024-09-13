import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';

const SocialButton = ({
    title,
    titleAllCaps,
    leftIcon,
    tintColor,
    onPress,
    mainStyle,
    disabled,
}) => {
    return (
        <TouchableOpacity style={[styles.mainContainer, mainStyle]} onPress={onPress} disabled={disabled}>
            {leftIcon && <Image
                source={leftIcon}
                style={{
                    width: 20,height: 20,
                    marginRight: 10
                }}
            />}
            <Text style={styles.titleColor}>{titleAllCaps ? title?.toUpperCase() : title}</Text>
        </TouchableOpacity>
    )
}

export default SocialButton;

const styles = StyleSheet.create({
    mainContainer: {
        minWidth:"100%",
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        backgroundColor: colors.appButtonColor,
        padding:10,
        marginTop:15
    },
    titleColor: {
        color: colors.white,
        fontWeight: "600",
        fontSize: 14
    }
})