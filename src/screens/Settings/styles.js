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
        padding:10,
        alignItems:"center"
    },
    cardContainer:{
        width:"100%",
        padding:10,
        backgroundColor:colors.lightWhiteBg,
        borderRadius:5,
        marginVertical:10
    }
})

export default styles;