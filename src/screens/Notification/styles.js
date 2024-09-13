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
        height: "95%",
        padding: 20
    },
    renderContainer: {
        width: "100%",
        padding: 5,
    },
    headingText: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.placeholderColor,
        marginBottom: 15
    },
    cardContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        borderColor: colors.borderColor
    },
    imageContainer: {
        width: 70,
        height: 70,
        borderRadius: 10,
        borderColor: colors.borderColor,
        alignItems: 'center',
    },
    upperRoundContainer: {
        width: 60,
        height: 60,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.appBlack
    },
    lowerRoundContainer: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: colors.appBlack,
        position: "absolute",
        bottom: -5,
        right: 2,
        backgroundColor: colors.appBlack
    },
    infoContainer: {
        width: "90%",
        paddingHorizontal: 10
    },
    titleText: {
        fontSize: 12,
        color: colors.appBlack,
        marginTop: 10
    },
    timeContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    },
    timeText: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.appButtonColor,
        marginLeft: 5
    },
    emptyContainer: {
        width: "100%",
        height:"100%",
        alignItems: "center",
        justifyContent: "center",
        alignSelf:"center",
        marginTop:"30%"
    },
    notificationIconStyle: {
        width: 80, 
        height: 80,
        tintColor:colors.emptyGray
    },
    emptyNotificationsHeading:{
        fontSize:20,
        fontWeight:"bold",
        color:colors.emptyGray,
        marginVertical:5,
        textAlign:"center"
    },
    emptyNotificationsDesc:{
        fontSize:16,
        fontWeight:"600",
        color:colors.emptyGray,
        textAlign:"center"
    }
})

export default styles;