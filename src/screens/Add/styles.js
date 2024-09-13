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
        padding: 15,
        alignItems: "center"
    },
})

export default styles;