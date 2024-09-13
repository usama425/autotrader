import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    Image
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import styles from './styles';
import ServiceDetailCard from '../../chunks/ServiceDetails/ServiceDetailCard';
import { useIsFocused } from '@react-navigation/native';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchServiceCompanyById } from '../../api/methods/auth';

const ServiceDetails = ({ navigation, route }) => {

    const { id, title } = route?.params

    const isFocused = useIsFocused()
    const [loading, setLoading] = useState(false)
    const [serviceCompanies, setServiceCompanies] = useState([])

    useEffect(() => {
        isFocused && id && getServiceCompanyById(id)
    }, [isFocused])

    const getServiceCompanyById = async (id) => {
        setLoading(true)
        try {
            const response = await fetchServiceCompanyById(id)
            if (response?.status === 200) {
                if (response?.data?.status === "200") setServiceCompanies(response?.data?.service_companies)
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
                title={title?.substring(0,80)?.concat("...")}
                onLeftIconPress={() => navigation.goBack()}
                leftIcon={Icons.backArrowIcon}
            />
            <View style={styles.innerContainer}>
                <FlatList
                    data={serviceCompanies}
                    renderItem={({ item }) => {
                        return (
                            <ServiceDetailCard item={item} navigation={navigation} />
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

export default ServiceDetails;