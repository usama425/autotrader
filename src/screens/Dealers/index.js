import React, { useState, useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  View
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import colors from '../../utils/colors';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { fetchAllCategories } from '../../api/methods/auth';
import Toast from 'react-native-toast-message';
import CategoryList from '../../chunks/Home/CategoryList';
import Loader from '../../components/Loader';
import { IMAGEURL } from '../../api/config';
import { StackActions } from '@react-navigation/native';
import Icons from '../../assets/icons';

const Dealers = ({ navigation }) => {

  const { authenticationToken } = useSelector(state => state.userSession)

  const isFocused = useIsFocused()

  const [loading, setLoading] = useState(false)
  const [categoriesList, setCategoriesList] = useState([])

  useEffect(() => {
    isFocused && getAllCategories()
  }, [isFocused])

  const getAllCategories = async () => {
    setLoading(true)
    try {
      const response = await fetchAllCategories();
      if (response?.status >= 200) setCategoriesList(response?.data?.Categorys)
    } catch (error) {
      showToast("error", error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  }
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.blackContainer}>
        <View style={{
          width: "100%",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10
        }}>
          <Image
            source={Icons.appIcon}
            style={{
              width: 50,
              height: 50,
              borderRadius: 100,
              resizeMode: "contain",
              marginLeft: -40
            }}
          />
          <AppHeader
            title={"Dealer's Categories"}
            mainStyle={{ width: "auto" }}
            titleTextColor={{ color: colors.white, marginLeft: 10, }}
          />
        </View>
      </View>
      <CategoryList
        dealers={true}
        items={categoriesList}
        keyToRender={"name"}
        iconKeyRender={"image"}
        imageUrl={IMAGEURL}
        onSelect={(item) => {
          if (authenticationToken) navigation.navigate("DealersList", { categoryName: item?.name, categoryId: item?.id, slug: item?.slug })
          else navigation.dispatch(StackActions.replace('AuthStack'))
        }
        }
      />
      <Loader loading={loading} isShowIndicator={true} />
      <Toast />
    </SafeAreaView>
  )
}

export default Dealers;
