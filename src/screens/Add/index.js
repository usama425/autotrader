import React, {useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import styles from './styles';
import AppHeader from '../../components/AppHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Selector from '../../components/Selector';
import StepOne from '../../chunks/Add/StepOne';
import Toast from 'react-native-toast-message';
import StepTwo from '../../chunks/Add/StepTwo';
import {useSelector} from 'react-redux';
import Loader from '../../components/Loader';
import {postListinImages} from '../../api/methods/auth';
import {BASE_URL} from '../../api/config';

const Add = ({navigation}) => {
  const {userId, authenticationToken} = useSelector(state => state.userSession);

  const [selectedTab, setSelectedTab] = useState('step1');
  const [selectedCategory, setSelectedCategory] = useState({});
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState();
  const [disabledScroll, setDisabledScroll] = useState(true);
  const [reset, setreset] = useState(false);

  const postAdd = async list => {
    setLoading(true);
    let body = {
      user_id: userId,
      category_id: details?.category_id || '',
      name:
        `${details?.make_id?.name}, ${details?.modal_id?.modal_name}, ${details?.year}, ${details?.color}` ||
        '',
      slug:
        `${details?.name} - ${details?.modal_id?.modal_name} - ${details?.year} - ${details?.color}` ||
        '',
      region_id: details?.region_id || '',
      subregion_id: details?.subregion_id || '',
      v_condition: details?.v_condition || '',
      price: details?.price || '',
      make_id: details?.make_id?.id || '',
      modal_id: details?.modal_id?.modal_id || '',
      body_type_id: details?.body_type_id || '',
      year: details?.year || '',
      mileage: details?.mileage || '',
      transmission: details?.transmission || '',
      description: details?.description || '',
      additional_features: details?.additional_features || '',
      color: details?.color || '',
      special_edition: details?.special_edition || '',
      part_type_id: details?.part_type_id || '',
      exchange_possible: details?.exchange_possible || '',
      negotiable: details?.negotiable || '',
      registered: details?.registered || '',
      vin_number: details?.vin_number || '',
      seats: details?.seats || '',
      doors: details?.doors || '',
      wav: details?.wav || '',
      fuel: details?.fuel || '',
      motability: details?.motability || '',
      cylinders: details?.cylinders || '',
      engine_capacity: details?.engine_capacity || '',
      engine_power: details?.engine_power || '',
      acceleration: details?.acceleration || '',
      drivetrain: details?.drivetrain || '',
      additional_features: details?.additional_features || '',
      videoid: details?.videoid || '',
      user_packages: {
        ads_type: 'Vehicles',
        name: 'Free Ad',
        price: 0.0,
        vehicles_limit: 10,
        days_limit: 120,
      },
    };
    body = JSON.stringify(body);
    await fetch(`${BASE_URL}/post_listing`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authenticationToken}`,
      },
      body: body,
    })
      .then(response => response.json())
      .then(async res => {
        if (res?.status === '200') {
          if (list && list?.length > 0) {
            await postImages(res?.listing_id, list);
            setreset(true);
          } else {
            showToast('success', 'Add Posted Successfully');
            setreset(true);
            setTimeout(() => {
              navigation.navigate('Home');
            }, 3000);
          }
        } else {
          showToast('error', 'something went wrong');
        }
      })
      .catch(error => console.log('error', error));
    setLoading(false);
  };

  const postImages = async (listing_id, list) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('listing_id', listing_id);
      list &&
        list?.forEach((element, index) => {
          formData.append(`images[${index}]`, {
            uri: element.uri,
            type: element.type || 'image/jpeg',
            name: element.name || `image_${index}`,
          });
        });
      const response = await postListinImages(formData);
      if (response?.status === 200) {
        if (response?.data?.status === '200') {
          showToast('success', 'Add Posted Successfully');
          setTimeout(() => {
            navigation.navigate('Home');
          }, 3000);
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

  return (
    <SafeAreaView style={styles.mainContainer}>
      <AppHeader title={'Post Your Advert'} />
      <KeyboardAwareScrollView
        style={{width: '100%'}}
        scrollEnabled={disabledScroll}>
        <View style={styles.innerContainer}>
          <Selector
            items={[
              {id: 'step1', label: 'STEP1: About Advert'},
              {id: 'step2', label: 'STEP2: Advert Details'},
            ]}
            defaultValue={selectedTab}
            keyToRender={'label'}
          />
          {selectedTab === 'step1' ? (
            <StepOne
              isFocused={selectedTab === 'step1'}
              defaultValue={details}
              reset={reset}
              categoryName={item => {
                setSelectedCategory(item);
              }}
              onChange={item => {
                setDetails({
                  ...details,
                  category_id: item?.category_id,
                  region_id: item?.region_id,
                  subregion_id: item?.subregion_id,
                });
                setSelectedTab('step2');
              }}
            />
          ) : (
            <StepTwo
              reset={reset}
              isFocused={selectedTab === 'step2'}
              onPreviousPress={() => setSelectedTab('step1')}
              category={selectedCategory}
              showToast={(type, text) => showToast(type, text)}
              onChange={(key, value) => setDetails({...details, [key]: value})}
              onPostPress={imageList => postAdd(imageList)}
              showLoading={value => setLoading(value)}
              disabledScroll={value => setDisabledScroll(value)}
            />
          )}
        </View>
      </KeyboardAwareScrollView>
      <Toast />
      <Loader loading={loading} isShowIndicator={true} />
    </SafeAreaView>
  );
};

export default Add;
