import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native';
import Images from '../../assets/images';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import { IMAGEURL } from '../../api/config';

const CardView = ({
    items,
    onPress,
    onEndReached
}) => {

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.renderContainer} onPress={() => onPress && onPress(item)}>
                <Image
                    source={item?.image ? `${IMAGEURL}/${item?.image}` : Images.placeholder}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "cover",
                        alignSelf: "center",
                        marginLeft: 10,
                        borderRadius: 15

                    }}
                    alt='image not available'
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.listingTitleText}>{item?.name?.substring(0, 20).concat("...")}</Text>
                    <Text style={styles.listingPriceText}>{`GH₵ ${item?.price}`}</Text>
                    <View style={styles.locationInfoContainer}>
                        <Image
                            source={Icons.mapPinIcon}
                            style={styles.infoIcon}
                        />
                        <Text style={styles.locationText}>{item?.region_name?.substring(0, 20).concat("...") || "--"}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={items}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                onEndReached={() => onEndReached && onEndReached()}
            />
        </View>
    )
}

export default CardView;

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
    },
    renderContainer: {
        width: "100%",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: colors.white,
        borderRadius: 10,
        padding: 5,
        marginVertical: 5,
        flexDirection: "row",
        alignItems: "center"
    },
    infoContainer: {
        width: "75%",
        padding: 10,
    },
    listingTitleText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.appGolden
    },
    listingPriceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.appBlack,
        marginTop: 5
    },
    locationInfoContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 10,
        marginVertical: 5
    },
    infoIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain"
    },
    locationText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 5,
    }
})