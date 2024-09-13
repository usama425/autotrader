import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Image,
    Text
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import styles from './styles';
import ServicesCardView from '../../chunks/Services/ServicesCardView';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchServices } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';


const Services = ({ navigation }) => {

    const isFocused = useIsFocused()

    const [loading, setLoading] = useState(false)
    const [services, setServices] = useState([])

    useEffect(() => {
        isFocused && getServices()
    }, [isFocused])

    const getServices = async () => {
        setLoading(true)
        try {
            const response = await fetchServices()
            if (response?.status === 200) {
                if (response?.data?.status === "200") setServices(response?.data?.services)
            }
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

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                title={"Services"}
                onLeftIconPress={() => navigation.goBack()}
                leftIcon={Icons.backArrowIcon}
            />
            <View style={styles.innerContainer}>
                <FlatList
                    data={services}
                    renderItem={({ item }) => {
                        return (
                            <ServicesCardView item={item} navigation={navigation} />
                        )
                    }}
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
            </View>
            <Loader loading={loading} isShowIndicator={true} />
            <Toast />
        </SafeAreaView>
    )
}

export default Services;