import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import colors from '../utils/colors';
import Icons from '../assets/icons';

const CheckboxGroup = ({
    onChange,
    mainStyle,
    items,
    keyToRender,
    title,
    titleAllCaps
}) => {

    const [list, setList] = useState([])

    useEffect(() => {
        items && setList(items)
    }, [items])

    return (
        <View style={[styles.viewContainer, mainStyle]}>
            {title && <Text style={styles.titleStyle}>{titleAllCaps ? title?.toUpperCase() : title}</Text>}
            {
                list && list?.map((item, index) => {
                    return (
                        < TouchableOpacity style={styles.mainContainer} onPress={() => {
                            let tempData = [...list]
                            tempData?.forEach(element => {
                                if (element?.id === item?.id) element.isSelected = !element.isSelected
                            });
                            setList(tempData)
                            onChange && onChange(tempData)
                        }} key={index}>
                            <View style={[styles.boxContainer, {
                                backgroundColor: item?.isSelected ? colors.blueBg : colors.white,
                                borderColor: item?.isSelected ? colors.blueBg : colors.borderColor
                            }]}>
                                <Image
                                    source={Icons.checkIcon}
                                    style={{ width: 15, height: 12, tintColor: colors.white }}
                                    resizeMode="contain"
                                />
                            </View>
                            <Text style={styles.keyStyle}>{keyToRender ? item[keyToRender] : ""}</Text>
                        </TouchableOpacity >
                    )
                })
            }
        </View>
    )
}

export default CheckboxGroup;

const styles = StyleSheet.create({
    viewContainer: {
        width: "100%",
        flexDirection: "column",
        marginVertical: 10,
    },
    titleStyle: {
        fontSize: 14,
        marginBottom: 10,
        fontWeight:"500",
        color: colors.appBlack,
    },
    mainContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    boxContainer: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    keyStyle: {
        fontSize: 14,
        color: colors.appBlack,
        marginLeft: 8
    }
})