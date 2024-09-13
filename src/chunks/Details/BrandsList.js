import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import { MAKE_ICON_URL, PARTSURL } from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';

const BrandsList = ({
    items,
    keyToRender,
    onPress,
    baseURL,
    alternate,
    imageStyle,
    defaultValue,
    textStyle,
    slug
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
    }, [items])

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={list}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {


                    return (
                        <View style={{
                            width: "auto",
                            flexDirection: "row"
                        }}>
                            <TouchableOpacity style={styles.renderContainer} onPress={() => {
                                setList(list?.map((e) => ({
                                    ...e,
                                    isSelected: e?.id === item?.id ? true : false
                                })))
                                onPress && onPress(item?.id)
                            }}>
                                <CustomImageComponent
                                    source={slug? `${PARTSURL}/${slug}/${item?.image}`:`${baseURL}/${item?.image}`}
                                    alternate={alternate}
                                    mainStyle={[{
                                        width: 60,
                                        height: 60,
                                        resizeMode: "contain",
                                    },
                                        imageStyle]}
                                />
                                <Text style={[styles.keyText, textStyle, {
                                    color: item?.isSelected ? colors.warningRed : colors.appBlack,
                                }]}>{item[keyToRender]}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
        </View>
    )
}

export default BrandsList

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        alignItems: "center",
        paddingBottom: 20,
        paddingTop: 10,
        paddingHorizontal: 15
    },
    renderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 10,
    },
    keyText: {
        fontSize: 12,
        textAlign: "center",
    },
})