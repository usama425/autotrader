import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import colors from '../../utils/colors';
import Icons from '../../assets/icons';
import CategoryList from '../../chunks/Home/CategoryList';
import Loader from '../../components/Loader';
import { fetchAllCategories } from '../../api/methods/auth';
import { useIsFocused } from '@react-navigation/native';
import { IMAGEURL } from '../../api/config';
import { useSelector } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

const Home = ({ navigation }) => {

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
      if (response?.status >= 200) {
        setCategoriesList(response?.data?.Categorys)
      }
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Something went wrong")
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
        }}><Image
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
            title={"Categories"}
            mainStyle={{ width: "auto", backgroundColor: colors.appBlack }}
            titleTextColor={{ color: colors.white, marginLeft: 10, }}
          />
        </View>
        <TouchableOpacity style={styles.searchButton} onPress={() => authenticationToken ? navigation.navigate("SearchListing") : navigation.dispatch(StackActions.replace('AuthStack'))}>
          <Image
            source={Icons.searchIcon}
            style={{
              width: 20,
              height: 20,
              objectFit: "contain",
              tintColor: colors.white
            }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.servicesButton} onPress={() => authenticationToken ? navigation.navigate("Services") : navigation.dispatch(StackActions.replace('AuthStack'))}>
        <Text style={styles.servicesText}>Services</Text>
      </TouchableOpacity>
      <CategoryList
        items={categoriesList}
        keyToRender={"name"}
        iconKeyRender={"image"}
        imageUrl={IMAGEURL}
        onSelect={(item) => {
          if (authenticationToken) navigation.navigate("Details", { title: item?.name, categoryId: item?.id, slug: item?.slug })
          else navigation.dispatch(StackActions.replace('AuthStack'))
        }
        }
      />
      <Loader loading={loading} isShowIndicator={true} />
      <Toast />
    </SafeAreaView>
  )
}

export default Home;
