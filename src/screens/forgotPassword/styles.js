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
        marginTop: "50%",
        padding: 10,
        alignItems: "center",
        justifyContent: "center"
    },
    welcomeText: {
        fontSize: 22,
        color: colors.appBlack,
        fontWeight: "500",
        marginBottom:20
    },
    resetButtonContainer: {
        width: "auto",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.warningRed,
        padding: 10,
        marginVertical: 20
    },
    resetText: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.warningRed
    }
})
export default styles;