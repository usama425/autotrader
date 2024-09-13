import React, { useEffect, useState } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../../utils/colors';

const HorizontalFilters = ({
    items,
    onSelect,
    keyToRender,
    defaultValue
}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        if (items) {
            setList(items)
            defaultValue & setList(items?.map((e) => ({
                ...e,
                isSelected: e?.id === defaultValue ? true : false
            })))
        }
    }, [items, defaultValue])

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={list}
                key={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.itemContainer, {
                            backgroundColor: item?.isSelected ? colors?.warningRed : colors.lightWhiteBg,
                        }]}
                            onPress={() => {
                                setList(list?.map((e) => ({
                                    ...e,
                                    isSelected: e?.id === item?.id ? true : false
                                })))
                                onSelect && onSelect(item)
                            }}
                        >
                            <Text style={[styles.keyText, {
                                color: item?.isSelected ? colors.white : colors.appBlack
                            }]}>{`Ghc ${item[keyToRender]}`}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default HorizontalFilters

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        alignItems: "center",
        marginVertical: 5,
        paddingHorizontal: 15
    },
    itemContainer: {
        width: "auto",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 10
    },
    keyText: {
        fontSize: 12,
        fontWeight: "500"
    }
})