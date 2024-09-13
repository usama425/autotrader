import React, {useState, useEffect} from 'react';
import {View, Text, SafeAreaView, Image, Alert} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Images from '../../assets/images';
import FacebookButton from '../../components/FacebookButton';
import AppInput from '../../components/AppInput';
import Icons from '../../assets/icons';
import {StackActions} from '@react-navigation/native';
import colors from '../../utils/colors';
import Loader from '../../components/Loader';
import {useDispatch} from 'react-redux';
import {registerAPI} from '../../api/methods/auth';
import Toast from 'react-native-toast-message';
import {loginInResponse, userIdResponse} from '../../redux/actions/actions';
import AppButton from '../../components/AppButton';

const Register = ({navigation}) => {
  const dispatch = useDispatch();

  const [credentials, setCredentials] = useState();
  const [missingField, setMissingField] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      credentials?.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(credentials?.email)
    ) {
      setMissingField('email');
      setInputFormat('email');
    } else {
      setMissingField('');
      setInputFormat('');
    }
  }, [credentials]);

  const checkInput = () => {
    if (!credentials?.first_name || credentials?.first_name?.length <= 0) {
      setMissingField('firstName');
    } else if (!credentials?.email || credentials?.email?.length <= 0) {
      setMissingField('email');
    } else if (!credentials?.password || credentials?.password?.length <= 0) {
      setMissingField('password');
    } else if (
      !credentials?.confirm_password ||
      credentials?.confirm_password?.length <= 0
    ) {
      setMissingField('confirmPassword');
    } else if (credentials?.password !== credentials?.confirm_password) {
      setMissingField('confirmPassword');
      setInputFormat('confirmPassword');
    } else {
      setMissingField('');
      setInputFormat('');
      registerUser();
    }
  };

  const registerUser = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('fname', credentials?.first_name);
      formData.append('lname', credentials?.last_name);
      formData.append('email', credentials?.email);
      formData.append('mobile', credentials?.mobile);
      formData.append('password', credentials?.password);
      formData.append('password_confirmation', credentials?.confirm_password);
      const response = await registerAPI(formData);
      if (response?.status === 200 || response?.status === 201) {
        showToast('success', 'Registered Successfully');
        dispatch(loginInResponse(response?.data?.token));
        dispatch(userIdResponse(response?.data?.user?.id));
        navigation.dispatch(StackActions.replace('HomeStack'));
      }
    } catch (error) {
      showToast('error', error?.response?.data?.message);
    }
    setLoading(false);
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
      <KeyboardAwareScrollView
        style={{
          width: '100%',
        }}>
        <View style={styles.innerContainer}>
          <Image
            source={Images.Splash}
            style={{width: 200, height: 200, resizeMode: 'contain'}}
          />
          <Text style={styles.registerText}>Register</Text>
          <Text style={styles.subHeadingText}>
            Setup a new account in a minute.
          </Text>
          {/* <FacebookButton
                        onPress={() => Alert.alert("in progress")}
                        mainStyle={{ marginTop: 10 }}
                    /> */}
          {/* <View style={styles.rowContainer}>
                        <View style={styles.leftLine}></View>
                        <View style={styles.roundContainer}>
                            <Text style={styles.orText}>or</Text>
                        </View>
                        <View style={styles.rightLine}></View>
                    </View> */}
          <View style={styles.inputRowContainer}>
            <AppInput
              placeholder={'First Name*'}
              isMandatory={missingField === 'firstName'}
              mainStyle={{width: '50%'}}
              placeholderTextColor={
                missingField === 'firstName' ? colors.warningRed : ''
              }
              onChange={text =>
                setCredentials({...credentials, first_name: text})
              }
            />
            <AppInput
              placeholder={'Last Name'}
              mainStyle={{width: '50%'}}
              onChange={text =>
                setCredentials({...credentials, last_name: text})
              }
            />
          </View>
          <AppInput
            placeholder={'Email'}
            keyboardType={'email-address'}
            isMandatory={missingField === 'email'}
            warningMessage={
              inputFormat === 'email'
                ? 'Please enter correct email (abc@gmail.com)'
                : ''
            }
            placeholderTextColor={
              missingField === 'email' ? colors.warningRed : ''
            }
            rightIcon={inputFormat === 'email' ? Icons?.warningIcon : ''}
            onChange={text => setCredentials({...credentials, email: text})}
          />
          <AppInput
            placeholder={'Mobile'}
            keyboardType={'number-pad'}
            onChange={text => setCredentials({...credentials, mobile: text})}
          />
          <AppInput
            placeholder={'Password*'}
            secureTextEntry={true}
            isMandatory={missingField === 'password'}
            placeholderTextColor={
              missingField === 'password' ? colors.warningRed : ''
            }
            onChange={text => setCredentials({...credentials, password: text})}
          />
          <AppInput
            placeholder={'Repeat Password*'}
            secureTextEntry={true}
            isMandatory={missingField === 'confirmPassword'}
            warningMessage={
              inputFormat === 'confirmPassword'
                ? 'Repeat password is not same as password'
                : ''
            }
            placeholderTextColor={
              missingField === 'confirmPassword' ? colors.warningRed : ''
            }
            onChange={text =>
              setCredentials({...credentials, confirm_password: text})
            }
          />
          <AppButton
            title={'Register'}
            titleAllCaps={true}
            mainStyle={{width: '98%', marginVertical: 10}}
            onPress={() => checkInput()}
          />
          <Text style={styles.dontHaveAccountText}>
            Already have an account?
          </Text>
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.registerText}>
            Click here to login.
          </Text>
          <Text style={styles.messageText}>
            {
              'We are here to help, contact us if you need\n assistant with your registration\n Sales department +233-257137998'
            }
          </Text>
        </View>
      </KeyboardAwareScrollView>
      <Toast />
      <Loader loading={loading} isShowIndicator={true} />
    </SafeAreaView>
  );
};

export default Register;
