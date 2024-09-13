import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
    TouchableOpacity,
    ScrollView,
    Modal,
    FlatList
} from 'react-native';
import styles from './styles';
import Icons from '../../assets/icons';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import Filters from '../../chunks/Details/Filters';
import Toast from 'react-native-toast-message';
import Listing from '../../chunks/Details/Listing';
import HorizontalFilters from '../../chunks/Details/HorizontalFilters';
import BrandsList from '../../chunks/Details/BrandsList';
import Picker from '../../components/Picker';
import colors from '../../utils/colors';
import { fetchAllParts, fetchBodyTypes, fetchMakes, fetchMakesForHomeScreen, fetchRegions } from '../../api/methods/auth';
import AppHeader from '../../components/AppHeader';
import { BASE_URL, MAKE_ICON_URL, PARTTYPEIMAGEURL } from '../../api/config';

const listingPricing = [
    { id: "1", label: "25k", value: "25000" },
    { id: "2", label: "25 - 50k", value: "25000", value2: "50000" },
    { id: "3", label: "75k", value: "75000" },
    { id: "4", label: "75 - 100k", value: "75000", value2: "100000" },
    { id: "5", label: "125k", value: "125000" },
    { id: "6", label: "125 - 150k", value: "125000", value2: "150000" },
    { id: "7", label: "175k", value: "175000" },
    { id: "8", label: "175 - 200k", value: "175000", value2: "200000" },
]

const partsPricing = [
    { id: "1", label: "100", value: "100" },
    { id: "2", label: "350", value: "350" },
    { id: "3", label: "850", value: "850" },
    { id: "4", label: "5000", value: "5000" },
]

const Details = ({ navigation, route }) => {

    const { categoryId, slug } = route?.params
    const rbRef = useRef()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [numberOfColumns, setNumberOfColumns] = useState(1)
    const [listing, setListing] = useState([])
    const [regionsList, setRegionsList] = useState([])
    const [makesList, setMakesList] = useState([])
    const [listingMakesList, setListingMakesList] = useState([])
    const [bodyTypes, setBodyTypes] = useState([])
    const [partsList, setPartsList] = useState([])

    const [pageNumber, setPageNumber] = useState(1)
    const [selectedFilters, setSelectedFilters] = useState()
    const [selectedPrice, setSelectedPrice] = useState("")
    const [isScrolling, setIsScrolling] = useState(false)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        isFocused && setSelectedFilters(null)
    }, [isFocused])

    useEffect(() => {
        if (isFocused) {
            getAllRegions()
            if (categoryId) {
                getListingMakes(categoryId)
                getBodyTypes(categoryId)
                if (categoryId === 7) {
                    getAllParts()
                } else getMakesList(categoryId)
            }
        }
    }, [isFocused, selectedFilters])

    useEffect(() => {
        searchListing("", "")
    }, [selectedFilters, pageNumber])

    const searchListing = async () => {
        const formData = new FormData()
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        setLoading(true)
        formData.append("region_id", selectedFilters?.region_id || "");
        formData.append("subregion_id", selectedFilters?.subregion_id || "");
        formData.append("category_id", categoryId || "");
        formData.append("make_id", selectedFilters?.make_id || "");
        formData.append("modal_id", selectedFilters?.modal_id || "");
        formData.append("body_type_id", selectedFilters?.body_type_id || "");
        formData.append("v_condition", selectedFilters?.v_condition || "");
        formData.append("min_year", selectedFilters?.min_year || "");
        formData.append("mileage", selectedFilters?.mileage || "");
        formData.append("color", selectedFilters?.color || "");
        formData.append("transmission", selectedFilters?.transmission || "");
        formData.append("fuel", selectedFilters?.fuel || "");
        formData.append("min_price", selectedFilters?.min_price && selectedFilters?.max_price ? selectedFilters?.min_price && categoryId === 7 ? "0" : selectedFilters?.min_price : "1000");
        formData.append("max_price", selectedFilters?.max_price || "1000000");
        formData.append("max_year", selectedFilters?.max_year || "");
        formData.append("part_type_id", selectedFilters?.part_type_id || "");
        fetch(`${BASE_URL}/search_listings?page=${pageNumber}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.status === "200") isScrolling ? setListing(listing?.concat(result?.data)) : setListing(result?.data)
            })
            .catch(error => console.log('error', error));
            setIsScrolling(false)
            setLoading(false)
    }

    const getAllRegions = async () => {
        setLoading(true)
        try {
            const response = await fetchRegions()
            if (response?.status === 200) {
                if (response?.data?.status === "200") setRegionsList(response?.data?.Regions)
                else showToast("error", "Something went wrong")
            }
        } catch (error) {
            showToast && showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getMakesList = async (id) => {
        setLoading(true)
        try {
            const response = await fetchMakesForHomeScreen(id);
            if (response?.status >= 200) setMakesList(response?.data?.Makes)
        } catch (error) {
            showToast && showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getListingMakes = async (id) => {
        setLoading(true)
        try {
            const response = await fetchMakes(id);
            if (response?.status >= 200) {
                setListingMakesList(response?.data?.Makes)
            }
        } catch (error) {
            showToast && showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getBodyTypes = async (id) => {
        setLoading(true)
        try {
            const response = await fetchBodyTypes(id);
            if (response?.status >= 200) setBodyTypes(response?.data?.Body_types)
        } catch (error) {
            showToast && showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getAllParts = async () => {
        setLoading(true)
        try {
            const response = await fetchAllParts()
            if (response?.status === 200) {
                if (response?.data?.status === "200") setPartsList(response?.data?.Part_types)
            }
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        }
        setLoading(false)
    }

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
                title={"Home"}
                rightSecondIcon={Icons.equilizerIcon}
                onRightSecondPress={() => rbRef.current.open()}
                mainStyle={{ backgroundColor: colors.white }}
            />
            <View style={{
                width: "100%",
                backgroundColor: colors.white
            }}>
                {(selectedPrice || selectedFilters) && <TouchableOpacity style={styles.clearButton} onPress={() => {
                    setIsScrolling(false)
                    setPageNumber(1)
                    setSelectedPrice("")
                    setSelectedFilters(null)
                }}>
                    <Text style={styles.clearText}>Clear filters</Text>
                </TouchableOpacity>}
                <HorizontalFilters
                    items={categoryId === 7 ? partsPricing : listingPricing}
                    keyToRender={`label`}
                    defaultValue={selectedPrice}
                    onSelect={(item) => {
                        setPageNumber(1)
                        setSelectedPrice(item?.id)
                        item?.value2 ? setSelectedFilters({ ...selectedFilters, "min_price": item?.value, max_price: item?.value2 })
                            : setSelectedFilters({ ...selectedFilters, "min_price": "1000", max_price: item?.value })
                    }}
                />
            </View>
            {makesList?.length > 0 && <View style={{
                width: "100%",
                backgroundColor: colors.white
            }}>
                <BrandsList
                    items={makesList}
                    keyToRender={"name"}
                    baseURL={MAKE_ICON_URL}
                    onPress={(id) => {
                        setPageNumber(1)
                        setSelectedFilters({ ...selectedFilters, "make_id": id })
                    }}
                    onOtherPress={() => setIsVisible(true)}
                    defaultValue={selectedFilters?.make_id}
                />
            </View>}
            {categoryId === 7 && partsList?.length > 0 && <View style={{
                width: "100%",
                height: 100,
                backgroundColor: colors.white
            }}>
                <BrandsList
                    slug={"part-type"}
                    items={partsList}
                    keyToRender={"name"}
                    baseURL={PARTTYPEIMAGEURL}
                    alternate={Icons.settingIcon}
                    imageStyle={{
                        width: 30,
                        height: 30,
                        marginTop: 10
                    }}
                    textStyle={{
                        marginTop: 10
                    }}
                    defaultValue={selectedFilters?.part_type_id}
                    onPress={(id) => {
                        setPageNumber(1)
                        setSelectedFilters({ ...selectedFilters, "part_type_id": id })
                    }}
                    onOtherPress={() => setIsVisible(true)}
                />
            </View>}
            <View style={[styles.boxContainer, { height: "73%" }]}>
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        maxHeight: 60
                    }}
                >
                    <View style={styles.rowContainer}>
                        <Picker
                            mainStyle={{ width: 150 }}
                            placeholder={"Location"}
                            items={regionsList}
                            keyToRender={"name"}
                            defaultValue={selectedFilters?.region_id}
                            secondaryTitle={"Location"}
                            count={"listings_count"}
                            onChange={(item) => {
                                setPageNumber(1)
                                setSelectedFilters({ ...selectedFilters, "region_id": item?.id })
                            }}
                        />
                        {categoryId !== 7 && <Picker
                            mainStyle={{ width: 150 }}
                            placeholder={"Make"}
                            items={listingMakesList}
                            defaultValue={selectedFilters?.make_id}
                            count={"listings_count"}
                            keyToRender={"name"}
                            secondaryTitle={"Make"}
                            onChange={(item) => {
                                setPageNumber(1)
                                setSelectedFilters({ ...selectedFilters, "make_id": item?.id })
                            }}
                        />}
                        <Picker
                            mainStyle={{ width: 150 }}
                            placeholder={"Condition"}
                            items={[
                                { id: "brand_new", label: "Brand New" },
                                { id: "damaged", label: "Damaged" },
                                { id: "locally_used", label: "Locally Used" },
                                { id: "foreign_used", label: "Foreign Used" },
                            ]}
                            keyToRender={"label"}
                            defaultValue={selectedFilters?.v_condition}
                            secondaryTitle={"Condition"}
                            onChange={(item) => {
                                setPageNumber(1)
                                setSelectedFilters({ ...selectedFilters, "v_condition": item?.label })
                            }}
                        />
                    </View>
                </ScrollView>
                <View style={styles.rowContainer}>
                    <View style={styles.leftRowContainer}>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setNumberOfColumns(1)}>
                            <Image
                                source={Icons.listViewIcon}
                                style={[styles.actionIcon, {
                                    tintColor: numberOfColumns === 1 ? colors.warningRed : colors.appBlack
                                }]}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton} onPress={() => setNumberOfColumns(2)}>
                            <Image
                                source={Icons.gridViewIcon}
                                style={[styles.actionIcon, {
                                    tintColor: numberOfColumns === 2 ? colors.warningRed : colors.appBlack
                                }]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{
                    width: "100%",
                    height: "75%",
                }}>
                    <Listing
                        slug={slug}
                        pageNumber={pageNumber}
                        loading={loading}
                        items={listing}
                        onPress={(item) => navigation.navigate("CarDetails", { id: item?.id, categoryId: categoryId, slug: slug, makeId: item?.make_id })}
                        numberOfColumns={numberOfColumns}
                        onEndReached={() => {
                            if (loading || isScrolling || listing?.length <= 6) return
                            else {
                                setPageNumber(parseInt(pageNumber + 1))
                                setIsScrolling(true)
                            }
                        }}
                    />
                </View>
            </View>
            <RBSheet ref={rbRef}
                animationType="slide"
                customStyles={{
                    container: {
                        minHeight: 700,
                        padding: 5,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10,
                    }
                }}

            >
                <Filters
                    isFocused={isFocused}
                    categoryId={categoryId}
                    regionsList={regionsList}
                    makesList={listingMakesList}
                    bodyTypes={bodyTypes}
                    defaultFilters={selectedFilters}
                    onCrossPress={() => rbRef.current.close()}
                    showToast={(type, text) => showToast(type, text)}
                    onSearchPress={(filters) => {
                        setPageNumber(1)
                        rbRef.current.close()
                        setSelectedFilters(filters)
                    }}
                />
            </RBSheet>
            <Toast />
            <Loader loading={loading} isShowIndicator={true} />
            <Modal transparent={true}
                visible={isVisible}
                animationType="fade">
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: "rgba(10, 10, 10,0.3)"
                }}>
                    <View style={styles.makeModal}>
                        <View style={styles.modalRowContainer}>
                            <Text style={styles.modalHeadingText}>Select Make</Text>
                            <TouchableOpacity style={styles.crossContainer} onPress={() => setIsVisible(false)}>
                                <Image
                                    source={Icons.simpleCrossIcon}
                                    style={{
                                        width: 12,
                                        height: 12,
                                        resizeMode: "contain",
                                        tintColor: colors.appBlack
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ padding: 10, height: "85%" }}>
                            <FlatList
                                data={makesList}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.renderContainer}
                                            onPress={() => {
                                                setPageNumber(1)
                                                setSelectedFilters({ ...selectedFilters, "make_id": item?.id })
                                                setIsVisible(false)
                                            }}
                                        >
                                            <Image
                                                source={{ uri: `${MAKE_ICON_URL}/${item?.image}` } || Icons.carIcon}
                                                style={{
                                                    width: 30,
                                                    height: 30,
                                                    resizeMode: "contain"
                                                }}
                                            />
                                            <Text style={styles.renderItemText}>{item?.name}</Text>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

export default Details
