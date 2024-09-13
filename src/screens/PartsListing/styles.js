import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.lightWhiteBg,
        alignItems: "center",
    },
    innerContainer: {
        width: "100%",
        height: "90%",
        padding: 20,
    },
    browseText: {
        fontSize: 15,
        fontWeight: "500"
    },
    flatListContainer: {
        width: "100%",
        alignItems:"center",
        padding:10,
        marginVertical:10
    }
})

export default styles;