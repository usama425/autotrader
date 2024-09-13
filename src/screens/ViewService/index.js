import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import styles from './styles';
import AppButton from '../../components/AppButton';
import AppInput from '../../components/AppInput';
import TextArea from '../../components/TextArea';
import { IMAGEURL } from '../../api/config';
// import email from 'react-native-email'

const DescText = ({ data }) => {
    const stripHtmlTags = (htmlString) => {
        const regex = /(<([^>]+)>)/ig;
        return htmlString.replace(regex, '');
    };
    return (
        <Text style={styles.descText}>{stripHtmlTags(data)}</Text>
    )
}

const ViewService = ({ navigation, route }) => {

    const { item } = route?.params

    const [showNumber, setShowNumber] = useState(false)
    const [details, setDetails] = useState()

    // const handleEmail = async () => {
    //     const to = [`${item?.email}`] // string or array of email addresses
    //     await email(to, {
    //         // Optional additional arguments
    //         // cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
    //         // bcc: 'mee@mee.com', // string or array of email addresses
    //         subject: `Enquiry`,
    //         body: `${details?.message}`,
    //         checkCanOpen: false // Call Linking.canOpenURL prior to Linking.openURL
    //     }).catch((error) => console.log("error==>>", error)
    //     )
    // }

    return (
        <SafeAreaView style={styles.mainContainer}>
            <AppHeader
                title={item?.name?.substring(0, 20)?.concat("...")}
                onLeftIconPress={() => navigation.goBack()}
                leftIcon={Icons.backArrowIcon}
            />
            <View style={styles.innerContainer}>

                <ScrollView style={{
                    width: "100%",
                    height: "90%"
                }}>
                    <View style={styles.boxContainer}>
                        <AppButton
                            disabled={true}
                            title={item?.name?.substring(0, 20)?.concat("...") || "--"}
                            mainStyle={{ marginBottom: 10 }}
                        />
                        <Text style={styles.labelText}>Location: <Text style={styles.labelDefText}>{`${item?.address}` || "--"}</Text></Text>
                        <Text style={styles.labelText}>Business Hours: <Text style={styles.labelDefText}>{`${item?.business_hours}` || "--"}</Text></Text>
                    </View>
                    <DescText data={item?.description} />
                    <View style={[styles.boxContainer, { alignItems: "center" }]}>
                        <Image
                            source={{ uri: `${IMAGEURL}/company-logos/${item?.logo}` }}
                            style={styles.logoStyle}
                        />
                        <TouchableOpacity style={styles.showPhoneButton} onPress={() => setShowNumber(true)}>
                            <Text style={styles.phoneText}>{showNumber ? `${item?.phone1}\n${item?.phone2}` : showNumber && !item?.phone1 && !item?.phone2 ? `No phone available` : `Show Contact Number`}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.formBoxContainer, { alignItems: "center" }]}>
                        <View style={styles.grayHeadingContainer}>
                            <Text style={styles.contactText}>Contact the company</Text>
                        </View>
                        <Text style={styles.sendEmailText}>Send an email enquiry for insurance</Text>
                        <AppInput
                            placeholder={"Your name *"}
                            mainStyle={styles.formInputStyle}
                            onChange={(text) => setDetails({ ...details, "name": text })}
                        />
                        <AppInput
                            placeholder={"Email Address *"}
                            mainStyle={styles.formInputStyle}
                            onChange={(text) => setDetails({ ...details, "email": text })}
                        />
                        <AppInput
                            placeholder={"Mobile Number *"}
                            mainStyle={styles.formInputStyle}
                            keyboardType={"numeric"}
                            onChange={(text) => setDetails({ ...details, "phone": text })}
                        />
                        <TextArea
                            placeholder={"Message *"}
                            mainStyle={styles.formInputStyle}
                            onChange={(text) => setDetails({ ...details, "message": text })}
                        />
                        <AppButton
                            title={"Submit"}
                            mainStyle={{ width: "92%", marginVertical: 10 }}
                            onPress={() => alert("in progress")}
                        />
                        <Text style={styles.termsText}>Company terms & conditions will apply</Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default ViewService;