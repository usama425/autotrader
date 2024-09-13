import React from "react";
import {
    View,
    Text,
    StyleSheet,
    Platform
} from "react-native";
import colors from "../../utils/colors";

const BoxContainer = ({ title, children }) => {
    return (
        <View style={styles.boxContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {children}
        </View>
    )
}

export default BoxContainer;

const styles = StyleSheet.create({
    boxContainer: {
        width: "100%",
        minHeight: 60,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginVertical: 20,
        padding: 10,
        backgroundColor:colors.grayBg
    },
    titleText: {
        fontSize: 15,
        fontWeight:"500",
        color: colors.appBlack,
        position: "absolute",
        top: Platform.OS==="android"?-12:-10,
        left: 10,
        backgroundColor: colors.white
    },
})