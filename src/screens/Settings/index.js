import React, {useEffect, useState} from 'react';
import {Alert, Linking, SafeAreaView, View} from 'react-native';
import styles from './styles';
import SettingsHeader from '../../chunks/Settings/SettingsHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ArrowButton from '../../chunks/Settings/ArrowButton';
import Icons from '../../assets/icons';
import {Link, StackActions, useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {logoutUser} from '../../redux/actions/actions';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import {fetchUserById} from '../../api/methods/auth';
import {IMAGEURL} from '../../api/config';

const Settings = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const {userId} = useSelector(state => state.userSession);

  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});

  useEffect(() => {
    if (isFocused && userId) {
      getUserDetails(userId);
    }
  }, [isFocused, userId]);

  const logout = async () => {
    setLoading(true);
    showToast('success', 'Logout Successfully');
    dispatch(logoutUser());
    navigation.dispatch(StackActions.replace('AuthStack'));
    setLoading(false);
  };

  const getUserDetails = async id => {
    setLoading(true);
    try {
      const response = await fetchUserById(id);
      if (response?.status === 200 || response?.status === 201) {
        if (response?.data?.status === '200') {
          setDetails(response?.data?.user);
        } else {
          showToast('error', 'something went wrong');
        }
      } else {
        setDetails({});
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <SettingsHeader />
      <KeyboardAwareScrollView style={{width: '100%'}}>
        <View style={styles.innerContainer}>
          <View style={styles.cardContainer}>
            <ArrowButton
              title={`${details?.fname} ${details?.lname || ''}`}
              type={'profile'}
              source={`${IMAGEURL}/${details?.image}`}
              onPress={() => navigation.navigate('UserProfile')}
            />
          </View>

          <View style={styles.cardContainer}>
            <ArrowButton
              title={'My Adverts'}
              icon={Icons.infoShieldIcon}
              onPress={() => navigation.navigate('MyAdverts')}
            />
          </View>
          {/* <View style={styles.cardContainer}>
            <ArrowButton
              title={"Services"}
              icon={Icons.infoShieldIcon}
              onPress={() => navigation.navigate("Services")}
            />
          </View> */}
          <View style={styles.cardContainer}>
            <ArrowButton
              title={'Change Password'}
              icon={Icons.lockIcon}
              onPress={() => navigation.navigate('ChangePassword')}
            />
          </View>

          <View style={styles.cardContainer}>
            <ArrowButton
              title={'About Us'}
              icon={Icons.infoShieldIcon}
              onPress={() => navigation.navigate('AboutUs')}
            />
            <ArrowButton
              title={'Privacy Policy'}
              icon={Icons.infoShieldIcon}
              mainStyle={{marginVertical: 20}}
              onPress={() => navigation.navigate('PrivacyPolicy')}
            />
            <ArrowButton
              title={'Terms & Conditions'}
              icon={Icons.infoShieldIcon}
              onPress={() => navigation.navigate('TermsAndConditions')}
            />
          </View>

          <View style={styles.cardContainer}>
            <ArrowButton
              title={'Delete Account'}
              icon={Icons.logoutIcon}
              onPress={() => {
                Alert.alert(
                  'Alert',
                  'Are you sure you want to delete this account?',
                  [
                    {
                      text: 'Yes',
                      onPress: () =>
                        Linking.openURL(
                          `http://deleteaccount.alphanitesofts.net/${userId}`,
                        ),
                    },
                    {
                      text: 'No',
                      onPress: () => {},
                    },
                  ],
                );
              }}
            />
          </View>
          <View style={styles.cardContainer}>
            <ArrowButton
              title={'Logout'}
              icon={Icons.logoutIcon}
              onPress={() => logout()}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Toast />
      <Loader loading={loading} isShowIndicator={true} />
    </SafeAreaView>
  );
};

export default Settings;
