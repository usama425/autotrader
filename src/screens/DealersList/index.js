import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native'
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Icons from '../../assets/icons';
import DealersListComponent from '../../chunks/DealersList/DealersListComponent';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchUsersByCategory } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import colors from '../../utils/colors';

const alphabetLetters = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
]

const DealersList = ({ navigation, route }) => {

    const isFocused = useIsFocused()
    const { categoryName, categoryId, slug } = route?.params
    const [loading, setLoading] = useState(false)
    const [dealers, setDealers] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [isScrolling, setIsScrolling] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState("")

    useEffect(() => {
        if (isFocused && categoryId) getDealers(categoryId)
    }, [categoryId, isFocused, pageNumber, selectedFilter])

    const getDealers = async (id) => {
        setLoading(true)
        try {
            const formData = new FormData()
            if (selectedFilter) {
                formData.append("category_id", id)
                formData.append("search_alphabet", selectedFilter)
            } else formData.append("category_id", id)
            const response = await fetchUsersByCategory(formData, pageNumber)
            if (response?.status === 200) {
                if (response?.data?.status === "200") {
                    if (isScrolling) setDealers(dealers?.concat(response?.data?.Dealers))
                    else setDealers(response?.data?.Dealers)
                    setIsScrolling(false)
                }
            }

        } catch (error) {
            showToast(error, error?.response?.data?.message || "Something went wrong")

        } finally {
            setLoading(false)
            setIsScrolling(false)
        }
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

            <View style={styles.blackContainer}>
                <View style={{
                    width: "100%",
                    alignItems: "center",
                    alignSelf: "center",
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10
                }}>
                    <TouchableOpacity style={styles.leftIconContainer} onPress={() => navigation.goBack()}>
                        <Image
                            source={Icons.backArrowIcon}
                            style={styles.leftIcon}
                        />
                    </TouchableOpacity>
                    <Image
                        source={Icons.appIcon}
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            resizeMode: "contain",
                            marginLeft: -40
                        }}
                    />
                    <AppHeader
                        title={"Dealers"}
                        mainStyle={{ width: "auto", backgroundColor: colors.appBlack }}
                        titleTextColor={{ color: colors.white, marginLeft: 10, }}
                    />
                </View>
            </View>
            <View style={styles.innerContainer}>
                {selectedFilter && <TouchableOpacity style={styles.clearButton} onPress={() => {
                    setPageNumber(1)
                    setSelectedFilter("")
                }}>
                    <Text style={styles.clearText}>Clear filters</Text>
                </TouchableOpacity>}
                <Text style={styles.searchText}>Search Autotrader dealer’s in alphabetical order</Text>
                <FlatList
                    data={alphabetLetters}
                    keyExtractor={(item, index) => index}
                    horizontal={true}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity style={[styles.alphabetFilterRenderItem, {
                                backgroundColor: item === selectedFilter ? colors.warningRed : colors.white,
                                borderColor: item === selectedFilter ? colors.warningRed : colors.appBlack,
                            }]}
                                onPress={() => {
                                    setPageNumber(1)
                                    setSelectedFilter(item)
                                }}
                            >
                                <Text style={[styles.renderText, {
                                    color: item === selectedFilter ? colors.white : colors.appBlack,
                                }]}>{item?.toUpperCase()}</Text>
                            </TouchableOpacity>
                        )
                    }}
                />
                <DealersListComponent
                    slug={slug}
                    pageNumber={pageNumber}
                    navigation={navigation}
                    categoryId={categoryId}
                    categoryName={categoryName}
                    data={dealers}
                    loading={loading}
                    onEndReached={() => {
                        if (loading || isScrolling || dealers?.length <= 6) return
                        else {
                            setPageNumber((prevPage) => prevPage + 1);
                            setIsScrolling(true)
                        }
                    }}
                />
            </View>
            <Loader loading={loading} isShowIndicator={true} />
            <Toast />
        </SafeAreaView>
    )
}

export default DealersList;