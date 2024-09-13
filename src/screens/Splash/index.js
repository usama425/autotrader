import React, { useEffect } from 'react'
import {
    Image,
    SafeAreaView,
} from 'react-native'
import styles from './styles';
import Images from '../../assets/images';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { View } from 'react-native';


const Splash = ({ navigation }) => {

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) setTimeout(() => {
            navigation.navigate("HomeStack")
        }, 3000)
    }, [isFocused])

    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.innerContainer}>
                <View style={styles.contentContainer}>
                    <Image
                        source={Images.Splash}
                        style={{ width: 200, height: 80, resizeMode: 'contain', marginVertical:5 }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Splash;
