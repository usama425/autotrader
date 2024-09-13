import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "center",
    },
    blackContainer: {
        width: "100%",
        backgroundColor: colors.appBlack,
        padding:15
    },
    categoryContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: colors.appBlack,
        padding: 10
    },
})

export default styles;