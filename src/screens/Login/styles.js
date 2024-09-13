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
    welcomeText:{
        fontSize:22,
        color:colors.appBlack,
        fontWeight:"500"
    },
    subHeadingText:{
        fontSize:15,
        color:colors.appBlack,
        fontWeight:"400",
        marginVertical:10
    },
    rowContainer:{
        width:"95%",
        marginVertical:10,
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    forgotPasswordText:{
        fontSize:15,
        fontWeight:"500",
        color:colors.appGolden,
    },
    dontHaveAccountText:{
        fontSize:14,
        color:colors.appBlack,
        fontWeight:"500",
        marginTop:10,
        textAlign:"center",
    },
    registerText:{
        fontSize:15,
        fontWeight:"500",
        color:colors.appGolden,
        marginTop:10,
        textAlign:"center",
        marginBottom:10
    },
})

export default styles;