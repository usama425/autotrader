import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import Listing from '../../chunks/Details/Listing';
import AppInput from '../../components/AppInput';
import Loader from '../../components/Loader';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { BASE_URL } from '../../api/config';

const SearchListing = ({ navigation }) => {

    const isFocused = useIsFocused()

    const [searchText, setSearchText] = useState("")
    const [loading, setLoading] = useState(false)
    const [listing, setListing] = useState([])

    useEffect(() => {
        isFocused && getListing()
    }, [searchText, isFocused])

    const getListing = async () => {
        const formData = new FormData()
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        setLoading(true)
        formData.append("name", searchText);
        fetch(`${BASE_URL}/search_listings_by_name`, requestOptions)
            .then(response => response.json())
            .then(result => result?.status === "200" && setListing(result?.data))
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
                title={"Search"}
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
            />
            <AppInput
                leftIcon={Icons.searchIcon}
                placeholder={"Search here"}
                mainStyle={{
                    width: "92%",
                    alignSelf: "center"
                }}
                leftIconCustomStyle={{
                    width: 20,
                    marginLeft: 5
                }}
                disabledLeftIcon={true}
                onChange={(text) => setSearchText(text)}
            />
            <Listing
                items={listing}
                slug={"cat_slug"}
                customSrc={true}
                onPress={(item) => navigation.navigate("CarDetails", { id: item?.id, categoryId: item?.category_id, slug: item?.cat_slug, makeId: item?.make_id })}
            />
            <Loader loading={loading} isShowIndicator={true} />
            <Toast />
        </SafeAreaView>
    )
}

export default SearchListing;