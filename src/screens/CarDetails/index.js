import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    FlatList,
    Modal,
    TouchableOpacity,
    Dimensions,
    Linking,
} from 'react-native';
import styles from './styles';
import ImageHeader from '../../chunks/CarDetails/ImageHeader';
import Icons from '../../assets/icons';
import BoxContainer from '../../chunks/CarDetails/BoxContainer';
import AppButton from '../../components/AppButton';
import colors from '../../utils/colors';
import SimilarAds from '../../chunks/CarDetails/SimilarAds';
import Carousel from 'react-native-snap-carousel';
import AppHeader from '../../components/AppHeader';
import Loader from '../../components/Loader';
import { fetchListingById, fetchListingImages, relatedPosts } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import { IMAGEURL } from '../../api/config';
import Toast from 'react-native-toast-message';
import CustomImageComponent from '../../components/CustomImageComponent';

const safetyTips = [
    "Remember, don't share your password with anyone.",
    "Meet the seller at a safe public place where possible.",
    "Inspect the vehicle or goods to ensure they meet your requirements.",
    "Check all related documentation and only pay when you're satisfied.",
    "Report all fraudulent activities to your local police department.",
]


const CarDetails = ({ navigation, route }) => {

    const { id, categoryId, slug, makeId } = route?.params
    const isFocused = useIsFocused()
    const carouselRef = useRef()
    const scrollRef = useRef()
    const [loading, setLoading] = useState(false)
    const [details, setDetails] = useState()
    const [showContact, setShowContact] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [imageList, setImageList] = useState([])
    const [showTips, setShowTips] = useState(false)
    const [relatedPostList, setRelatedPostList] = useState([])
    const [listingImages, setListingImages] = useState([])

    useEffect(() => {
        if (isFocused && id) {
            getPostImages(id)
            getDetails(id)
        }
        if (isFocused && categoryId) {
            getRelatedPosts(categoryId, makeId)
        }
    }, [isFocused])


    const getDetails = async (id) => {
        setLoading(true)
        try {
            const response = await fetchListingById(id)
            if (response?.status === 200) if (response?.data?.status === "200") setDetails(response?.data?.Listings)
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Something went wrong")
        } setLoading(false)
    }
    const getPostImages = async (id) => {
        setLoading(true)
        try {
            const response = await fetchListingImages(id)
            if (response?.status === 200) {
                if (response?.data?.status === "200") setListingImages(response?.data?.data)
            }
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getRelatedPosts = async (category_id, make_id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("categoryId", category_id)
            formData.append("makeId", make_id)
            const response = await relatedPosts(formData)
            if (response?.status === 200) setRelatedPostList(response?.data?.data)
        } catch (error) {
            showToast("error", error?.response?.data?.message || "Something went wrong")
        } setLoading(false)
    }

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.renderContainer}>
                <View style={styles.roundContainer}>
                    <Image
                        source={Icons.backArrowIcon}
                        style={styles.arrowIcon}
                    />
                </View>
                <Text style={styles.featureLabelText}>{item}</Text>
            </View>
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
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                leftIcon={Icons.backArrowIcon}
                title={details?.name?.substring(0, 20).concat("...")}
                onLeftIconPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.innerContainer}
                alwaysBounceVertical={true}
                ref={scrollRef}

            >
                <ImageHeader
                    slug={slug}
                    postImages={listingImages}
                    onImagePress={(list) => {
                        setImageList(list)
                        setShowModal(true)
                    }}
                />

                <View style={styles.infoContainer}>
                    <Text style={styles.titleText}>{details?.name || "--"}</Text>
                    <Text style={styles.priceText}>{`GH₵ ${formatPrice(details?.price)}` || "--"}</Text>
                    <View style={styles.locationRowContainer}>
                        <Image
                            source={Icons.mapPinIcon}
                            style={styles.mapIcon}
                        />
                        <Text style={styles.locationText}>{details?.region_name || "--"}</Text>
                    </View>
                    <View style={styles.locationRowContainer}>
                        <Image
                            source={Icons.calendarIcon}
                            style={styles.calenderIconStyle}
                        />
                        <Text style={styles.locationText}>{details?.year || "--"}</Text>
                        <Image
                            source={Icons.showPassword}
                            style={[styles.calenderIconStyle, {
                                marginLeft: 10
                            }]}
                        />
                        <Text style={styles.locationText}>{details?.views || "--"}</Text>
                    </View>
                    <BoxContainer title={"Vehicle Description:"}>
                        <View style={styles.descRowContainer}>
                            <View style={styles.descLeftContainer}>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Make:</Text>
                                    <Text style={styles.descEntityText}>{details?.make_name || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Body Type:</Text>
                                    <Text style={styles.descEntityText}>{details?.body_type_name || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Year:</Text>
                                    <Text style={styles.descEntityText}>{details?.year || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Color:</Text>
                                    <Text style={styles.descEntityText}>{details?.color || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Fuel:</Text>
                                    <Text style={styles.descEntityText}>{details?.fuel || "--"}</Text>
                                </View>
                            </View>
                            <View style={styles.descRightContainer}>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Model:</Text>
                                    <Text style={styles.descEntityText}>{details?.model_name || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Condition:</Text>
                                    <Text style={styles.descEntityText}>{details?.v_condition || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Mileage:</Text>
                                    <Text style={styles.descEntityText}>{details?.mileage || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Transmission:</Text>
                                    <Text style={styles.descEntityText}>{details?.transmission || "--"}</Text>
                                </View>
                                <View style={styles.leftRowContainer}>
                                    <Text style={styles.descEntityTextHeading}>Engine Capcity:</Text>
                                    <Text style={styles.descEntityText}>{details?.engine_capacity || "--"}</Text>
                                </View>
                            </View>
                        </View>
                    </BoxContainer>
                    <BoxContainer title={"Seller's Comments:"}>
                        <View style={styles.descView}>
                            <Text style={styles.descText}>{details?.description || "--"}</Text>
                        </View>
                    </BoxContainer>
                    <BoxContainer title={"Vehicle Features:"}>
                        <View style={styles.descView}>
                            <FlatList
                                data={details?.additional_features || []}
                                keyExtractor={(item, index) => index}
                                renderItem={renderItem}
                                numColumns={2}
                                contentContainerStyle={{
                                    width: "100%",
                                }}
                                ListEmptyComponent={() => {
                                    if (loading) return
                                    else {
                                        return (
                                            <Text style={{ color: colors.appBlack }}>--</Text>
                                        )
                                    }
                                }}
                            />
                        </View>
                    </BoxContainer>
                    <BoxContainer title={"Seller's Detail:"}>
                        <View style={styles.descView}>
                            <Text style={styles.sellerNameText}>{details?.company_name || "--"}</Text>
                            <Text style={styles.memberDateText}>{details?.member_since || "Member Since --"}</Text>
                            <AppButton
                                title={`Visit Dealer's Home Page`}
                                mainStyle={styles.visiButtonStyle}
                                onPress={() => {
                                    navigation.navigate("DealerPage", {
                                        id: details?.user_id,
                                        companyName: details?.company_name,
                                        memberSince: details?.member_since,
                                        region: details?.region_name,
                                        subRegion: details?.subregion_name,
                                        categoryId: categoryId,
                                        companyDescription: details?.company_description,
                                        businessHours: details?.business_hours,
                                        slug: slug,
                                    })
                                }}
                            />
                        </View>
                    </BoxContainer>
                    <BoxContainer title={"Contact the Seller:"}>
                        <View style={styles.descView}>
                            <AppButton
                                title={showContact ? `${details?.whatsapp}` : "Show Contact Number"}
                                mainStyle={{ backgroundColor: colors.warningRed }}
                                onPress={() => setShowContact(true)}
                            />
                            <AppButton
                                title={"Messsage Seller"}
                                leftIcon={Icons.whatsappIcon}
                                mainStyle={{ marginTop: 10, backgroundColor: colors.whatsappGreen }}
                                onPress={() => {
                                    let url =
                                        `whatsapp://send?phone=${details?.whatsapp}`
                                    Linking.openURL(url)
                                        .then((data) => {
                                            console.log('WhatsApp Opened');
                                        })
                                        .catch(() => {
                                            alert('Make sure Whatsapp installed on your device');
                                        });
                                }}
                            />
                        </View>
                    </BoxContainer>
                    <TouchableOpacity style={styles.arrowButtonContainer} onPress={() => setShowTips(!showTips)}>
                        <Text>{showTips ? `Hide Safety Tips` : `Show Safety Tips`}</Text>
                        <Image
                            source={Icons.arrowIcon}
                            style={{
                                width: 15,
                                height: 15,
                                resizeMode: "contain",
                                transform: [{ rotate: showTips ? "0deg" : "180deg" }]
                            }}
                        />
                    </TouchableOpacity>
                    {showTips && <BoxContainer title={"Autotrader Safety Tips:"}>
                        <View style={styles.descView}>
                            {
                                safetyTips?.map((text, index) => {
                                    return (
                                        <View style={{
                                            width: "100%",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            marginVertical: 10
                                        }} key={index}>
                                            <Text style={styles.bulletText}>{'\u2B24'}</Text>
                                            <Text style={{
                                                fontSize: 12,
                                                color: colors.appBlack,
                                                marginLeft: 10,
                                            }}>{text}</Text>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    </BoxContainer>}
                    <Text style={styles.relatedText}>Related Listings</Text>
                    {!relatedPostList ? <Text style={{ color: colors.appBlack }}>No Result Found</Text>
                        :
                        <SimilarAds
                            slug={slug}
                            items={relatedPostList}
                            onPress={(item) => {
                                navigation.goBack()
                                navigation.navigate("CarDetails", { id: item?.id, categoryId: categoryId, slug: slug, makeId: item?.make_id })
                            }}
                        />}
                </View>
            </ScrollView>
            <Modal
                visible={showModal}
                animationType="slide"
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.crossButtonContainer} onPress={() => setShowModal(false)}>
                        <Image
                            source={Icons.simpleCrossIcon}
                            style={{
                                width: 15,
                                height: 15,
                                resizeMode: "contain",
                                tintColor: colors.white
                            }}
                        />
                    </TouchableOpacity>
                    <View style={styles.innerContainerContainer}>
                        <Carousel
                            ref={carouselRef}
                            data={imageList}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <View style={{ width: 400 }}>
                                        <CustomImageComponent
                                            mainStyle={styles.coverImage}
                                            source={`${IMAGEURL}/${slug}/${item?.name}`}
                                        />
                                    </View>
                                )
                            }}

                            sliderWidth={Dimensions.get("window").width}
                            itemWidth={Dimensions.get("window").width}
                        />
                    </View>
                </View>
            </Modal>
            <Toast />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default CarDetails
