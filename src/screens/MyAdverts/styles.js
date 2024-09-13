import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "center",
    },
    innerContainer: {
        width: "100%",
        padding: 15
    },
    blackContainer: {
        width: "100%",
        backgroundColor: colors.appBlack,
        paddingBottom: 5,
    },
    categoryContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: colors.appBlack,
        padding: 10
    },
    renderContainer: {
        width: "45%",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.borderColor,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        backgroundColor: colors.white,
        marginHorizontal: 10,
        marginVertical: 10
    },
    listingImage: {
        width: "100%",
        height: 100,
        resizeMode: "cover",
        alignSelf: "center",
    },
    infoContainer: {
        width: "auto",
        padding: 10,
    },
    listingTitleText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.appGolden
    },
    listingDescText: {
        fontSize: 14,
        color: colors.appInputTextColor,
        marginVertical: 5
    },
    listingPriceText: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.appBlack
    },
    additionalInfoRowContainer: {
        width: "auto",
        padding: 5,
        marginTop: 5,
    },
    iconInfoContainer: {
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
    mileageText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 5,
    },
    emptyContainer: {
        width: "100%",
        height: 500,
        alignItems: "center",
        justifyContent: "center"
    },
    emptyText: {
        color: colors.appBlack,
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginTop: 20
    }
})

export default styles;