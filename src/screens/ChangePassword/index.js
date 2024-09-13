import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import { changeUserPassword } from '../../api/methods/auth';
import colors from '../../utils/colors';
import Images from '../../assets/images';
import { logoutUser } from '../../redux/actions/actions';

const ChangePassword = ({ navigation }) => {

    const dispatch = useDispatch()
    const { userId } = useSelector(state => state.userSession)

    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)
    const [missingField, setMissingField] = useState("")

    useEffect(() => {
        if (details?.current_password?.length <= 0) setMissingField("current_password")
        else if (details?.current_password?.length > 0) setMissingField("")
        else if (details?.new_password?.length <= 0) setMissingField("new_password")
        else if (details?.new_password?.length > 0) setMissingField("")

    }, [details])

    const checkInput = () => {
        if (!details?.current_password) setMissingField("current_password")
        else if (!details?.new_password) setMissingField("new_password")
        else changePassword()
    }

    const changePassword = async () => {
        setLoading(true)
        try {
            const formData = new FormData()
            formData.append("old_password", details?.current_password)
            formData.append("new_password", details?.new_password)
            const response = await changeUserPassword(formData, userId)
            if (response?.status === 200) {
                showToast("success", response?.data?.message)
                setTimeout(() => {
                    dispatch(logoutUser())
                    navigation.dispatch(StackActions.replace('AuthStack'))
                }, 2000)
            }
        } catch (error) {
            showToast("error", error?.response?.data?.message || "something went wrong")
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
                title={"Change Password"}
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
            />
            <Text style={styles.headingText}>CHANGE YOUR PASSWORD</Text>
            <KeyboardAwareScrollView style={{
                width: "100%"
            }}>
                <View style={styles.innerContainer}>
                    <AppInput
                        title={"Current passowrd"}
                        secureTextEntry={true}
                        isMandatory={missingField === "current_password" || missingField === "wrong-credentials"}
                        placeholderTextColor={missingField === "current_password" || missingField === "wrong-credentials" ? colors.warningRed : ""}
                        warningMessage={missingField === "current_password" ? "Please enter password" : ""}
                        onChange={(text) => setDetails({ ...details, "current_password": text })}
                    />
                    <AppInput
                        title={"New passowrd"}
                        secureTextEntry={true}
                        isMandatory={missingField === "new_password" || missingField === "wrong-credentials"}
                        placeholderTextColor={missingField === "new_password" || missingField === "wrong-credentials" ? colors.warningRed : ""}
                        warningMessage={missingField === "new_password" ? "Please enter password" : ""}
                        onChange={(text) => setDetails({ ...details, "new_password": text })}
                    />
                    <AppButton
                        title={"Change password"}
                        mainStyle={{ width: "98%", marginTop: 15 }}
                        onPress={() => checkInput()}
                    />
                </View>
            </KeyboardAwareScrollView>
            <Loader loading={loading} isShowIndicator={true} />
            <Toast />
        </SafeAreaView>
    )
}

export default ChangePassword;