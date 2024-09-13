import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import colors from '../utils/colors';

const TextArea = ({
    title,
    titleAllCaps,
    showMandatoryStar,
    mainStyle,
    isMandatory,
    placeholder,
    keyboardType,
    editable,
    onChange,
    defaultValue,
    placeholderColor
}) => {

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={[styles.titleStyle, {
                color: isMandatory ? colors.warningRed : colors.appBlack
            }]}>{titleAllCaps ? title?.toUpperCase() : title}<Text style={{ color: colors.warningRed }}>{showMandatoryStar ? "*" : ""}</Text></Text>}
            <View style={[styles.inputContainer, {
                borderColor: isMandatory ? colors.warningRed : colors.borderColor,
            }]}>
                <TextInput
                    style={styles.inputField}
                    placeholderTextColor={placeholderColor ? placeholderColor : colors.placeholderColor}
                    keyboardType={keyboardType}
                    autoCapitalize="none"
                    editable={editable}
                    value={defaultValue}
                    placeholder={placeholder || "Type here"}
                    multiline={true}
                    onChangeText={(text) => onChange && onChange(text)}
                />
            </View>
        </View>
    )
}

export default TextArea

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
        height: 100,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 5,
    },
    inputField: {
        width: "100%",
        height: "auto",
        marginTop: 5,
        marginLeft: 5,
        color:colors.appInputTextColor,
    }
})