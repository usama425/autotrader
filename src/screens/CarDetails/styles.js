import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
    },
    innerContainer: {
        width: "100%",
    },
    infoContainer: {
        width: "100%",
        paddingTop: 10,
        paddingHorizontal: 15,
        backgroundColor: colors.white
    },
    titleText: {
        color: colors.appInputTextColor,
        fontSize: 18,
        fontWeight: "400",
        marginVertical: 10
    },
    priceText: {
        color: colors.appBlack,
        fontSize: 20,
        fontWeight: "600"
    },
    locationRowContainer: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 10,
        alignItems: "center",
    },
    mapIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: colors.appButtonColor
    },
    calenderIconStyle: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        marginLeft: 5
    },
    locationText: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.appButtonColor,
        marginHorizontal: 5
    },
    descView: {
        width: "100%",
        padding: 10
    },
    descText: {
        fontSize: 12,
        color: colors.appBlack,
    },
    renderContainer: {
        width: 100,
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
        marginRight: 50
    },
    roundContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        borderRadius: 100,
        backgroundColor: colors.appGolden,
    },
    arrowIcon: {
        width: 10,
        height: 10,
        resizeMode: "contain",
        tintColor: colors.white,
        transform: [{ rotate: "180deg" }],
    },
    featureLabelText: {
        fontSize: 12,
        color: colors.appBlack,
        marginLeft: 10
    },
    sellerNameText: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.appBlack
    },
    memberDateText: {
        fontSize: 12,
        color: colors.appBlack,
        marginVertical: 2
    },
    visiButtonStyle: {
        marginVertical: 10,
    },
    rowContainer: {
        width: "100%",
        zIndex: 1,
        top: 80,
        justifyContent: "center",
        position: "absolute",
        paddingLeft: 20,
    },
    backIconContainer: {
        width: 60,
        height: 60
    },
    relatedText: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 10
    },
    modalContainer: {
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        justifyContent: "center"
    },
    crossButtonContainer: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        position: "absolute",
        top: 60,
        right: 10
    },
    innerContainerContainer: {
        width: "100%",
    },
    coverImage: {
        width: "100%",
        height: 300,
        resizeMode: "cover"
    },
    bulletText: {
        fontSize: 8,
        color: colors.appBlack,
        marginVertical: 8
    },
    arrowButtonContainer: {
        width: "100%",
        marginVertical: 10,
        minHeight: 40,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    descRowContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 15,
        paddingHorizontal:5
    },
    descLeftContainer: {
        flex: 1,
    },
    leftRowContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5
    },
    descEntityTextHeading: {
        color: colors.appBlack,
        marginRight: 5,
        fontWeight:"bold",
        fontSize:12
    },
    descEntityText: {
        color: colors.appBlack,
        marginRight: 5,
        fontSize:12
    },
    descRightContainer: {
        flex: 1,
    }
})
export default styles;