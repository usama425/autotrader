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
    registerText: {
        fontSize: 22,
        color: colors.appBlack,
        fontWeight: "500"
    },
    subHeadingText: {
        fontSize: 15,
        color: colors.appBlack,
        fontWeight: "400",
        marginVertical: 10
    },
    rowContainer: {
        width: "100%",
        flexDirection: "row",
        marginVertical: 30,
        alignItems: "center",
        justifyContent:"center"
    },
    leftLine: {
        width: "40%",
        height: 0.5,
        backgroundColor: colors.borderColor
    },
    roundContainer: {
        width: 50,
        height: 50,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: colors.borderColor,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    orText: {
        color: colors.appBlack,
        fontSize: 14,
        fontWeight: "400"
    },
    rightLine: {
        width: "40%",
        height: 0.5,
        backgroundColor: colors.borderColor
    },
    inputRowContainer:{
        width:"100%",
        flexDirection:"row"
    },
    dontHaveAccountText:{
        fontSize:14,
        color:colors.appBlack,
        fontWeight:"500",
        marginTop:10,
        textAlign:"center"
    },
    registerText:{
        fontSize:15,
        fontWeight:"500",
        color:colors.appGolden,
        marginTop:10,
        textAlign:"center"
    },
    messageText:{
        fontSize:14,
        color:colors.appBlack,
        fontWeight:"500",
        marginVertical:20,
        textAlign:"center"
    }
})

export default styles;