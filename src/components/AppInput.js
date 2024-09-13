import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';

const AppInput = ({
    title,
    titleAllCaps,
    defaultValue,
    placeholder,
    leftIcon,
    leftIconPress,
    leftIconTintColor,
    rightIcon,
    rightIconPress,
    rightIconTintColor,
    placeholderTextColor,
    mainStyle,
    secureTextEntry,
    keyboardType,
    isMandatory,
    warningMessage,
    showMandatoryStar,
    editable,
    inputStyle,
    leftIconCustomStyle,
    disabledLeftIcon,
    onChange = () => { }
}) => {
    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={[styles.titleStyle, {
                color: isMandatory ? colors.warningRed : colors.appBlack
            }]}>{titleAllCaps ? title?.toUpperCase() : title}<Text style={{ color: colors.warningRed }}>{showMandatoryStar ? "*" : ""}</Text></Text>}
            <View style={[styles.inputContainer, {
                borderColor: isMandatory ? colors.warningRed : colors.borderColor,
            }]}>
                {leftIcon && <TouchableOpacity style={[styles.leftIconStyle, leftIconCustomStyle]} disabled={disabledLeftIcon} onPress={leftIconPress}>
                    <Image
                        source={leftIcon}
                        style={{ width: "80%", height: "80%", resizeMode: "contain", tintColor: leftIconTintColor }}
                    />
                </TouchableOpacity>}
                <TextInput
                    placeholder={placeholder || "Type here"}
                    style={[styles.textInputContainer, inputStyle, { width: rightIcon ? "80%" : "100%" }]}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.placeholderColor}
                    value={defaultValue}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    editable={editable}
                    onChangeText={(text) => onChange && onChange(text)}
                />
                {rightIcon && <TouchableOpacity style={styles.rightIconStyle} onPress={rightIconPress}>
                    <Image
                        source={rightIcon}
                        style={{ width: 20, height: 20, resizeMode: "contain", tintColor: rightIconTintColor }}
                    />
                </TouchableOpacity>}
            </View>
            {warningMessage && <View style={styles.messageContainer}>
                <Text style={styles.warningMessageText}>{warningMessage}</Text>
            </View>}
        </View>
    )
}

export default AppInput

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: "column",
    },
    titleStyle: {
        fontSize: 14,
        marginBottom: 10,
        color: colors.appBlack
    },
    inputContainer: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        paddingHorizontal: 5,
        flexDirection: "row",
    },
    leftIconStyle: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    rightIconStyle: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto"
    },
    textInputContainer: {
        height: "100%",
        marginLeft: 10,
        color: colors.appInputTextColor,
    },
    messageContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 2,
        marginTop: 10
    },
    warningMessageText: {
        color: colors.warningRed,
        marginLeft: 5
    }
})