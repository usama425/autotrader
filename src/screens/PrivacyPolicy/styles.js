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
        padding: 10
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
    }
})

export default styles;