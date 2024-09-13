import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import colors from '../../utils/colors';
import Picker from '../../components/Picker';
import AppInput from '../../components/AppInput';
import TextArea from '../../components/TextArea';
import CheckboxGroup from '../../components/CheckBoxGroup';
import AppButton from '../../components/AppButton';
import {launchImageLibrary} from 'react-native-image-picker';
import Icons from '../../assets/icons';
import {
  fetchAllAdditionalFeatures,
  fetchAllParts,
  fetchBodyTypes,
  fetchMakes,
  fetchModels,
  postListinImages,
} from '../../api/methods/auth';
import {
  ScaleDecorator,
  NestableScrollContainer,
  NestableDraggableFlatList,
} from 'react-native-draggable-flatlist';

const carColors = [
  {id: 'beige', label: 'Beige'},
  {id: 'black', label: 'Black'},
  {id: 'blue', label: 'Blue'},
  {id: 'brown', label: 'Brown'},
  {id: 'burgandy', label: 'Burgandy'},
  {id: 'gold', label: 'Gold'},
  {id: 'gray', label: 'Gray'},
  {id: 'green', label: 'Green'},
  {id: 'ivory', label: 'Ivory'},
  {id: 'matt_black', label: 'Matt Black'},
  {id: 'off_white', label: 'Off White'},
  {id: 'orange', label: 'Orange'},
  {id: 'pearl', label: 'Pearl'},
  {id: 'pink', label: 'Pink'},
  {id: 'purple', label: 'Purple'},
  {id: 'red', label: 'Red'},
  {id: 'silver', label: 'Silver'},
  {id: 'teal', label: 'Teal'},
  {id: 'white', label: 'White'},
  {id: 'yellow', label: 'Yellow'},
  {id: 'other', label: 'Other'},
];

const carConditions = [
  {id: 'brand_new', label: 'Brand New'},
  {id: 'damaged', label: 'Damaged'},
  {id: 'locally_used', label: 'Locally Used'},
  {id: 'foreign_used', label: 'Foreign Used'},
];

const carTranmissions = [
  {id: 'amt', label: 'AMT'},
  {id: 'automatic', label: 'Automatic'},
  {id: 'semi_automatic', label: 'Semi Automatic'},
  {id: 'cvt', label: 'CVT'},
  {id: 'manual', label: 'Manual'},
];

const fuelTypes = [
  {id: 'petrol', label: 'Petrol'},
  {id: 'hybrid', label: 'Hybrid'},
  {id: 'electric', label: 'Electric'},
  {id: 'diesel', label: 'Diesel'},
  {id: 'cng', label: 'CNG'},
  {id: 'lpg', label: 'LPG'},
];

const BoxContainer = ({title, children, showMandatoryStar, isMandatory}) => {
  return (
    <View
      style={[
        styles.boxContainer,
        {
          borderColor: isMandatory ? colors?.warningRed : colors.borderColor,
        },
      ]}>
      <Text
        style={[
          styles.titleText,
          {
            color: isMandatory ? colors?.warningRed : colors.appBlack,
          },
        ]}>
        {title}
        <Text style={{color: colors.warningRed}}>
          {showMandatoryStar ? '*' : ''}
        </Text>
      </Text>
      {children}
    </View>
  );
};

const StepTwo = ({
  showToast,
  category,
  isFocused,
  onChange,
  onPostPress,
  showLoading,
  onPreviousPress,
  disabledScroll,
  reset,
}) => {
  const options = {
    opacity: 0.3,
    mediaType: 'photo',
    videoQuality: 'low',
    quality: 0.1,
    selectionLimit: 10,
  };

  const [loading, setLoading] = useState(false);
  const [years, setYears] = useState([]);
  const [images, setImages] = useState([]);
  const [makesList, setMakesList] = useState([]);
  const [models, setModels] = useState([]);
  const [bodyTypes, setBodyTypes] = useState([]);
  const [partsList, setPartsList] = useState([]);
  const [details, setDetails] = useState({});
  const [features, setFeatures] = useState([]);
  const [missingField, setMissingField] = useState('');

  useEffect(() => {
    console.log('reset 2', reset);
    if (reset) {
      setDetails();
    }
  }, [reset]);

  useEffect(() => {
    showLoading && showLoading(loading);
  }, [loading]);

  useEffect(() => {
    if (isFocused) {
      getYears();
      getAllAddFeatures();
    }
  }, [isFocused]);

  useEffect(() => {
    if (category) {
      getMakesList(category?.id);
      getBodyTypes(category?.id);
      getAllParts();
    }
  }, [category]);

  useEffect(() => {
    if (details?.title) {
      setMissingField('');
    } else if (details?.make_id) {
      setMissingField('');
    } else if (details?.modal_id) {
      setMissingField('');
    } else if (details?.body_type_id) {
      setMissingField('');
    } else if (details?.year) {
      setMissingField('');
    } else if (details?.color) {
      setMissingField('');
    } else if (details?.v_condition) {
      setMissingField('');
    } else if (details?.price) {
      setMissingField('');
    } else if (details?.mileage) {
      setMissingField('');
    } else if (details?.transmission) {
      setMissingField('');
    } else if (details?.fuel) {
      setMissingField('');
    } else if (details?.additional_features) {
      setMissingField('');
    } else if (details?.description) {
      setMissingField('');
    }
  }, [details]);

  const getYears = () => {
    let tempData = [];
    for (let index = 2023; index >= 1960; index--) {
      tempData.push({
        id: `${index}`,
        label: `${index}`,
      });
    }
    setYears(tempData);
  };

  const getMakesList = async id => {
    setLoading(true);
    try {
      const response = await fetchMakes(id);
      if (response?.status >= 200) {
        setMakesList(response?.data?.Makes);
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
    setLoading(false);
  };
  const getModalsList = async id => {
    setLoading(true);
    try {
      const response = await fetchModels(id);
      if (response?.status >= 200) {
        setModels(response?.data?.Models);
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
    setLoading(false);
  };
  const getBodyTypes = async id => {
    setLoading(true);
    try {
      const response = await fetchBodyTypes(id);
      if (response?.status >= 200) {
        setBodyTypes(response?.data?.Body_types);
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
    setLoading(false);
  };

  const getAllAddFeatures = async () => {
    setLoading(true);
    try {
      const response = await fetchAllAdditionalFeatures();
      if (response?.status >= 200) {
        setFeatures(response?.data?.data);
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
    setLoading(false);
  };

  const getAllParts = async () => {
    setLoading(true);
    try {
      const response = await fetchAllParts();
      if (response?.status === 200) {
        if (response?.data?.status === '200') {
          setPartsList(response?.data?.Part_types);
        }
      }
    } catch (error) {
      showToast(
        'error',
        error?.response?.data?.message || 'Something went wrong',
      );
    }
    setLoading(false);
  };

  const checkInput = () => {
    if (category?.name === 'Parts & Accessories') {
      if (details?.title) {
        setMissingField('title');
      } else if (!details?.make_id) {
        setMissingField('make');
        showToast('error', 'Please select make');
      } else if (!details?.v_condition) {
        setMissingField('condition');
        showToast('error', 'Please select condition');
      } else if (!details?.price) {
        setMissingField('price');
        showToast('error', 'Please enter price');
      } else if (!details?.part_type_id) {
        setMissingField('part_type');
        showToast('error', 'Please select part type');
      } else if (!details?.description) {
        setMissingField('description');
        showToast('error', 'Please enter description');
      } else {
        onPostPress && onPostPress(images);
      }
    } else if (category?.name !== 'Parts & Accessories') {
      if (!details?.make_id) {
        setMissingField('make');
        showToast('error', 'Please select make');
      } else if (!details?.modal_id) {
        setMissingField('model');
        showToast('error', 'Please select modal');
      } else if (!details?.body_type_id) {
        setMissingField('body');
        showToast('error', 'Please select body');
      } else if (!details?.year) {
        setMissingField('year');
        showToast('error', 'Please enter year');
      } else if (!details?.color) {
        setMissingField('color');
        showToast('error', 'Please select color');
      } else if (!details?.v_condition) {
        setMissingField('condition');
        showToast('error', 'Please select condition');
      } else if (!details?.price) {
        setMissingField('price');
        showToast('error', 'Please enter price');
      } else if (!details?.mileage) {
        setMissingField('mileage');
        showToast('error', 'Please enter mileage');
      } else if (!details?.transmission) {
        setMissingField('transmission');
        showToast('error', 'Please select transmission type');
      } else if (!details?.fuel) {
        setMissingField('fuel');
        showToast('error', 'Please select fuel type');
      } else if (!details?.description) {
        setMissingField('description');
        showToast('error', 'Please enter description');
      } else if (category?.name === 'Cars' && !details?.additional_features) {
        setMissingField('additional_fields');
        showToast('error', 'Please select atleast one additional feature');
      } else {
        onPostPress && onPostPress(images);
      }
    }
  };

  const showLibrary = () => {
    launchImageLibrary(options, callback);
  };

  const callback = async response => {
    let tempData = [];
    if (response.didCancel) {
      // uri = userInfo?.profile_picture
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else {
      const source = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      };
      if (response?.assets?.length === 1) {
        tempData = [...images];
        tempData?.push(source);
        setImages(tempData);
      } else {
        tempData = [...images];
        response?.assets.forEach(element => {
          if (tempData?.length >= 10) {
            showToast && showToast('error', 'Pictures Limit exceed');
          } else {
            tempData?.push(element);
          }
        });
        setImages(tempData);
      }
    }
  };

  const removeImage = item => {
    let tempData = [...images];
    let selectedIndex = tempData?.indexOf(item);
    if (selectedIndex > -1) {
      tempData.splice(selectedIndex, 1);
    }
    setImages(tempData);
  };

  const renderItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive && images && images?.length > 1}
          style={{
            width: '100%',
            alignItems: 'center',
            marginVertical: 5,
          }}>
          <View
            style={[
              styles.imageRowContainer,
              {
                borderWidth: isActive ? 1 : 0,
                borderColor: colors.appButtonColor,
              },
            ]}>
            {images && images?.length > 1 && (
              <Image
                source={Icons.dragIcon}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                  marginRight: 10,
                  tintColor: colors.appButtonColor,
                }}
              />
            )}
            <View style={styles.imageContainer}>
              <Image
                source={item}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 5,
                  resizeMode: 'contain',
                }}
              />
            </View>
            <TouchableOpacity
              disabled={false}
              style={styles.crossButtonContainer}
              onPress={() => removeImage(item)}>
              <Image
                source={Icons.redCrossIcon}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <KeyboardAwareScrollView style={{width: '100%'}} scrollEnabled={false}>
          <AppButton
            title={'Go to previous step'}
            mainStyle={{
              width: 150,
              marginBottom: 20,
            }}
            onPress={onPreviousPress}
          />
          <View style={styles.imageSelectorContainer}>
            <Text style={styles.uploadText}>
              Upload minimum 3 and upto 10 Images
            </Text>
            <View style={styles.rowContainer}>
              <TouchableOpacity
                style={styles.imageSelectorButton}
                onPress={() => {
                  if (images && images?.length >= 10) {
                    showToast && showToast('error', 'Pictures Limit exceed');
                  } else {
                    showLibrary();
                  }
                }}>
                <Text style={styles.imageSelectorTitle}>Browse Images</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={images && images?.length <= 0}
                style={[styles.imageSelectorButton, {marginLeft: 10}]}
                onPress={() => setImages([])}>
                <Text style={styles.imageSelectorTitle}>Clear All</Text>
              </TouchableOpacity>
            </View>
            {images && images?.length > 1 && (
              <Text
                style={[
                  styles.uploadText,
                  {
                    fontSize: 12,
                    fontWeight: 'bold',
                    marginBottom: 5,
                  },
                ]}>
                Long press to change the order of images
              </Text>
            )}
            {images && images?.length > 0 ? (
              <NestableScrollContainer>
                <NestableDraggableFlatList
                  data={images}
                  onDragBegin={() => disabledScroll && disabledScroll(false)}
                  onDragEnd={({data}) => {
                    setImages(data);
                    disabledScroll && disabledScroll(true);
                  }}
                  keyExtractor={item => item.uri}
                  renderItem={renderItem}
                />
              </NestableScrollContainer>
            ) : (
              <Text
                style={{
                  color: colors.appBlack,
                  paddingVertical: 5,
                }}>
                Browse images and add them. Images can be moved or rotated.
                First image will be main image on the advert.
              </Text>
            )}
          </View>

          <BoxContainer title={'Specifications:'}>
            {category?.name === 'Parts & Accessories' && (
              <AppInput
                title={'Title'}
                showMandatoryStar={true}
                placeholder={'Title'}
                isMandatory={missingField === 'title'}
                defaultValue={details?.price}
                onChange={text => {
                  setDetails({...details, price: text});
                  onChange && onChange('price', text);
                }}
              />
            )}
            <Picker
              title={'Make'}
              showMandatoryStar={true}
              items={makesList}
              keyToRender={'name'}
              isMandatory={missingField === 'make'}
              defaultValue={details?.make_id}
              onChange={item => {
                setDetails({...details, make_id: item});
                onChange && onChange('make_id', item);
                getModalsList(item?.id);
              }}
            />
            {category?.name !== 'Parts & Accessories' && (
              <>
                <Picker
                  title={'Model'}
                  showMandatoryStar={true}
                  items={models}
                  keyToRender={'modal_name'}
                  defaultValue={details?.modal_id}
                  isMandatory={missingField === 'model'}
                  onChange={item => {
                    setDetails({...details, modal_id: item});
                    onChange && onChange('modal_id', item);
                  }}
                />
                <Picker
                  title={'Body Type'}
                  showMandatoryStar={true}
                  items={bodyTypes}
                  keyToRender={'body_type_name'}
                  isMandatory={missingField === 'body'}
                  defaultValue={details?.body_type_id}
                  onChange={item => {
                    setDetails({...details, body_type_id: item?.body_type_id});
                    onChange && onChange('body_type_id', item?.body_type_id);
                  }}
                />
                <Picker
                  title={'Year of manufacture'}
                  showMandatoryStar={true}
                  items={years}
                  keyToRender={'label'}
                  isMandatory={missingField === 'year'}
                  defaultValue={details?.year}
                  onChange={item => {
                    setDetails({...details, year: item?.label});
                    onChange && onChange('year', item?.label);
                  }}
                />
                <Picker
                  title={'Color'}
                  showMandatoryStar={true}
                  items={carColors}
                  keyToRender={'label'}
                  isMandatory={missingField === 'color'}
                  defaultValue={details?.color}
                  onChange={item => {
                    setDetails({...details, color: item?.label});
                    onChange && onChange('color', item?.label);
                  }}
                />
              </>
            )}
            <AppInput
              title={'Special Edition'}
              placeholder={'Special Edition'}
              defaultValue={details?.special_edition}
              onChange={text => {
                setDetails({...details, special_edition: text});
                onChange && onChange('special_edition', text);
              }}
            />
            <Picker
              title={'Condition'}
              showMandatoryStar={true}
              items={carConditions}
              keyToRender={'label'}
              isMandatory={missingField === 'condition'}
              defaultValue={details?.v_condition}
              onChange={item => {
                setDetails({...details, v_condition: item?.label});
                onChange && onChange('v_condition', item?.label);
              }}
            />
            <AppInput
              title={'Price'}
              showMandatoryStar={true}
              placeholder={'Price (GH₵)'}
              keyboardType={'number-pad'}
              isMandatory={missingField === 'price'}
              defaultValue={details?.price}
              onChange={text => {
                setDetails({...details, price: text});
                onChange && onChange('price', text);
              }}
            />
            {category?.name === 'Parts & Accessories' && (
              <Picker
                title={'Part Type'}
                items={partsList}
                keyToRender={'name'}
                showMandatoryStar={true}
                isMandatory={missingField === 'part_type'}
                defaultValue={details?.part_type_id}
                onChange={item => {
                  setDetails({...details, part_type_id: item?.id});
                  onChange && onChange('part_type_id', item?.id);
                }}
              />
            )}
            {category?.name !== 'Parts & Accessories' && (
              <>
                <AppInput
                  title={'Mileage'}
                  showMandatoryStar={true}
                  placeholder={'Mileage'}
                  keyboardType={'number-pad'}
                  isMandatory={missingField === 'mileage'}
                  onChange={text => {
                    setDetails({...details, mileage: text});
                    onChange && onChange('mileage', text);
                  }}
                />
                <Picker
                  title={'Transmission'}
                  showMandatoryStar={true}
                  items={carTranmissions}
                  keyToRender={'label'}
                  defaultValue={details?.transmission}
                  isMandatory={missingField === 'transmission'}
                  onChange={item => {
                    setDetails({...details, transmission: item?.label});
                    onChange && onChange('transmission', item?.label);
                  }}
                />
                <Picker
                  title={'Fuel'}
                  showMandatoryStar={true}
                  items={fuelTypes}
                  keyToRender={'label'}
                  isMandatory={missingField === 'fuel'}
                  defaultValue={details?.fuel}
                  onChange={item => {
                    setDetails({...details, fuel: item?.label});
                    onChange && onChange('fuel', item?.label);
                  }}
                />
              </>
            )}

            {category?.name === 'Cars' && (
              <BoxContainer title={'Accessibility:'}>
                <Picker
                  title={'Seats'}
                  items={[
                    {id: '1', label: '1'},
                    {id: '2', label: '2'},
                    {id: '3', label: '3'},
                    {id: '4', label: '4'},
                    {id: '5', label: '5'},
                    {id: '6', label: '6'},
                    {id: '7', label: '7'},
                    {id: '8', label: '8'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.seats}
                  onChange={item => {
                    setDetails({...details, seats: item?.id});
                    onChange && onChange('seats', item?.id);
                  }}
                />
                <Picker
                  title={'Doors'}
                  items={[
                    {id: '2', label: '2'},
                    {id: '3', label: '3'},
                    {id: '4', label: '4'},
                    {id: '5', label: '5'},
                    {id: '6', label: '6'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.doors}
                  onChange={item => {
                    setDetails({...details, doors: item?.id});
                    onChange && onChange('doors', item?.id);
                  }}
                />
                <Picker
                  title={'Wheelchair accessible vehicles (WAV)'}
                  items={[
                    {id: 'yes', label: 'Yes'},
                    {id: 'no', label: 'No'},
                  ]}
                  defaultValue={details?.wav}
                  keyToRender={'label'}
                  onChange={item => {
                    setDetails({...details, wav: item?.label});
                    onChange && onChange('wav', item?.label);
                  }}
                />
                <Picker
                  title={'Motability'}
                  items={[
                    {id: 'yes', label: 'Yes'},
                    {id: 'no', label: 'No'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.motability}
                  onChange={item => {
                    setDetails({...details, motability: item?.label});
                    onChange && onChange('motability', item?.label);
                  }}
                />
              </BoxContainer>
            )}

            {category?.name !== 'Parts & Accessories' && (
              <BoxContainer title={'Performance:'}>
                <Picker
                  title={'Cylinders'}
                  items={[
                    {id: '3', label: '3'},
                    {id: '4', label: '4'},
                    {id: '6', label: '6'},
                    {id: '8', label: '8'},
                    {id: '10', label: '10'},
                    {id: '12', label: '12'},
                  ]}
                  defaultValue={details?.cylinders}
                  keyToRender={'label'}
                  onChange={item => {
                    setDetails({...details, cylinders: item?.id});
                    onChange && onChange('cylinders', item?.id);
                  }}
                />
                <AppInput
                  title={'Engine Capacity (Liters)'}
                  placeholder={'Enter enginer capacity in liters'}
                  defaultValue={details?.engine_capacity}
                  onChange={text => {
                    setDetails({...details, engine_capacity: text});
                    onChange && onChange('engine_capacity', text);
                  }}
                />
                <AppInput
                  title={'Engine Power (bhp)'}
                  placeholder={'Enter engine power in bhp'}
                  defaultValue={details?.engine_power}
                  onChange={text => {
                    setDetails({...details, engine_power: text});
                    onChange && onChange('engine_power', text);
                  }}
                />
                <Picker
                  title={'Acceleration'}
                  items={[
                    {id: '0', label: '0-5s (0-60mph)'},
                    {id: '1', label: '0-8s (0-60mph)'},
                    {id: '2', label: '8-12s (0-60mph)'},
                    {id: '3', label: '12s+ (0-60mph)'},
                  ]}
                  defaultValue={details?.acceleration}
                  keyToRender={'label'}
                  onChange={item => {
                    setDetails({...details, acceleration: item?.label});
                    onChange && onChange('acceleration', item?.label);
                  }}
                />
                <Picker
                  title={'Drivetrain'}
                  items={[
                    {id: 'awd', label: 'AWD'},
                    {id: 'four_wheel_drive', label: 'Four Wheel Drive'},
                    {id: 'front_wheel_drive', label: 'Front Wheel Drive'},
                    {id: 'rear_wheel_drive', label: 'Rear Wheel Drive'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.drivetrain}
                  onChange={item => {
                    setDetails({...details, drivetrain: item?.id});
                    onChange && onChange('drivetrain', item?.id);
                  }}
                />
              </BoxContainer>
            )}

            {category?.name !== 'Parts & Accessories' && (
              <BoxContainer title={'More Info:'}>
                <Picker
                  title={'Registered'}
                  items={[
                    {id: 'yes', label: 'Yes'},
                    {id: 'no', label: 'No'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.registered}
                  onChange={item => {
                    setDetails({...details, registered: item?.label});
                    onChange && onChange('registered', item?.label);
                  }}
                />
                <Picker
                  title={'Exchange Possible'}
                  items={[
                    {id: 'yes', label: 'Yes'},
                    {id: 'no', label: 'No'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.exchange_possible}
                  onChange={item => {
                    setDetails({...details, exchange_possible: item?.label});
                    onChange && onChange('exchange_possible', item?.label);
                  }}
                />
                <Picker
                  title={'Negotiable?'}
                  items={[
                    {id: 'yes', label: 'Yes'},
                    {id: 'no', label: 'No'},
                  ]}
                  keyToRender={'label'}
                  defaultValue={details?.negotiable}
                  onChange={item => {
                    setDetails({...details, negotiable: item?.label});
                    onChange && onChange('negotiable', item?.label);
                  }}
                />

                <AppInput
                  title={'VIN (Vehicle Identification Number)'}
                  placeholder={'VIN'}
                  defaultValue={details?.vin_number}
                  onChange={text => {
                    setDetails({...details, vin_number: text});
                    onChange && onChange('vin_number', text);
                  }}
                />
              </BoxContainer>
            )}

            {category?.name === 'Cars' && (
              <BoxContainer
                title={'Additional Features:'}
                showMandatoryStar={true}
                isMandatory={missingField === 'additional_fields'}>
                <CheckboxGroup
                  items={features}
                  keyToRender={'additional_features'}
                  onChange={list => {
                    setDetails({
                      ...details,
                      additional_features: list
                        ?.filter(e => e.isSelected)
                        ?.map(e => e.additional_features),
                    });
                    onChange &&
                      onChange(
                        'additional_features',
                        list
                          ?.filter(e => e.isSelected)
                          ?.map(e => e.additional_features),
                      );
                  }}
                />
              </BoxContainer>
            )}
            {category?.name !== 'Parts & Accessories' && (
              <AppInput
                title={
                  'Youtube Video ID In the following Youtube URL the id is FrKNa3hruBw (https://www.youtube.com/watch?v=FrKNa3hruBw)'
                }
                placeholder={'Youtube Video ID'}
                onChange={text => {
                  setDetails({...details, videoid: text});
                  onChange && onChange('videoid', text);
                }}
              />
            )}
            <TextArea
              title={'Description'}
              showMandatoryStar={true}
              placeholder={'Enter Description'}
              isMandatory={missingField === 'description'}
              placeholderColor={
                missingField === 'description' ? colors.warningRed : ''
              }
              onChange={text => {
                setDetails({...details, description: text});
                onChange && onChange('description', text);
              }}
            />
            <View
              style={{
                width: '100%',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.packageText}>
                Use your existing package/s to post an ad:
              </Text>

              <View style={styles.freeAddContainer}>
                <Text style={styles.freeAddHeadingText}>Free Add</Text>
                <Text style={styles.addInfoText}>
                  {'GH₵ 0.00\nUpload limit: 10\nValidity: 112 days'}
                </Text>
              </View>
            </View>

            <AppButton title={'Upload Advert'} onPress={() => checkInput()} />
          </BoxContainer>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

export default StepTwo;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 20,
    padding: 5,
  },
  boxContainer: {
    width: '100%',
    minHeight: 60,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.borderColor,
    marginVertical: 20,
    padding: 10,
  },
  titleText: {
    fontSize: 14,
    color: colors.appBlack,
    position: 'absolute',
    top: -10,
    left: 10,
    backgroundColor: colors.white,
  },
  packageText: {
    color: colors.appBlack,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  freeAddContainer: {
    width: 150,
    borderWidth: 1,
    borderColor: colors.appGolden,
    borderRadius: 5,
    alignItems: 'center',
  },
  freeAddHeadingText: {
    fontSize: 14,
    color: colors.appBlack,
    fontWeight: '500',
    marginVertical: 10,
    textAlign: 'center',
  },
  addInfoText: {
    color: colors.appBlack,
    textAlign: 'center',
    marginBottom: 10,
  },
  imageSelectorContainer: {
    width: '100%',
    flexDirection: 'column',
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.borderColor,
    backgroundColor: colors.lightWhiteBg,
  },
  uploadText: {
    color: colors.appBlack,
    fontSize: 12,
  },
  rowContainer: {
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSelectorButton: {
    width: 'auto',
    padding: 5,
    borderWidth: 1,
    borderColor: colors.appBlack,
    marginVertical: 10,
    borderRadius: 2,
  },
  imageSelectorTitle: {
    color: colors.appBlack,
    fontSize: 12,
    textAlign: 'center',
  },
  imageListContainer: {
    width: '100%',
    padding: 5,
    flexDirection: 'column',
    marginVertical: 10,
  },
  imageRowContainer: {
    width: '90%',
    minHeight: 80,
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderRadius: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.appBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossButtonContainer: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    marginBottom: 15,
  },
});
