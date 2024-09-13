import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    innerContainer: {
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    welecomeText: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.appGolden,
        marginLeft:15
    },
    contentContainer: {
        width: 200,
        alignSelf: "center"
    },
    ghanaText: {
        fontSize: 20,
        fontWeight: "600",
        color: colors.warningRed,
        marginLeft:15
    }
})

export default styles;