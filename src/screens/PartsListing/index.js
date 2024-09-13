import React, { useRef, useState, useEffect } from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import styles from './styles';
import Icons from '../../assets/icons';
import AppHeader from '../../components/AppHeader';
import CardView from '../../chunks/PartsListing/CardView';
import RBSheet from 'react-native-raw-bottom-sheet';
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../api/config';

const PartsListing = ({ navigation }) => {

    const rbRef = useRef()
    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [selectedFilters, setSelectedFilters] = useState()
    const [listing, setListing] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        isFocused && searchListing("", "")
    }, [isFocused, pageNumber])

    const searchListing = async (minPrice, maxPrice) => {
        const formData = new FormData()
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        setLoading(true)
        formData.append("region_id", selectedFilters?.region_id || "");
        formData.append("subregion_id", selectedFilters?.subregion_id || "");
        formData.append("category_id", "7");
        formData.append("make_id", selectedFilters?.make_id || "");
        formData.append("modal_id", selectedFilters?.modal_id || "");
        formData.append("body_type_id", selectedFilters?.body_type_id || "");
        formData.append("v_condition", selectedFilters?.v_condition || "");
        formData.append("min_year", selectedFilters?.min_year || "");
        formData.append("min_price", minPrice ? minPrice : selectedFilters?.min_price || "");
        formData.append("mileage", selectedFilters?.mileage || "");
        formData.append("color", selectedFilters?.color || "");
        formData.append("transmission", selectedFilters?.transmission || "");
        formData.append("fuel", selectedFilters?.fuel || "");
        formData.append("max_price", maxPrice ? maxPrice : selectedFilters?.max_price || "");
        formData.append("max_year", selectedFilters?.max_year || "");

        fetch(`${BASE_URL}/search_listings?page=${pageNumber}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.status === "200") {
                    if (isScrolling) setListing(listing?.concat(result?.data))
                    else setListing(result?.data)
                }
            })
            .catch(error => showToast("error", error?.response?.data?.message || "Something went wrong")).finally(() => setLoading(false));
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
                title={"Parts & Accessories"}
            />
            <View style={styles.innerContainer}>
                <Text style={styles.browseText}>Find Parts & Accessories</Text>
                <View style={styles.flatListContainer}>
                    <CardView
                        items={listing}
                        onPress={(item) => navigation.navigate("CarDetails", { id: item?.id, categoryId: "7" })}
                        onEndReached={() => {
                            setPageNumber(parseInt(pageNumber + 1))
                            setIsScrolling(true)
                        }}
                    />
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

                ></RBSheet>
            </View>
            <Loader loading={loading} isShowIndicator={true} />
            <Toast />
        </SafeAreaView>
    )
}

export default PartsListing
