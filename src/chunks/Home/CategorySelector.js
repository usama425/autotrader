import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from 'react-native';
import colors from '../../utils/colors';

const CategorySelector = ({
    items,
    keyToRender,
    onChange
}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        items && setList(items)
    }, [items])

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                horizontal
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.selectorButton, {
                            borderColor: item?.isSelected ? colors?.warningRed : colors.white,
                            backgroundColor: item?.isSelected ? colors.warningRed : "transparent"
                        }]}
                            onPress={() => {
                                let tempData = [...list]
                                tempData?.forEach(element => {
                                    element?.id === item?.id ? element.isSelected = true : element.isSelected = false
                                });
                                onChange && onChange(item[keyToRender])
                                setList(tempData)
                            }}>
                            <Text style={styles.keyText}>{keyToRender ? item[keyToRender]?.toUpperCase() : ""}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default CategorySelector

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
    },
    selectorButton: {
        width: "auto",
        padding: 10,
        borderWidth: 1,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    keyText: {
        fontSize: 12,
        color: colors.white,
        fontWeight: "400"
    }
})