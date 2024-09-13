import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "center",
    },
    absoluteContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        zIndex: 1,
        alignItems:"center",
        justifyContent:"center",
    },
    optionsContainer:{
        width:"70%",
        backgroundColor:colors.borderColor,
        borderWidth:1,
        borderRadius:5,
        alignItems:"center",
        justifyContent:"center",
        padding:20
    },
    innerContainer: {
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    cardContainer: {
        width: "100%",
        padding: 10,
        backgroundColor: colors.lightWhiteBg,
        borderRadius: 5,
        marginVertical: 10
    },
    profileContainer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContainer: {
        width: 80,
        height: 80,
        borderRadius: 100
    },
    nameText: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.appBlack,
        marginVertical: 10
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.appBlack,
        marginTop: 10
    },
    bottomContainer: {
        width: "100%",
        backgroundColor: colors.white,
        borderWidth: 1,
        borderColor: colors.borderColor,
        borderRadius: 5
    },
    buttonContainer: {
        marginTop: "auto",
        width: "100%",
        height: 60,
        backgroundColor: colors.lightWhiteBg,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        justifyContent: "center",
        padding: 10
    },
    uploadPencilStyle:{
        width:40,
        height:40,
        backgroundColor:colors.appBlack,
        borderRadius:100,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        zIndex:1,
        right:-10,
        bottom:2
    },
    editText:{
        fontSize:15,
        color:colors.appBlack,
        fontWeight:"600",
        marginBottom:15
    }
})

export default styles;