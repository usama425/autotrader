import { StyleSheet } from "react-native";
import colors from "../../utils/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        alignItems: "center",
    },
    blackContainer: {
        width: "100%",
        backgroundColor:colors.appBlack,
        padding:15,
        flexDirection:"row",
        alignItems:"center"
    },
    categoryContainer: {
        width: "100%",
        minHeight: 100,
        backgroundColor: colors.appBlack,
        padding: 10
    },
    searchButton:{
        width:50,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        right:10,
        zIndex:1
    },
    servicesButton:{
        width:100,
        height:40,
        alignItems:"center",
        justifyContent:"center",
        alignSelf:"flex-end",
    },
    servicesText:{
        fontSize:16,
        color:colors.warningRed,
        fontWeight:"bold",
    }
})

export default styles;