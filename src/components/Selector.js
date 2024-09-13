import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import colors from '../utils/colors';

const Selector = ({
    items,
    keyToRender,
    mainStyle,
    defaultValue
}) => {

    const [options, setOptions] = useState([])

    useEffect(() => {
        items && setOptions(items)
        defaultValue && setOptions(items.map(element => ({ ...element, isSelected: element.id === defaultValue })));
    }, [items, defaultValue])

    return (
        <View style={[styles.mainContainer, mainStyle]}>
            {
                options && options?.map((item, index) => {
                    return (
                        <View style={[styles.selectorContainer, {
                            backgroundColor: item?.isSelected ? colors.greenBg : colors.white
                        }]} key={index}>
                            <Text style={[styles.keyText, {
                                color: item?.isSelected ? colors.white : colors?.appInputTextColor
                            }]}>{keyToRender ? item[keyToRender] : ""}</Text>
                        </View>
                    )
                })
            }
        </View >
    )
}

export default Selector

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        minHeight: 60,
        maxHeight: 100,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderColor,
        flexDirection: "row",
        alignItems: "center"
    },
    selectorContainer: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        padding: 15
    },
    keyText: {
        fontSize: 14,
        fontWeight: "600",
    }
})