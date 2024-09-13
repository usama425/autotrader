import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    innerContainer: {
        width: "100%",
        height: "90%",
        paddingTop: 10,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    emptContainer: {
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