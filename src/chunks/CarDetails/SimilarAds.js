import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import colors from '../../utils/colors';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import CustomImageComponent from '../../components/CustomImageComponent';
import { IMAGEURL } from '../../api/config';

const SimilarAds = ({
    items,
    onPress,
    slug
}) => {

    const [list, setList] = useState()

    useEffect(() => {
        items && setList(items)
    }, [items])

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.renderContainer} onPress={() => onPress && onPress(item)}>
                <CustomImageComponent
                    source={`${IMAGEURL}/${slug}/${item?.main_image}`}
                    mainStyle={styles.imageContainer}
                />
                <View style={styles.infoConatiner}>
                    <Text style={styles.listingTitleText}>{item?.name || "--"}</Text>
                    <Text style={styles.listingPriceText}>{`GH₵ ${item?.price}`}</Text>
                    <Text style={styles.mileageText}>--</Text>
                    {/* <Text style={[styles.mileageText, {
                        marginTop: 10
                    }]}>{`2017 | 143,000 km | Petrol`}</Text> */}
                    <View style={styles.additionalInfoRowContainer}>
                        {item?.mileage && <View style={styles.iconInfoContainer}>
                            <Image
                                source={Icons.carMeterIcon}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.mileageText}>{`${item?.mileage}` ||"--"}</Text>
                        </View>}
                        <View style={styles.iconInfoContainer}>
                            <Image
                                source={Icons.mapPinIcon}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.mileageText}>{item?.region_name?.substring(0, 20).concat("...") || "--"}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }

    return (
        <ScrollView style={{
            width: "100%",
        }}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
        >
            <FlatList
                data={list}
                renderItem={renderItem}
                contentContainerStyle={styles.mainContainer}
                horizontal={true}
                pagingEnabled={true}
                keyExtractor={item => item.id}
            />
        </ScrollView>
    )
}

export default SimilarAds

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%"
    },
    renderContainer: {
        width: 200,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colors.borderColor,
        marginRight: 15
    },
    imageContainer: {
        width: "100%",
        height: 100,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10
    },
    infoConatiner: {
        width: "100%",
        padding: 10,
        marginTop: 5
    },
    listingTitleText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.appGolden
    },
    listingDescText: {
        fontSize: 14,
        color: colors.appInputTextColor,
        marginVertical: 5
    },
    listingPriceText: {
        fontSize: 16,
        marginVertical: 10,
        fontWeight: "bold",
        color: colors.appBlack
    },
    mileageText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 5
    },
    additionalInfoRowContainer: {
        width: "auto",
        padding: 5,
        marginTop: 5,
        flexDirection: "row"
    },
    iconInfoContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginVertical: 5
    },
    infoIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
})