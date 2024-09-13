import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    TouchableOpacity
} from 'react-native';
import colors from '../../utils/colors';
import SearchInput from '../../components/SearchInput';
import Picker from '../../components/Picker';
import Icons from '../../assets/icons';

const SearchHeader = ({
    navigation,
    onSearch,
    onFilterPress
}) => {
    return (
        <View style={styles.mainContainer}>
            <TouchableOpacity style={styles.leftIconContainer} onPress={()=>navigation.goBack()}>
                <Image
                    source={Icons.headerBackIcon}
                    style={styles.leftIcon}
                />
            </TouchableOpacity>
            <SearchInput
                placeholder={"Type here"}
                resultList={[
                    "Mazda MX-5",
                    "Volkswagen Kübelwagen",
                    "Porsche Cayenne",
                    "Vauxhall Chevette",
                    "Dymaxion car",
                    "Ford Crown Victoria",
                    "Plymouth Superbird",
                    "Saab 9000"
                ]}
                mainStyle={{
                    width: "90%",
                    alignSelf: "flex-end"
                }}
                rightIcon={Icons.equilizerIcon}
                rightIconPress={onFilterPress}
            />
        </View>
    )
}

export default SearchHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        padding: 10,
    },
    leftIconContainer: {
        width: 70,
        height: 50,
        position: "absolute",
        left:-10,
        top:15,
        alignItems: "center",
        justifyContent: "center"
    },
    leftIcon: {
        width: 25,
        height: 25,
        tintColor: colors.appBlack,
        resizeMode: "contain"
    },
})