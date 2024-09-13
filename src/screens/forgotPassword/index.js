import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AppInput from '../../components/AppInput';
import colors from '../../utils/colors';
import AppHeader from '../../components/AppHeader';
import Icons from '../../assets/icons';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [missingField, setMissingField] = useState('');
  const [wrongFormat, setWrongFormat] = useState(false);

  useEffect(() => {
    if (email || email?.length <= 0) {
      setMissingField('');
      setWrongFormat(false);
    } else if (email && email?.length > 0) {
      setMissingField('');
    } else if (
      email &&
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
    ) {
      setWrongFormat(false);
    }
  }, [email]);

  const checkInput = () => {
    if (!email || email?.length <= 0) {
      setMissingField('email');
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setWrongFormat(true);
    } else {
      alert('password changed');
    }
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppHeader
        leftIcon={Icons.arrowIcon}
        leftIconStyle={{
          transform: [{rotate: '270deg'}],
        }}
        onLeftIconPress={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        style={{
          width: '100%',
        }}>
        <View style={styles.innerContainer}>
          <Text style={styles.welcomeText}>Reset Password</Text>
          <AppInput
            title={'E-Mail Address'}
            isMandatory={missingField === 'email'}
            placeholderTextColor={
              missingField === 'email' ? colors?.warningRed : ''
            }
            warningMessage={
              wrongFormat ? 'Please enter correct email (abc@gmail.com)' : ''
            }
            placeholder={'Enter email'}
            onChange={text => {
              setEmail(text);
            }}
          />
          <TouchableOpacity
            style={styles.resetButtonContainer}
            onPress={() => checkInput()}>
            <Text style={styles.resetText}>Send Password Reset Link</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
