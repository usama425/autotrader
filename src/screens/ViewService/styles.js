import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white
    },
    innerContainer: {
        width: "100%",
        padding: 15
    },
    boxContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        padding: 15,
        marginBottom: 10
    },
    labelText: {
        color: colors.appBlack,
        marginLeft: 5,
        fontSize: 12,
        fontWeight: "500",
        marginBottom: 10
    },
    labelDefText: {
        color: colors.appGolden,
        fontWeight: "400"
    },
    descText: {
        fontSize: 12,
        color: colors.appBlack,
        marginVertical: 5,
        lineHeight: 20
    },
    showPhoneButton: {
        width: "100%",
        height: 45,
        backgroundColor: colors.appGolden,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:5,
        marginTop:10
    },
    phoneText:{
        color:colors.white,
    },
    logoStyle: {
        width: "100%",
        height: 60,
        resizeMode: "contain"
    },
    formBoxContainer: {
        width: "100%",
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5,
        paddingBottom:10,
        marginBottom: 10
    },
    grayHeadingContainer:{
        width:"100%",
        backgroundColor:colors.lightGrayBg,
        alignItems:"center",
        justifyContent:"center",
        height:40,
        borderTopRightRadius:5,
        borderTopLeftRadius:5
    },
    contactText:{
        color:colors.appBlack,
        fontSize:15
    },
    sendEmailText:{
        color:colors.appBlack,
        marginVertical:10,
        fontSize:12
    },
    formInputStyle:{
        width:"95%",
    },
    termsText:{
        fontSize:12,
        color:colors.appGolden
    }
})

export default styles;