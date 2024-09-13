import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    Platform,
    Modal,
    Pressable,
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';
import AppInput from './AppInput';

const Picker = ({
    mainStyle,
    title,
    items,
    defaultValue,
    onChange,
    titleAllCaps,
    showMandatoryStar,
    keyToRender,
    onSearch,
    isMandatory,
    disabled,
    placeholderTextColor,
    keyText,
    tintColor,
    placeholder,
    secondaryTitle,
    count
}) => {

    const [show, setShow] = useState(false)
    const [selected, setSelected] = useState("")
    const [results, setResults] = useState([])

    useEffect(() => {
        defaultValue ? items?.forEach((element) => {
            if (defaultValue === element?.id || defaultValue === element?.name) {
                setSelected(element[keyToRender])
            }
        }) : setSelected("")
        setResults(items)
    }, [defaultValue, items])

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={[styles.titleStyle, {
                color: isMandatory ? colors.warningRed : colors.appBlack
            }]}>{titleAllCaps ? title?.toUpperCase() : title}<Text style={{ color: colors.warningRed }}>{showMandatoryStar ? "*" : ""}</Text></Text>}
            <TouchableOpacity
                disabled={disabled}
                style={[styles.innerContainer, {
                }]} onPress={() => setShow(!show)}>
                <Text style={[{
                    color: isMandatory ? colors.warningRed : colors.appBlack,
                }, placeholderTextColor]}>{selected ? selected : placeholder ? placeholder : "Please select"}</Text>
                <Image
                    source={Icons.arrowIcon}
                    style={[styles.iconContainer, {
                        tintColor: colors.appBlack,
                        transform: [{ rotate: show ? "0deg" : "180deg" }]
                    }]}
                />
            </TouchableOpacity>
            {
                show &&
                <Modal
                    transparent={true}
                >
                    <Pressable style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: "rgba(10, 10, 10,0.3)"
                    }} onPress={() => setShow(false)}>
                        <View style={[styles.dropDownContainer, {
                            borderColor: isMandatory ? colors.warningRed : colors.borderColor,
                        }]}>
                            <View style={{
                                width: "100%",
                                alignItems: "center",
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 5,
                            }}>
                                <Text style={{
                                    fontSize: 12,
                                    fontWeight: "bold",
                                    color: colors.appBlack,
                                    textAlign: "left",
                                    marginLeft: 10,
                                    width: "60%"
                                }}>{(title?.includes("Select") || secondaryTitle?.includes("Select")) ? `${title || secondaryTitle}` : `Select ${title || secondaryTitle}`}</Text>
                                <TouchableOpacity style={{
                                    width: 40,
                                    height: 40,
                                    alignSelf: "flex-end",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    marginTop: -10,
                                }} onPress={() => setShow(false)}>
                                    <Image
                                        source={Icons.simpleCrossIcon}
                                        style={{
                                            width: 10,
                                            height: 15,
                                            resizeMode: "contain",
                                            tintColor: colors.appBlack
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                            {onSearch && <AppInput
                                placeholder={"Search here"}
                                mainStyle={{ width: "95%", alignSelf: "center" }}
                                onChange={(text) => onSearch && onSearch(text)}
                            />}
                            <FlatList
                                data={results}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.renderContainer} onPress={() => {
                                            setSelected(item[keyToRender])
                                            onChange && onChange(item)
                                            setShow(false)
                                        }}>
                                            <Text style={[styles.itemsText, keyText]}>{keyToRender ? `${item[keyToRender]}` : ""} <Text>{count ? `(${item[count]})` : null}</Text></Text>
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={item => item.id}
                                ListEmptyComponent={() => {
                                    return (
                                        <View style={{
                                            width: "100%",
                                            height: "100%",
                                            justifyContent: "center",
                                            // marginTop: 50
                                        }}>
                                            <Text style={styles.listEmptyComponentText}>No Results Found</Text>
                                        </View>
                                    )
                                }}
                            />
                        </View>
                    </Pressable>
                </Modal>
            }
        </View >
    )
}

export default Picker

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
    },
    innerContainer: {
        width: "100%",
        height: 45,
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
        paddingHorizontal: 15,
        flexDirection: "row",
        borderColor: colors.borderColor,
    },
    iconContainer: {
        width: 12,
        height: 12,
        resizeMode: "contain",
        marginLeft: "auto",
        tintColor: colors.white
    },
    dropDownContainer: {
        width: "70%",
        minHeight: 100,
        maxHeight: 300,
        borderRadius: 5,
        borderColor: colors.borderColor,
        marginTop: 10,
        paddingVertical: 10,
        alignSelf: "center",
        marginLeft: 5,
        zIndex: 1,
        backgroundColor: colors.white
    },
    renderContainer: {
        width: "95%",
        flexDirection: "column",
        alignSelf: "center",
        borderBottomWidth: 1,
        borderColor: colors.borderColor,
        paddingVertical: 10,
    },
    itemsText: {
        color: colors.appBlack,
        paddingTop: 10,
        paddingLeft: 15
    },
    listEmptyComponentText: {
        fontSize: 12,
        color: colors.white,
        textAlign: "center",
    }
})