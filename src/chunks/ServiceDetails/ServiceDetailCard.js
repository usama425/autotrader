import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
} from 'react-native';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import Images from '../../assets/images';
import Icons from '../../assets/icons';
import CustomImageComponent from '../../components/CustomImageComponent';
import { IMAGEURL } from '../../api/config';

const ServiceDetailCard = ({
    item,
    navigation
}) => {

    const stripHtmlTags = (htmlString) => {
        const regex = /(<([^>]+)>)/ig;
        return htmlString.replace(regex, '');
    };

    return (
        <View style={styles.mainContainer}>
            <CustomImageComponent
                source={`${IMAGEURL}/company-logos/${item?.logo}`}
                mainStyle={styles.logoStyle}
            />
            <Text style={styles.titleText}>{item?.name || "--"}</Text>
            <View style={styles.iconInfoContainer}>
                <Image
                    source={Icons.mapPinIcon}
                    style={{
                        width: 15,
                        height: 15,
                        resizeMode: "contain"
                    }}
                />
                <Text style={{
                    fontSize: 12,
                    color: colors.appBlack,
                    marginLeft: 5,
                }}>{item?.region_name || "--"}</Text>
            </View>
            <Text style={styles.descText}>{stripHtmlTags(item?.description || '--')}</Text>
            <TouchableOpacity style={styles.getButtonContainer}
                onPress={() => navigation.navigate("ViewService", { item: item })}
            >
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#434240', '#7b6840', '#8f773f']} style={styles.getButtonContainer}>
                    <Text style={styles.getButtonText}>View More</Text>
                </LinearGradient >
            </TouchableOpacity>
        </View >
    )
}

export default ServiceDetailCard;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderColor,
        padding: 10,
        marginBottom: 10,
        alignItems: "center"
    },
    titleText: {
        fontSize: 14,
        fontWeight: "bold",
        color: colors.appBlack,
        textAlign: "center",
        marginTop: -10
    },
    descText: {
        fontSize: 12,
        color: colors.appBlack,
        marginVertical: 5,
        lineHeight: 20,
        textAlign: "center"
    },
    getButtonContainer: {
        width: 150,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        marginVertical: 5
    },
    getButtonText: {
        color: colors.white,
        fontWeight: "500"
    },
    logoStyle: {
        width: 100,
        height: 100,
        resizeMode: "contain",
        marginBottom: 15,
    },
    iconInfoContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginVertical: 5
    },
})