import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import Images from '../../assets/images';
import CustomImageComponent from '../../components/CustomImageComponent';

const ArrowButton = ({
    icon,
    iconStyle,
    title,
    titleAllCaps,
    onPress,
    mainStyle,
    type,
    source
}) => {

    return (
        <TouchableOpacity style={[styles.mainContainer, mainStyle]} onPress={onPress}>
            <View style={styles.leftContainer}>
                {type == "profile" ? <CustomImageComponent
                    source={source}
                    mainStyle={styles.profileImage}
                /> :
                    <Image
                        source={icon}
                        style={[styles.icon, iconStyle]}
                    />}
                <Text style={styles.title}>{titleAllCaps ? title?.toUpperCase() : title}</Text>
            </View>
            <Image
                source={Icons.arrowIcon}
                style={{
                    width: 20,
                    height: 15,
                    resizeMode: "contain",
                    tintColor: colors.appBlack,
                    transform: [{ rotate: "90deg" }]
                }}
            />
        </TouchableOpacity>
    )
}

export default ArrowButton

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 10,
    },
    leftContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center"
    },
    icon: {
        width: 18,
        height: 18,
        resizeMode: "contain",
        tintColor: colors.appBlack
    },
    title: {
        marginHorizontal: 10,
        color: colors.appBlack,
        fontSize: 14,
        fontWeight: "600"
    },
    profileImage: {
        width: 40,
        height: 40,
        tintColor: null,
        borderRadius: 100,
        resizeMode: "cover",
    }
})