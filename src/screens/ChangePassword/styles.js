import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        justifyContent:"center"
    },
    innerContainer:{
        width:"100%",
        alignItems:"center",
        padding:10,
    },
    headingText:{
        fontSize:18,
        fontWeight:"600",
        color:colors.appBlack,
        marginBottom:20,
        marginLeft:15,
        marginTop:"20%"
    }
})

export default styles;