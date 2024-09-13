import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';

const Checkbox = ({
    title,
    titleAllCaps,
    isSelected,
    onChange,
    mainStyle
}) => {

    return (
        < TouchableOpacity style={[styles.mainContainer, mainStyle]} onPress={onChange} >
            <View style={[styles.boxContainer, {
                backgroundColor: isSelected ? colors.blueBg : colors.white,
                borderColor: isSelected ? colors.blueBg : colors.borderColor
            }]}>
                <Image
                    source={Icons.checkIcon}
                    style={{ width: 15, height: 12, tintColor: colors.white }}
                    resizeMode="contain"
                />
            </View>
            <Text style={styles.titleStyle}>{titleAllCaps ? title?.toUpperCase() : title}</Text>
        </TouchableOpacity >
    )
}

export default Checkbox

const styles = StyleSheet.create({
    mainContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    boxContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.appBlack,
        marginLeft: 8
    }
})