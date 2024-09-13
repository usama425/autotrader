import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';

const SearchInput = ({
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
    isMandatory,
    editable,
    inputStyle,
    resultList,
    onChange = () => { }
}) => {

    const [inputText, setInputText] = useState()
    const [show, setShow] = useState(false)

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={styles.titleStyle}>{titleAllCaps ? title?.toUpperCase() : title}</Text>}
            <View style={[styles.inputContainer, {
                borderColor: isMandatory ? colors.warningRed : colors.borderColor,
                borderBottomWidth: (inputText && inputText?.length > 0) ? 0 : 1,
                borderBottomRightRadius: (inputText && inputText?.length > 0) ? 0 : 5,
                borderBottomLeftRadius: (inputText && inputText?.length > 0) ? 0 : 5
            }]}>
                {leftIcon && <TouchableOpacity style={styles.leftIconStyle} onPress={leftIconPress}>
                    <Image
                        source={leftIcon}
                        style={{ width: "80%", height: "80%", resizeMode: "contain", tintColor: leftIconTintColor }}
                    />
                </TouchableOpacity>}

                <TextInput
                    placeholder={placeholder}
                    style={[styles.textInputContainer, inputStyle, {
                        width: rightIcon ? "80%" : "100%",
                    }]}
                    placeholderTextColor={placeholderTextColor ? placeholderTextColor : colors.placeholderColor}
                    value={inputText}
                    autoCapitalize="none"
                    editable={editable}
                    onChangeText={(text) => {
                        if (text) {
                            setShow(true)
                            setInputText(text)
                            onChange && onChange(text)
                        }
                        else {
                            setShow(false)
                            setInputText(text)
                            onChange && onChange(text)
                        }
                    }}
                />
                {rightIcon && <TouchableOpacity style={styles.rightIconStyle} onPress={rightIconPress}>
                    <Image
                        source={rightIcon}
                        style={{ width: 20, height: 20, resizeMode: "contain", tintColor: rightIconTintColor }}
                    />
                </TouchableOpacity>}
            </View>
            {(inputText && inputText?.length > 0) && (show) && <View style={styles.resultContainer}>
                <FlatList
                    data={resultList}
                    keyExtractor={item => item}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={{
                                width: "100%",
                                paddingLeft: 10,
                                paddingTop: 10,
                            }} onPress={() => {
                                setShow(false)
                                onChange && onChange(item)
                                setInputText(item)
                            }}>
                                <Text style={{
                                    fontSize: 14,
                                    color: colors.appInputTextColor
                                }}>{item}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>}
        </View>
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        paddingHorizontal: 5,
        paddingVertical: 10,
        flexDirection: "column",
        zIndex: 999
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
    resultContainer: {
        width: "100%",
        height: 120,
        padding: 5,
        borderColor: colors.borderColor,
        alignSelf: "center",
        borderRadius: 5,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        marginTop: -5
    }
})