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
        padding: 15
    },
    heading: {
        color: colors.appBlack,
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 10,
        textAlign: "center"
    },
    policyText: {
        color: colors.appBlack,
        fontSize: 13,
        textAlign: "center"
    },
    boxContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        padding: 15,
        marginBottom:10
    },
    tagLine: {
        color: colors.appBlack,
        fontWeight: "500",
        marginVertical: 10,
        marginLeft: 5
    },
    labelText: {
        color: colors.appBlack,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 10
    },
    labelDefText: {
        color: colors.appGolden,
        fontWeight: "400"
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
    descText: {
        fontSize: 12,
        color: colors.appBlack,
        marginVertical: 5,
        lineHeight: 20
      },
    
})

export default styles;