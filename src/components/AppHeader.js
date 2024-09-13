import React, { useState } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';
import AppInput from './AppInput';

const AppHeader = ({
    title,
    titleAllCaps,
    leftIcon,
    onLeftIconPress,
    mainStyle,
    leftIconStyle,
    titleTextColor,
    rightFirstIcon,
    rightSecondIcon,
    onRightSecondPress,
    onSearch,
    rightTitle,
    needAppLogo
}) => {

    const [showSearch, setShowSearch] = useState(false)

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={onLeftIconPress}>
                <Image
                    source={leftIcon}
                    style={[styles.leftIcon, leftIconStyle]}
                />
            </TouchableOpacity>
            {showSearch ?
                <View style={{
                    width: "60%"
                }}>
                    <AppInput
                        placeholder={"Search here"}
                        mainStyle={{
                            width: "100%",
                        }}
                        onChange={(text) => onSearch && onSearch(text)}
                    />

                </View>
                :
                <View style={styles.midRowContainer}>
                    {needAppLogo && <Image
                        source={Icons.appIcon}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            resizeMode: "contain",
                            marginLeft: -40
                        }}
                    />}
                    {title && <Text style={[styles.title, titleTextColor]}>{titleAllCaps ? title?.toUpperCase() : title}</Text>}
                </View>
            }
            <View style={styles.rightContainer}>
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setShowSearch(!showSearch)}
                    disabled={rightFirstIcon ? false : true}
                >
                    <Image
                        source={rightFirstIcon}
                        style={styles.rightIcons}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onRightSecondPress}>
                    {rightTitle ?
                        <Text style={{
                            color: colors.appBlack,
                            marginLeft: -30,
                            fontSize: 14,
                            fontWeight: "500"
                        }}>{rightTitle}</Text> :
                        <Image
                            source={rightSecondIcon}
                            style={styles.rightIcons}
                        />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default AppHeader;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 14,
        fontWeight: "600",
        color: colors.appBlack
    },
    leftIconContainer: {
        width: 70,
        height: 50,
        position: "absolute",
        left: -5,
        top: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    leftIcon: {
        width: 15,
        height: 15,
        tintColor: colors.appBlack,
        resizeMode: "contain"
    },
    rightContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        position: "absolute",
        right: 0,
        paddingRight: 10
    },
    iconContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    rightIcons: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: colors.appBlack
    },
    midRowContainer: {
        flexDirection: "row",
        alignItems: "center"
    }
})