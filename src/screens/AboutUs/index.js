import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import styles from './styles';
import Icons from '../../assets/icons';
import { WebView } from 'react-native-webview';

const AboutUs = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                title={"About Us"}
                leftIcon={Icons.backArrowIcon}
                onLeftIconPress={() => navigation.goBack()}
            />
            <WebView source={{ uri: 'https://autotrader.com.gh/links/about_us.html' }} style={{ width:"90%", alignSelf:"center" }} />
        </SafeAreaView>
    )
}

export default AboutUs;
