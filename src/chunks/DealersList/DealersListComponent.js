import React, { useEffect, useState, useRef } from 'react';
import {
    FlatList,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import { PROFILEIMAGEURL } from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';

const DealersListComponent = ({
    navigation,
    categoryId,
    categoryName,
    data,
    onEndReached,
    slug,
    loading,
    pageNumber
}) => {

    const flatListRef = useRef(null);

    const [list, setList] = useState([])

    useEffect(() => {
        data && setList(data)
    }, [data])

    useEffect(() => {
        if (pageNumber === 1) flatlistScrollToTop()
    }, [pageNumber])

    const flatlistScrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.mainContainer}>
                <View style={styles.renderContainer}>
                    <CustomImageComponent
                        source={`${PROFILEIMAGEURL}/${item?.image}`}
                        mainStyle={styles.imageContainer}
                        nameAlternateText={item?.company_name}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.listingTitleText}>{item?.company_name}</Text>
                        <Text style={styles.listingDescText}>{item?.company_description?.substring(0, 30).concat("...")}</Text>
                        <View style={styles.bottomRowContainer}>
                            <View style={styles.iconInfoContainer}>
                                <Image
                                    source={Icons.mapPinIcon}
                                    style={styles.infoIcon}
                                />
                                <Text style={styles.infoText}>{`${item?.subregion_name}, ${item?.region_name}`}</Text>
                            </View>
                            <View style={styles.iconInfoContainer}>
                                <Image
                                    source={Icons.busIcon}
                                    style={styles.infoIcon}
                                />
                                <Text style={styles.infoText}>{`${item?.Cars_listed} ${categoryName} Listed`}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.viewButton} onPress={() => {
                    navigation.navigate("DealerPage", {
                        id: item?.id,
                        companyName: item?.company_name,
                        memberSince: item?.member_since,
                        region: item?.region_name,
                        subRegion: item?.subregion_name,
                        categoryId: categoryId,
                        companyDescription: item?.company_description,
                        businessHours: item?.business_hours,
                        slug: slug
                    })
                }}>
                    <Text style={styles.viewButtonTitle}>{`View all ${categoryName}`}</Text>
                    <Image
                        source={Icons.rightDoubleArrowIcon}
                        style={{
                            width: 18,
                            height: 18,
                            resizeMode: "contain",
                            marginLeft: 5,
                            tintColor: colors.white
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <FlatList
            ref={flatListRef}
            data={list}
            keyExtractor={(item, index) => index}
            renderItem={renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={onEndReached}
            ListEmptyComponent={() => {
                if (loading) return null
                else {
                    return (
                        <View style={styles.emptContainer}>
                            <Image
                                source={Icons.noDataFound}
                                style={{
                                    width: 80,
                                    height: 80,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={styles.emptyText}>{"Results not found"}</Text>
                        </View>
                    )
                }
            }}
        />
    )
}

export default DealersListComponent

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderColor,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: colors.white,
        marginVertical: 5,
        padding: 10,
    },
    renderContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
    },
    imageContainer: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        borderRadius: 5,
    },
    infoContainer: {
        flex: 1,
        marginLeft: 10,
        flexDirection: "column",
        padding: 5
    },
    listingTitleText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.appBlack
    },
    listingDescText: {
        fontSize: 14,
        color: colors.appInputTextColor,
        marginVertical: 5
    },
    listingPriceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.appBlack
    },
    bottomRowContainer: {
        width: "100%",
        marginTop: "auto",
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
    infoText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 5,
    },
    viewButton: {
        width: "100%",
        height: 50,
        marginVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.appGolden,
        borderRadius: 5,
    },
    viewButtonTitle: {
        color: colors.white,
        fontWeight: "600"
    },
    emptContainer: {
        width: "100%",
        height: 500,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        color: colors.appBlack,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    }
})