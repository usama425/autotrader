import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';
import colors from '../../utils/colors';
import Loader from '../../components/Loader';
import {
  deleteAllNotifications,
  fetchNotifications,
} from '../../api/methods/auth';
import {useIsFocused} from '@react-navigation/native';
import {IMAGEURL} from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';
import AppButton from '../../components/AppButton';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const Notification = ({navigation}) => {
  const isFocused = useIsFocused();
  const {userId} = useSelector(state => state.userSession);

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    getAllNotification();
  }, [isFocused]);

  const getAllNotification = async () => {
    setLoading(true);
    try {
      const response = await fetchNotifications();
      if (response.status === 200) {
        if (response?.data?.status === 200) {
          setNotifications(response?.data?.notifications);
        }
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    } finally {
      setLoading(false);
    }
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  const handleDeleteNotifications = async () => {
    try {
      let formData = new FormData();
      console.log('userId', userId);
      formData.append('user_id', userId);
      const result = await deleteAllNotifications(formData);
      console.log('result', result.data);
      if (result?.status === 200) {
        setNotifications(result?.data?.notifications);
      }
    } catch (error) {
      console.log('error', error?.response?.message);
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() =>
          navigation.navigate('CarDetails', {
            id: item?.listing_id,
            categoryId: item?.category_id,
          })
        }>
        <View
          style={[
            styles.cardContainer,
            {
              borderBottomWidth: 1,
            },
          ]}>
          <View style={styles.imageContainer}>
            <View style={styles.upperRoundContainer}>
              <CustomImageComponent
                source={`${IMAGEURL}/${item?.image}`}
                mainStyle={{
                  width: 60,
                  height: 60,
                  borderRadius: 100,
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View style={styles.lowerRoundContainer}>
              <Image
                source={Icons?.postIcon}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  tintColor: colors.white,
                }}
              />
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: colors.appButtonColor,
              }}>
              {item?.title}
            </Text>
            <Text style={styles.titleText}>{item?.body}</Text>
            <View style={styles.timeContainer}>
              <Image
                source={Icons.clockIcon}
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: 'contain',
                  tintColor: colors.appButtonColor,
                }}
              />
              <Text style={styles.timeText}>{item?.Idate}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppHeader
        title={'Notifications'}
        leftIcon={Icons.backArrowIcon}
        onLeftIconPress={() => navigation.goBack()}
        rightSecondIcon={Icons.deleteIcon}
        onRightSecondPress={handleDeleteNotifications}
      />
      <View style={styles.innerContainer}>
        <FlatList
          data={notifications}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          ListEmptyComponent={() => {
            if (loading) {
              return;
            } else {
              return (
                <View style={styles.emptyContainer}>
                  <Image
                    source={Icons.emptyBell}
                    style={styles.notificationIconStyle}
                  />
                  <Text style={styles.emptyNotificationsHeading}>
                    No Notifications Yet
                  </Text>
                  <Text style={styles.emptyNotificationsDesc}>
                    When you get notifications, they will show here
                  </Text>
                  <AppButton
                    title={'Refresh'}
                    mainStyle={{width: 120, marginTop: 10}}
                    onPress={() => getAllNotification()}
                  />
                </View>
              );
            }
          }}
        />
      </View>
      <Loader loading={loading} isShowIndicator={true} />
      <Toast />
    </SafeAreaView>
  );
};

export default Notification;
