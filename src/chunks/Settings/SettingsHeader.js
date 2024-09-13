import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icons from '../../assets/icons';
import colors from '../../utils/colors';

const SettingsHeader = ({
    title,
    titleAllCaps,
    mainStyle
}) => {

    return (
        <View style={[styles.mainContainer, { mainStyle }]}>
            <View style={styles.leftContainer}>
                <Image
                    source={Icons.exploreIcon}
                    style={{ width: 25, height: 25, resizeMode: "contain", tintColor: colors.appBlack, }}
                />
                <Text style={styles.titleText}>{title ? title : titleAllCaps ? title?.toUpperCase() : "Settings"}</Text>
            </View>
        </View>
    )
}

export default SettingsHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10
    },
    leftContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
    },
    titleText: {
        marginHorizontal: 10,
        fontSize: 14,
        fontWeight: "bold",
        color: colors.appBlack
    },
    rightContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10
    },
    rightIcons: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: colors.appBlack
    }
})