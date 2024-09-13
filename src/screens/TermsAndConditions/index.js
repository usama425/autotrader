import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ScrollView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Icons from '../../assets/icons';
import { WebView } from 'react-native-webview';

const TermsAndConditions = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                title={"Terms & Conditions"}
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
            />
            <WebView source={{ uri: 'https://autotrader.com.gh/links/terms_and_conditions.html' }} style={{ width:"90%", alignSelf:"center" }} />
        </SafeAreaView>
    )
}

export default TermsAndConditions;
