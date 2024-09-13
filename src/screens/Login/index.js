import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Image, Platform, Alert} from 'react-native';
import styles from './styles';
import Images from '../../assets/images';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import Icons from '../../assets/icons';
import Checkbox from '../../components/Checkbox';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StackActions} from '@react-navigation/native';
import colors from '../../utils/colors';
import Toast from 'react-native-toast-message';
import Loader from '../../components/Loader';
import {loginAPI, socialLoginAPI} from '../../api/methods/auth';
import {
  loginInResponse,
  saveCredentials,
  userIdResponse,
} from '../../redux/actions/actions';
import {useDispatch, useSelector} from 'react-redux';
import SocialButton from '../../components/SocialButton';
import {
  Settings,
  AccessToken,
  LoginButton,
  LoginManager,
  GraphRequestManager,
  GraphRequest,
  Profile,
} from 'react-native-fbsdk-next';
import {AppleButton} from '@invertase/react-native-apple-authentication';
import auth from '@react-native-firebase/auth';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {BASE_URL} from '../../api/config';
import axios from 'axios';
import {PROVIDERS} from '../../utils/enums';

const Login = ({navigation}) => {
  const {credentials} = useSelector(state => state.userSession);
  const dispatch = useDispatch();
  const [details, setDetails] = useState();
  const [isRemebered, setIsRemebered] = useState(false);
  const [missingField, setMissingField] = useState('');
  const [inputFormat, setInputFormat] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      details?.email &&
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(details?.email)
    ) {
      setMissingField('email');
      setInputFormat('email');
    } else {
      setMissingField('');
      setInputFormat('');
    }
  }, [details, details?.email]);

  useEffect(() => {
    setDetails({email: credentials?.email, password: credentials?.password});
  }, [credentials]);

  const checkInput = () => {
    if (!details?.email || details?.email?.length <= 0) {
      setMissingField('email');
    } else if (!details?.password || details?.password?.length <= 0) {
      setMissingField('password');
    } else {
      setMissingField('');
      setInputFormat('');
      loginUser();
    }
  };

  const socialLogin = async (user, provider_name, provider_id) => {
    try {
      setLoading(true);
      let payload = new FormData();
      payload.append('email', user?.email);
      payload.append('name', user?.name);
      payload.append('provider_name', provider_name);
      payload.append('provider_id', provider_id);
      const response = await socialLoginAPI(payload);
      console.log('response', response?.data);
      if (response?.data?.status === '200') {
        showToast('success', 'Login Successfully');
        dispatch(loginInResponse(response?.data?.token));
        dispatch(userIdResponse(response?.data?.User?.id));
        navigation.dispatch(StackActions.replace('HomeStack'));
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      showToast('error', error?.response?.data?.message);
    }
  };
  const loginUser = async () => {
    setLoading(true);
    try {
      let formData = new FormData();
      formData.append('email', details?.email);
      formData.append('password', details?.password);
      const response = await loginAPI(formData);
      if (response?.status === 200 || response?.status === 201) {
        if (response?.data?.status === '200') {
          showToast('success', 'Login Successfully');
          dispatch(loginInResponse(response?.data?.token));
          dispatch(userIdResponse(response?.data?.User?.id));
          if (isRemebered) {
            dispatch(
              saveCredentials({
                email: details?.email,
                password: details?.password,
              }),
            );
          }
          navigation.dispatch(StackActions.replace('HomeStack'));
        }
      }
    } catch (error) {
      console.log(error);
      showToast('error', error?.response?.data?.message);
    }
    setLoading(false);
  };

  const loginWithFacebook = () => {
    LoginManager.logInWithPermissions(['email']).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          console.log(
            'Login success with permissions: ' +
              result.grantedPermissions.toString(),
          );
          AccessToken.getCurrentAccessToken().then(data => {
            console.log(data.accessToken.toString());
            console.log('result-->', result);
          });
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const showToast = (type, text1, text2) => {
    Toast.show({
      type: type,
      text1: text1,
      text2: text2,
    });
  };

  async function onAppleButtonPress() {
    // Start the sign-in request
    const res = auth().currentUser;
    if (res) {
      await auth().signOut();
    }
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      // See: https://github.com/invertase/react-native-apple-authentication#faqs
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce, email, fullName} = appleAuthRequestResponse;
    console.log('appleAuthRequestResponse', appleAuthRequestResponse);
    await AsyncStorage.setItem(
      'appleData',
      JSON.stringify(appleAuthRequestResponse),
    );
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );

    console.log('appleCredential', appleCredential);
    // Sign the user in with the credential
    const data = await auth().signInWithCredential(appleCredential);
    if (data?.user?.email) {
      const payload = {
        email: email,
        name: fullName?.givenName,
      };
      socialLogin(payload, PROVIDERS.GOOGLE, appleCredential.providerId);
    }
    console.log('data', data);
  }

  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      const res = auth().currentUser;
      console.log('res', res);
      if (res) {
        await auth().signOut();
      }
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken, user} = await GoogleSignin.signIn();
      console.log('user', user);
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log('googleCredential', googleCredential);
      // Sign-in the user with the credential
      const data = await auth().signInWithCredential(googleCredential);
      console.log('data', data);
      if (idToken && user?.email) {
        socialLogin(user, PROVIDERS.GOOGLE, googleCredential.providerId);
      }
    } catch (error) {
      console.log('error', error);
      showToast('error', error?.response?.data?.message);
    }
  }

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
          <Text style={styles.welcomeText}>Welcome!</Text>
          <Text style={styles.subHeadingText}>
            Use credentials to access your account.
          </Text>
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
            rightIcon={inputFormat === 'email' ? Icons.warningIcon : ''}
            defaultValue={details?.email}
            onChange={text => setDetails({...details, email: text})}
          />
          <AppInput
            placeholder={'Password'}
            isMandatory={missingField === 'password'}
            secureTextEntry={true}
            defaultValue={details?.password}
            placeholderTextColor={
              missingField === 'password' ? colors.warningRed : ''
            }
            onChange={text => setDetails({...details, password: text})}
          />
          <View style={styles.rowContainer}>
            <Checkbox
              isSelected={isRemebered}
              title={'Remember Me'}
              onChange={() => setIsRemebered(!isRemebered)}
            />
            <Text
              onPress={() => navigation.navigate('ForgotPassword')}
              style={styles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </View>
          <AppButton
            title={'Enter your account'}
            titleAllCaps={true}
            mainStyle={{width: '98%', marginVertical: 10}}
            leftIcon={Icons.lockIcon}
            onPress={() => checkInput()}
          />
          <Text style={styles.dontHaveAccountText}>Don't have an account?</Text>
          <Text
            onPress={() => navigation.navigate('Register')}
            style={styles.registerText}>
            Click here to register.
          </Text>
          {/* <SocialButton
                        mainStyle={{ backgroundColor: colors.facebookBlue }}
                        leftIcon={Icons.facebookIcon}
                        title={"Sign In With Facebook"}
                        onPress={() => loginWithFacebook()}
                    /> */}
          {Platform.OS === 'ios' && (
            <AppleButton
              buttonStyle={AppleButton.Style.WHITE}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                width: 160,
                height: 45,
              }}
              onPress={onAppleButtonPress}
            />
          )}
          <LoginButton
            style={{width: '100%', height: 45}}
            permissions={['email', 'public_profile']}
            onLoginFinished={(error, result) => {
              if (error) {
                console.log('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.log('login is cancelled.');
              } else {
                console.log('result', result);
                if (Platform.OS === 'ios') {
                  AuthenticationToken.getAuthenticationTokenIOS().then(
                    async data => {
                      console.log(data?.authenticationToken);
                      console.log('fb ios data', data);
                      const userProfile = await Profile.getCurrentProfile();
                      console.log('User Profile:', userProfile);
                      const infoRequest = new GraphRequest(
                        '/me',
                        {
                          accessToken: data.accessToken,
                          parameters: {
                            fields: {
                              string: 'email,name',
                            },
                          },
                        },
                        (error, result) => {
                          if (error) {
                            console.log('Error fetching user info:', error);
                          } else {
                            console.log('User Info:', result);
                            socialLogin(
                              userProfile,
                              'facebook',
                              'facebook.com',
                            );
                          }
                        },
                      );

                      // Start the request
                      new GraphRequestManager().addRequest(infoRequest).start();
                    },
                  );
                } else {
                  AccessToken.getCurrentAccessToken().then(async data => {
                    console.log(data?.accessToken.toString());
                    console.log('fb android data', data);
                    const userProfile = await Profile.getCurrentProfile();
                    console.log('User Profile:', userProfile);
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken: data.accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name',
                          },
                        },
                      },
                      (error, result) => {
                        if (error) {
                          console.log('Error fetching user info:', error);
                        } else {
                          console.log('User Info:', result);
                          socialLogin(userProfile, 'facebook', 'facebook.com');
                        }
                      },
                    );

                    // Start the request
                    new GraphRequestManager().addRequest(infoRequest).start();
                  });
                }
              }
            }}
            onLogoutFinished={() => console.log('logout.')}
            loginTrackingIOS={'limited'}
            nonceIOS={'my_nonce'}
          />
          <SocialButton
            mainStyle={{backgroundColor: colors.googleRed}}
            leftIcon={Icons.googlePlusIcon}
            title={'Sign In With Google'}
            onPress={onGoogleButtonPress}
          />
        </View>
      </KeyboardAwareScrollView>
      <Toast />
      <Loader loading={loading} isShowIndicator={true} />
    </SafeAreaView>
  );
};

export default Login;
