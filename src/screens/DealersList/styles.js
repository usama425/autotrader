import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
    },
    innerContainer: {
        width: "100%",
        height:"95%",
        paddingTop: 10,
        paddingHorizontal: 10,
        paddingBottom: 120,
        marginTop: 20,
    },
    alphabetFilterRenderItem: {
        width: 60,
        height: 50,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        marginRight: 10
    },
    renderText: {
        fontSize: 15,
        fontWeight: "500",
        color: colors.appBlack
    },
    clearButton: {
        width: 200,
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginTop: -20,
        marginBottom: 15,
        paddingRight: 10
    },
    clearText: {
        color: colors.warningRed,
        fontWeight: "500",
        textAlign: "center"
    },
    searchText: {
        fontSize: 15,
        color: colors.appBlack,
        fontWeight: "bold",
        marginBottom: 20,

    },
    blackContainer: {
        width: "100%",
        backgroundColor: colors.appBlack,
        padding: 15,
        flexDirection: "row",
        alignItems: "center"
    },
    leftIconContainer: {
        width: 70,
        height: 50,
        position: "absolute",
        left: -20,
        top: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    leftIcon: {
        width: 15,
        height: 15,
        tintColor: colors.white,
        resizeMode: "contain"
    },
})

export default styles;