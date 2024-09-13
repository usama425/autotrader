import React from 'react';
import {
    View,
    Text,
    SafeAreaView,
    Image,
} from 'react-native';
import styles from './styles';
import Images from '../../assets/images';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AppButton from '../../components/AppButton';

const Welcome = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <KeyboardAwareScrollView style={{
                width: "100%"
            }}>
                <View style={styles.innerContainer}>
                    <Image
                        source={Images.Splash}
                        style={{ width: 200, height: 200, resizeMode: 'contain', }}
                    />
                    <Text style={styles.welcomeText}>Welcome to Auto Trader</Text>
                    <AppButton
                        title={"Login"}
                        titleAllCaps={true}
                        mainStyle={styles.buttonStyle}
                        onPress={()=>navigation.navigate("Login")}
                    />
                    <AppButton
                        title={"Reigster"}
                        titleAllCaps={true}
                        mainStyle={styles.buttonStyle}
                        onPress={()=>navigation.navigate("Register")}
                    />
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    )
}

export default Welcome;