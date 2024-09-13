import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../utils/colors';

const RadioGroup = ({
    items,
    defaultValue,
    onChange,
    title,
    titleAllCaps,
    showMandatoryStar,
    keyToRender,
    direction,
    disabled,
    noOfColumns,
    mainStyle,
    titleCustomStyle,
    keyToCompare,
    count
}) => {

    const [selected, setSelected] = useState("")

    useEffect(() => {
        if (defaultValue) {
            setSelected(defaultValue)
        }
    }, [defaultValue])


    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity disabled={disabled} style={styles.innerRowContainer}
                onPress={() => {
                    setSelected(item.id || item[keyToCompare]);
                    onChange && onChange(item)
                }}
            >
                <View style={[styles.mainRoundContainer, { borderColor: selected === item?.id || selected === item[keyToCompare] ? colors.blueBg : colors.borderColor }]}>
                    {(selected === item?.id || selected === item[keyToCompare]) && <View style={styles.selectedContainer}></View>}
                </View>
                {item[keyToRender]?.length >= 20 ?
                    <Text style={styles.keyText}>{keyToRender ? item[keyToRender]?.substring(0, 50)?.concat("...") : ""}</Text>
                    :
                    <Text style={styles.keyText}>{keyToRender ? item[keyToRender] : ""} <Text>{count ? `(${item[count]})` : null}</Text></Text>}
            </TouchableOpacity>
        )
    }

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {title && <Text style={[styles.titleStyle, titleCustomStyle]}>{titleAllCaps ? title?.toUpperCase() : title}<Text style={{ color: colors.warningRed }}>{showMandatoryStar ? "*" : ""}</Text></Text>}
            {noOfColumns ? <FlatList
                data={items}
                keyExtractor={(item, index) => index}
                renderItem={renderItem}
                numColumns={noOfColumns}
                contentContainerStyle={{
                    width: "100%",
                }}
            /> :
                <View style={{
                    width: "auto",
                    flexDirection: direction === "row" ? "row" : "column"
                }}>
                    {
                        items && items?.map((item, index) => {
                            return (
                                <TouchableOpacity disabled={disabled} style={styles.innerRowContainer}
                                    key={index}
                                    onPress={() => {
                                        setSelected(item.id || item[keyToCompare]);
                                        onChange && onChange(item)
                                    }}
                                >
                                    <View style={[styles.mainRoundContainer, { borderColor: selected === item?.id || selected === item[keyToCompare] ? colors.blueBg : colors.borderColor }]}>
                                        {(selected === item?.id || selected === item[keyToCompare]) && <View style={styles.selectedContainer}></View>}
                                    </View>
                                    <Text style={styles.keyText}>{keyToRender ? item[keyToRender] : ""} <Text>{count ? `(${item[count]})` : null}</Text></Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>}
        </View>
    )
}

export default RadioGroup

const styles = StyleSheet.create({
    mainContainer: {
        width: "auto",
    },
    titleStyle: {
        fontSize: 14,
        marginBottom: 10,
        color: colors.appBlack,
    },
    innerRowContainer: {
        width: 180,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5
    },
    mainRoundContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100
    },
    selectedContainer: {
        width: 12,
        height: 12,
        borderRadius: 100,
        backgroundColor: colors.blueBg
    },
    keyText: {
        marginHorizontal: 10,
        color: colors.appBlack
    }
})