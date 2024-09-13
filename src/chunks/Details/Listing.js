import React, { useEffect, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    Dimensions
} from 'react-native';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import CustomImageComponent from '../../components/CustomImageComponent';
import { IMAGEURL } from '../../api/config';

const Listing = ({
    items,
    onPress,
    numberOfColumns,
    onEndReached,
    slug,
    loading,
    pageNumber,
    customSrc
}) => {

    const scrollViewRef = useRef(null);
    const flatListRef = useRef(null);
    const [list, setList] = useState([])


    useEffect(() => {
        items && setList(items)
    }, [items])

    useEffect(() => {
        if (pageNumber === 1) {
            scrollToTop()
            flatlistScrollToTop()
        }
    }, [pageNumber])

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const scrollToTop = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const flatlistScrollToTop = () => {
        if (flatListRef.current) {
            flatListRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };


    const renderItem = ({ item }) => {

        return (
            <TouchableOpacity style={styles.renderContainer} onPress={() => onPress && onPress(item)}>
                <CustomImageComponent
                    source={`${IMAGEURL}/${slug}/${item?.main_image}`}
                    mainStyle={styles.listingImage} />
                <View style={styles.infoContainer}>
                    <Text style={styles.listingTitleText}>{item?.name?.substring(0, 20).concat("...") || "--"}</Text>
                    <Text style={styles.listingDescText}>{item?.class?.substring(0, 30).concat("...") || "--"}</Text>
                    <Text style={styles.listingPriceText}>{`GH₵ ${formatPrice(item?.price)}` || "--"}</Text>
                    <View style={styles.additionalInfoRowContainer}>
                        <View style={styles.iconInfoContainer}>
                            <Image
                                source={Icons.carMeterIcon}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.mileageText}>{`${item?.mileage} km`}</Text>
                        </View>
                        <View style={styles.iconInfoContainer}>
                            <Image
                                source={Icons.mapPinIcon}
                                style={styles.infoIcon}
                            />
                            <Text style={styles.mileageText}>{item?.region_name?.substring(0, 20).concat("...") || "--"}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    function formatPrice(price) {
        if (price !== undefined && price !== null) {
            // Convert price to a string and add commas
            const formattedPrice = parseFloat(price).toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2
            });
            return `${formattedPrice}`;
        }
        return "0.00"; // Default value or handle as needed
    }


    return (
        <>
            {!loading && list && list?.length <= 0 &&
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
                </View>}
            {numberOfColumns === 2 ? <FlatList
                ref={flatListRef}
                data={list}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                numColumns={2}
                contentContainerStyle={{
                    width: "100%",
                    padding: 10,
                    alignItems: "center",
                }}
                onEndReached={() => onEndReached && onEndReached()}
            /> :
                <ScrollView
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            onEndReached && onEndReached()
                        }
                    }}
                    ref={scrollViewRef}
                    scrollEventThrottle={400}
                >
                    {
                        list && list?.map((item, index) => {
                            return (
                                <TouchableOpacity style={{
                                    width: "90%",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    borderColor: colors.borderColor,
                                    flexDirection: "row",
                                    alignSelf: "center",
                                    marginVertical: 5,
                                    shadowColor: '#171717',
                                    shadowOffset: { width: -2, height: 4 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 3,
                                    backgroundColor: colors.white
                                }} onPress={() => onPress && onPress(item)} key={index}>
                                    <CustomImageComponent
                                        source={customSrc ? `${IMAGEURL}/${item?.cat_slug}/${item?.main_image}` : `${IMAGEURL}/${slug}/${item?.main_image}`}
                                        mainStyle={{
                                            width: 100,
                                            height: 100,
                                            resizeMode: "cover",
                                            alignSelf: "center",
                                            marginLeft: 10,
                                            borderRadius: 15

                                        }} />
                                    <View style={{
                                        width: "auto",
                                        padding: 10
                                    }}>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "500",
                                            color: colors.appGolden
                                        }}>{item?.name?.substring(0, 20).concat("...") || "--"}</Text>
                                        <Text style={{
                                            fontSize: 14,
                                            color: colors.appInputTextColor,
                                            marginVertical: 5
                                        }}>{item?.class?.substring(0, 30).concat("...") || "--"}</Text>
                                        <Text style={{
                                            fontSize: 16,
                                            fontWeight: "bold",
                                            color: colors.appBlack
                                        }}>
                                            {`GH₵ ${formatPrice(item?.price)}` || "--"}
                                        </Text>
                                        <View style={{
                                            width: "auto",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            padding: 5,
                                            marginTop: 5,
                                        }}>
                                            {item?.mileage ? <View style={{
                                                width: "auto",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                marginRight: 10
                                            }}>
                                                <Image
                                                    source={Icons.carMeterIcon}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        resizeMode: "contain"
                                                    }}
                                                />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: colors.appBlack,
                                                    marginLeft: 5,
                                                }}>{`${item?.mileage} km` || "--"}</Text>
                                            </View> : null}
                                            <View style={styles.iconInfoContainer}>
                                                <Image
                                                    source={Icons.mapPinIcon}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        resizeMode: "contain"
                                                    }}
                                                />
                                                <Text style={{
                                                    fontSize: 12,
                                                    color: colors.appBlack,
                                                    marginLeft: 5,
                                                }}>{item?.region_name?.substring(0, 20).concat("...") || "--"}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            }
        </>
    )
}

export default Listing

const styles = StyleSheet.create({
    renderContainer: {
        width: Math.floor(Dimensions.get("window").width / 2.2),
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderColor,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: colors.white,
        marginHorizontal: 10,
        marginVertical: 10
    },
    listingImage: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
        alignSelf: "center",
    },
    infoContainer: {
        width: "auto",
        padding: 10,
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
        fontWeight: "bold",
        color: colors.appBlack
    },
    additionalInfoRowContainer: {
        width: "auto",
        padding: 5,
        marginTop: 5,
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
    mileageText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 5,
    },
    emptContainer: {
        width: "100%",
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