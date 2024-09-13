import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.lightWhiteBg,
        // alignItems: "center",
    },
    boxContainer: {
        width: "100%",
        flexDirection:"column",
        backgroundColor: colors.lightWhiteBg,
        marginTop:20
    },
    rowContainer: {
        width: "100%",
        height:40,
        paddingHorizontal: 20,
        flexDirection: "row",
    },
    leftRowContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
    },
    actionButton: {
        width: 40,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
    },
    actionIcon: {
        width: 20,
        height: 20,
        resizeMode: "contain",
        tintColor: colors.appBlack
    },
    buttonRowContainer: {
        width: "auto",
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 5
    },
    actionButtonText: {
        fontSize: 12,
        marginLeft: 5,
        color: colors.appBlack,
    },
    clearButton: {
        width: 200,
        alignItems: "flex-end",
        alignSelf: "flex-end",
        marginBottom: 10,
        paddingRight: 20
    },
    clearText: {
        color: colors.warningRed,
        fontWeight: "500",
        textAlign: "center"
    },
    makeModal: {
        width: 300,
        height: 300,
        backgroundColor: colors.white,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderRadius:5
    },
    modalRowContainer:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:10
    },
    modalHeadingText:{
        fontWeight:"bold",
        color:colors.appBlack,
        marginTop:10,
        marginLeft:5
    },
    crossContainer:{
        width:40,
        height:40,
        alignSelf:"flex-end",
        alignItems:"center",
        justifyContent:"center",
    },
    xText:{
        fontSize:22,
        fontWeight:"bold",
        color:colors.appBlack
    },
    renderContainer:{
        width:"100%",
        borderBottomWidth:1,
        borderColor:colors.borderColor,
        paddingVertical:10,
        flexDirection:"row",
        alignItems:"center"
    },
    renderItemText:{
        fontSize:12,
        color:colors.appBlack
    }
})
export default styles;