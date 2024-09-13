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
import AppButton from "../../components/AppButton";
import colors from '../../utils/colors';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchDealerListing } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import { IMAGEURL } from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';

const DealerPage = ({ navigation, route }) => {

    const { id, companyName, memberSince, region, subRegion, categoryId, companyDescription, businessHours, slug } = route?.params

    const isFocused = useIsFocused()
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const [pageNumber, setPageNumber] = useState(1)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        if (isFocused) getList(id)
    }, [isFocused, id, pageNumber])


    const getList = async (id) => {
        const formData = new FormData()
        formData.append("category_id", categoryId)
        setLoading(true)
        try {
            const response = await fetchDealerListing(formData, id, pageNumber)
            if (response?.status === 200) {
                if (response?.data?.status === "200" && response?.data?.Listings?.length > 0) {
                    isScrolling ? setList(list?.concat(response?.data?.Listings)) : setList(response?.data?.Listings)
                }
            }
        } catch (error) {
            showToast("error", `${error?.response?.data?.message}` || "Something went wrong")
        } finally {
            setIsScrolling(false)
            setLoading(false)
        }
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
                title={companyName}
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
                                setPageNumber((prevPage) => prevPage + 1);
                                setIsScrolling(true)
                            }
                        }
                    }}
                    scrollEventThrottle={400}
                >
                    <View style={styles.boxContainer}>
                        <AppButton
                            disabled={true}
                            title={companyName || "--"}
                        />
                        <Text style={styles.tagLine}>{companyDescription || "--"}</Text>
                        {subRegion || region ? <Text style={styles.labelText}>{"Location:"} <Text style={styles.labelDefText}>{`${subRegion} ${region}` || "--"}</Text></Text> : null}
                        {memberSince ? <Text style={styles.labelText}>{"Member Since:"} <Text style={styles.labelDefText}>{memberSince || "--"}</Text></Text> : null}
                        {businessHours ? <Text style={styles.labelText}>{"Business Hours:"} <Text style={styles.labelDefText}>{businessHours || "--"}</Text></Text> : null}
                    </View>

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
                            }} onPress={() => navigation.navigate("CarDetails", { id: item?.listing_id, categoryId: categoryId, slug: slug })
                            } key={index}>
                                <CustomImageComponent
                                    source={`${IMAGEURL}/${item?.category_slug}/${item?.main_image}`}
                                    mainStyle={{
                                        width: 100,
                                        height: 100,
                                        resizeMode: "cover",
                                        borderRadius: 5,
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
                                            }}>{item?.region_name || "--"}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                    }

                    {(list && list?.length <= 0) && (!loading) && <Text style={{
                        color: colors.appBlack,
                        fontSize: 14,
                        textAlign: 'center',
                        marginTop: "50%"
                    }}>{"No results available"}</Text>}

                </ScrollView>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default DealerPage;
