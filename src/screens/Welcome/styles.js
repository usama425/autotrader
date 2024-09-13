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
        padding: 10,
        alignItems: "center"
    },
    welcomeText: {
        fontSize: 22,
        color: colors.appBlack,
        fontWeight: "500"
    },
    buttonStyle:{
        width:200,
        marginTop:15
    }
})

export default styles;