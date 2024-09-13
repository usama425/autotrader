import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppHeader from "../../components/AppHeader"
import Icons from '../../assets/icons';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RadioGroup from '../../components/RadioGroup';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Toast from 'react-native-toast-message';
import { fetchRegions, fetchRegionsById, fetchUserById, updateUserById } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import Picker from '../../components/Picker';
import { BASE_URL, IMAGEURL } from '../../api/config';
import colors from '../../utils/colors';
import CustomImageComponent from '../../components/CustomImageComponent';
import TextArea from '../../components/TextArea';

const businessHorsData = [
    { id: "Mon - Fri: 8AM - 4PM", label: "Mon - Fri: 8AM - 4PM" },
    { id: "Mon - Fri: 8AM - 4PM, Sat: 8AM - 1PM", label: "Mon - Fri: 8AM - 4PM, Sat: 8AM - 1PM" },
    { id: "Mon - Fri: 9AM - 5PM", label: "Mon - Fri: 9AM - 5PM" },
    { id: "Mon - Fri: 9AM - 5PM, Sat: 9AM - 2PM", label: "Mon - Fri: 9AM - 5PM, Sat: 9AM - 2PM" },
    { id: "Mon - Fri: 10AM - 6PM", label: "Mon - Fri: 10AM - 6PM" },
    { id: "Mon - Fri: 10AM - 6PM, Sat: 10AM - 3PM", label: "Mon - Fri: 10AM - 6PM, Sat: 10AM - 3PM" },
    { id: "Sat - Sun: 9AM - 2PM", label: "Sat - Sun: 9AM - 2PM" },
    { id: "Mon - Fri: 9AM - 10PM", label: "Mon - Fri: 9AM - 10PM" },
    { id: "Mon - Fri: 10AM - 10PM", label: "Mon - Fri: 10AM - 10PM" },
    { id: "Mon - Sun: 2PM - 12PM", label: "Mon - Sun: 2PM - 12PM" },
]

const UserProfile = ({ navigation }) => {

    const options = {
        opacity: 0.3,
        mediaType: 'photo',
        videoQuality: 'low',
        quality: 0.1,
    }

    const { userId } = useSelector(state => state.userSession)
    const isFocused = useIsFocused()

    const [image, setImage] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isDisabled, setIsDisabled] = useState(true)
    const [loading, setLoading] = useState(false)
    const [regionsList, setRegionsList] = useState([])
    const [subRegionsList, setSubRegionsList] = useState([])
    const [details, setDetails] = useState({})
    const [showDealerInfo, setShowDealerInfo] = useState(false)

    useEffect(() => {
        if (isFocused) getAllRegions()
        if (isFocused && userId) getUserDetails(userId)
    }, [isFocused, userId])

    useEffect(() => {
        details?.region_id && getSubRegions(details?.region_id)
    }, [details?.region_id])

    useEffect(() => {
        details?.type === "Dealer" || details?.type === "dealer" ? setShowDealerInfo(true) : setShowDealerInfo(false)
    }, [details])

    const getAllRegions = async () => {
        setLoading(true)
        try {
            const response = await fetchRegions()
            if (response?.status >= 200) setRegionsList(response?.data?.Regions)
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getSubRegions = async (id) => {
        setLoading(true)
        try {
            const response = await fetchRegionsById(id)
            if (response?.status >= 200) setSubRegionsList(response?.data?.Regions)
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }

    const getUserDetails = async (id) => {
        setLoading(true)
        try {
            const response = await fetchUserById(id)
            if ((response?.status === 200 || response?.status === 201)) {
                if (response?.data?.status === "200") setDetails(response?.data?.user)
                else showToast("error", "something went wrong")
            }
            else setDetails({})
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }


    const updateDetails = async () => {
        var requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        setLoading(true)
        let formData = new FormData()
        formData.append("fname", details?.fname || "")
        formData.append("lname", details?.lname || "")
        formData.append("fb_id", details?.fb_id || "")
        formData.append("company_name", details?.company_name || "")
        formData.append("company_description", details?.company_description || "")
        formData.append("company_slug", details?.company_slug || "")
        formData.append("business_hours", details?.business_hours || "")
        formData.append("address", details?.address || "")
        formData.append("phone1", details?.phone1 || "")
        formData.append("phone2", details?.phone2 || "")
        formData.append("mobile", details?.mobile || "")
        formData.append("whatsapp", details?.whatsapp || "")
        formData.append("region_id", details?.region_id || "")
        formData.append("subregion_id", details?.subregion_id || "")
        formData.append("image", details?.image || "")
        formData.append("type", details?.type || "")
        formData.append("business_hours", details?.business_hours || "")
        console.log("formData==>>", formData);
        fetch(`${BASE_URL}/update_user_by_id/${userId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result?.status === "200") {
                    showToast("success", result?.message)
                    setIsDisabled(true)
                    getUserDetails(userId)
                }
                else showToast("error", "Something went wrong")
            })
            .catch(error => console.log('error', error)).finally(() => setLoading(false));
    }

    const showToast = (type, text1, text2) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2,
        });
    }

    const showCamera = () => {
        launchCamera(options, callback);
        // uri = null
    }
    const showLibrary = () => {
        launchImageLibrary(options, callback)
        setImage(false)
        // uri = null
    }

    const callback = async response => {
        if (response.didCancel) {
            // uri = userInfo?.profile_picture
        }
        else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        }
        else {
            const source = {
                uri: response.assets[0].uri,
                name: response.assets[0].fileName,
                type: response.assets[0].type,
            };
            setDetails({ ...details, "image": source })
        }
        setShowModal(false)
    }

    return (
        <SafeAreaView style={styles.mainContainer}>
            {showModal ? <View style={styles.absoluteContainer}>
                <View style={styles.optionsContainer}>
                    <AppButton
                        title={"Open Camera"}
                        onPress={() => showCamera()}
                    />
                    <AppButton
                        title={"Open Gallery"}
                        mainStyle={{ marginVertical: 10 }}
                        onPress={() => showLibrary()}
                    />
                    <AppButton
                        title={"Cancel"}
                        onPress={() => setShowModal(false)}
                    />
                </View>
            </View> : null}
            <AppHeader
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
                rightTitle={isDisabled ? "Edit" : "Cancel"}
                onRightSecondPress={() => setIsDisabled(!isDisabled)}
            />
            <KeyboardAwareScrollView style={{ width: "100%" }}>
                <View style={styles.innerContainer}>

                    <View style={styles.profileContainer}>
                        <Text style={styles.editText}>Edit profile/company logo</Text>
                        <View style={styles.imageContainer}>
                            <CustomImageComponent
                                // source={typeof (details?.image) === "string" ? { uri: `${IMAGEURL}/${details?.image}` } : typeof (details?.image) === "object" ? details?.image : Images.placeholder}
                                source={`${IMAGEURL}/${details?.image}`}
                                alternate={details?.image || ""}
                                mainStyle={{ width: "100%", height: "100%", resizeMode: "cover", borderRadius: 100 }}
                            />
                            <TouchableOpacity style={styles.uploadPencilStyle}
                                disabled={isDisabled} onPress={() => setShowModal(true)}
                            >
                                <Image
                                    source={Icons.uploadPencilIcon}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        tintColor: colors.white,
                                        resizeMode: "contain"
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.nameText}>{`${details?.fname} ${details?.lname}`}</Text>
                    </View>

                    <Text style={styles.cardTitle}>History</Text>
                    <View style={styles.cardContainer}>
                        <AppInput
                            title={"First Name"}
                            placeholder={"John"}
                            showMandatoryStar={true}
                            editable={!isDisabled}
                            defaultValue={details?.fname}
                            onChange={(text) => setDetails({ ...details, "fname": text })}
                        />
                        <AppInput
                            title={"Last Name"}
                            placeholder={"Doe"}
                            editable={!isDisabled}
                            defaultValue={details?.lname}
                            onChange={(text) => setDetails({ ...details, "lname": text })}
                        />
                        <AppInput
                            title={"Full Address"}
                            placeholder={"Suit#123"}
                            showMandatoryStar={true}
                            editable={!isDisabled}
                            defaultValue={details?.address}
                            onChange={(text) => setDetails({ ...details, "address": text })}
                        />
                        <Picker
                            title={"Region"}
                            showMandatoryStar={true}
                            items={regionsList}
                            keyToRender={"name"}
                            defaultValue={details?.region_id}
                            disabled={isDisabled}
                            onChange={(item) => setDetails({ ...details, "region_id": item?.id })}
                        />
                        <Picker
                            title={"Sub Region"}
                            showMandatoryStar={true}
                            items={subRegionsList}
                            keyToRender={"name"}
                            defaultValue={details?.subregion_id}
                            disabled={isDisabled}
                            onChange={(item) => setDetails({ ...details, "subregion_id": item?.id })}
                        />
                        <AppInput
                            title={"Mobile"}
                            placeholder={"+02XXXXXXXX"}
                            showMandatoryStar={true}
                            editable={!isDisabled}
                            defaultValue={details?.mobile}
                            onChange={(text) => setDetails({ ...details, "mobile": text })}
                        />
                        <AppInput
                            title={"Phone 1"}
                            placeholder={"+02XXXXXXXX"}
                            editable={!isDisabled}
                            defaultValue={details?.phone1}
                            onChange={(text) => setDetails({ ...details, "phone1": text })}
                        />
                        <AppInput
                            title={"Phone 2"}
                            placeholder={"+02XXXXXXXX"}
                            editable={!isDisabled}
                            defaultValue={details?.phone2}
                            onChange={(text) => setDetails({ ...details, "phone2": text })}
                        />
                    </View>

                    <View style={styles.bottomContainer}>
                        <View style={{ width: "100%", padding: 10 }}>
                            <AppInput
                                title={"Whatsapp Number (with country code. Ex +231234567890)"}
                                placeholder={"+02XXXXXXXX"}
                                editable={!isDisabled}
                                defaultValue={details?.whatsapp}
                                onChange={(text) => setDetails({ ...details, "whatsapp": text })}
                            />
                            <RadioGroup
                                title={"User Type"}
                                showMandatoryStar={true}
                                keyToRender={"label"}
                                direction={"row"}
                                keyToCompare={"label"}
                                items={[
                                    { id: "dealer", label: "Dealer" },
                                    { id: "private-seller", label: "Private Seller" },
                                ]}
                                defaultValue={details?.type}
                                onChange={(item) => setDetails({ ...details, "type": item?.label })}
                                disabled={isDisabled}
                            />

                            {showDealerInfo && <View style={{ width: "100%" }}>
                                <AppInput
                                    title={"Company Name"}
                                    defaultValue={details?.company_name}
                                    onChange={(text) => setDetails({ ...details, "company_name": text })}
                                />
                                <TextArea
                                    title={"Business Description"}
                                    placeholder={"Description"}
                                    defaultValue={details?.company_description}
                                    onChange={(text) => setDetails({ ...details, "company_description": text })}
                                />
                                <Picker
                                    title={"Business Hours"}
                                    items={businessHorsData}
                                    keyToRender={"label"}
                                    defaultValue={details?.business_hours}
                                    disabled={isDisabled}
                                    onChange={(item) => setDetails({ ...details, "business_hours": item?.label })}
                                />
                            </View>}
                        </View>
                        <View style={styles.buttonContainer}>
                            <AppButton
                                title={"Update Profile"}
                                mainStyle={{
                                    width: 140,
                                    height: 40
                                }}
                                onPress={() => {
                                    updateDetails()
                                }}
                                disabled={isDisabled}
                            />
                        </View>
                    </View>

                </View>
            </KeyboardAwareScrollView>
            <Toast />
            <Loader loading={loading} isShowIndicator={true} />
        </SafeAreaView>
    )
}

export default UserProfile;
