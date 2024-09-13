import React from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import { CATEGORY_ICON_URL } from '../../api/config';

const CategoryList = ({
    items,
    keyToRender,
    onSelect,
    iconKeyRender,
    imageUrl,
    dealers
}) => {
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={[styles.listContainer, {
                            borderBottomWidth: item === items[items?.length - 1] ? 0 : 1,
                        }]} onPress={() => onSelect && onSelect(item)}>
                            <Image
                                source={{ uri: `${CATEGORY_ICON_URL}/${item?.icons}` } || Icons.placeholderIcon}
                                alt={item[keyToRender]}
                                style={styles.iconContainer}
                            />
                            <Text style={{
                                color: colors.appBlack,
                                fontSize: 14
                            }}>{keyToRender && dealers ? `Dealer's ${item[keyToRender]}` : keyToRender ? item[keyToRender] : item?.label}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
}

export default CategoryList

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: colors.white
    },
    listContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderColor: colors.borderColor
    },
    iconContainer: {
        width: 40,
        height: 40,
        resizeMode: "contain",
        marginRight: 10
    }
})