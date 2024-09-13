import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import colors from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';

const ServicesCardView = ({
  item,
  navigation
}) => {

  const stripHtmlTags = (htmlString) => {
    const regex = /(<([^>]+)>)/ig;
    return htmlString.replace(regex, '');
  };

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.titleText}>{item?.name || "--"}</Text>
      <Text style={styles.descText}>{stripHtmlTags(item?.description) || "--"}</Text>
      <TouchableOpacity style={styles.getButtonContainer} onPress={() => navigation.navigate("ServiceDetails", { id: item?.id, title: item?.name })}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#434240', '#7b6840', '#8f773f']} style={styles.getButtonContainer}>
          <Text style={styles.getButtonText}>Get This Service</Text>
        </LinearGradient >
      </TouchableOpacity>
    </View >
  )
}

export default ServicesCardView

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    padding: 10,
    marginBottom: 10
  },
  titleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.appBlack
  },
  descText: {
    fontSize: 12,
    color: colors.appBlack,
    marginVertical: 5,
    lineHeight: 20
  },
  getButtonContainer: {
    width: 150,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginVertical: 5
  },
  getButtonText: {
    color: colors.white,
    fontWeight: "500"
  }
})