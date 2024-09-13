import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Icons from '../../assets/icons';
import colors from '../../utils/colors';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchDealerListing } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import { IMAGEURL } from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';

const MyAdverts = ({ navigation }) => {

    const { userId } = useSelector(state => state.userSession)

    const isFocused = useIsFocused()
    const [list, setList] = useState()
    const [loading, setLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (isFocused && userId) getList(userId)
    }, [isFocused, pageNumber])


    const getList = async (id) => {
        setLoading(true)
        try {
            const response = await fetchDealerListing(id)
            if (response?.status === 200) {
                if (response?.data?.status === "200") {
                    if (isScrolling) setList(list?.concat(response?.data?.Listings))
                    else setList(response?.data?.Listings)
                }
            }
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Something went wrong")
        } setLoading(false)
    }

    const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
            contentSize.height - paddingToBottom;
    };

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
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
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                title={"My Adverts"}
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
            />
            <View style={styles.innerContainer}>

                <ScrollView style={{
                    width: "100%",
                    height: "90%"
                }}
                    onScroll={({ nativeEvent }) => {
                        if (isCloseToBottom(nativeEvent)) {
                            if (loading || isScrolling || list?.length <= 6) return
                            else {
                                setPageNumber(parseInt(pageNumber + 1))
                                setIsScrolling(true)
                            }
                        }
                    }}
                    scrollEventThrottle={400}
                >

                    {list && list?.map((item, index) => {
                        return (
                            <TouchableOpacity style={{
                                width: "100%",
                                borderWidth: 1,
                                borderRadius: 5,
                                borderColor: colors.borderColor,
                                flexDirection: "row",
                                alignSelf: "center",
                                alignItems: "center",
                                marginVertical: 5,
                                shadowColor: '#171717',
                                shadowOffset: { width: -2, height: 4 },
                                shadowOpacity: 0.1,
                                shadowRadius: 3,
                                paddingHorizontal: 10,
                                backgroundColor: colors.white
                            }} onPress={() => navigation.navigate("CarDetails", { id: item?.listing_id, categoryId: item?.category_id, slug: item?.category_name?.toLowerCase() })
                            } key={index}>
                                <CustomImageComponent
                                    source={`${IMAGEURL}/${item?.category_slug?.toLowerCase()}/${item?.main_image}`}
                                    mainStyle={{
                                        borderRadius: 10
                                    }}
                                />
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
                                    }}>{item?.description?.substring(0, 20)?.concat("...") || "--"}</Text>
                                    <Text style={{
                                        fontSize: 16,
                                        fontWeight: "bold",
                                        color: colors.appBlack
                                    }}>{`GH₵ ${formatPrice(item?.price)}` || "--"}</Text>
                                    <View style={{
                                        width: "auto",
                                        flexDirection: "row",
                                        alignItems: "center",
                                        padding: 5,
                                        marginTop: 5,
                                    }}>
                                        {item?.mileage && <View style={{
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
                                        </View>}
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
                                            }}>{item?.region_name || "--"}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }

                    {(list && list?.length <= 0) && (!loading) && <View style={styles.emptyContainer}>
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

                </ScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default MyAdverts;
