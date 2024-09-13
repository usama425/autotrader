import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Picker from '../../components/Picker';
import AppButton from '../../components/AppButton';
import Loader from '../../components/Loader';
import {
  fetchAllCategories,
  fetchRegions,
  fetchRegionsById,
} from '../../api/methods/auth';

const StepOne = ({
  isFocused,
  onChange,
  showToast,
  categoryName,
  defaultValue,
  reset,
}) => {
  const [loading, setLoading] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [subRegionsList, setSubRegionsList] = useState([]);
  const [details, setDetails] = useState();
  const [missingField, setMissingField] = useState('');

  useEffect(() => {
    console.log('reset 1', reset);
    if (reset) {
      setDetails();
    }
  }, [reset]);

  useEffect(() => {
    defaultValue && setDetails(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    if (isFocused) {
      getAllCategories();
      getAllRegions();
    }
  }, [isFocused]);

  useEffect(() => {
    details?.region_id && getSubRegions(details?.region_id);
  }, [details?.region_id]);

  useEffect(() => {
    if (details?.category_id) {
      setMissingField('');
    }
    if (details?.region_id) {
      setMissingField('');
    }
    if (details?.subregion_id) {
      setMissingField('');
    }
  }, [details]);

  const getAllCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchAllCategories();
      if (response?.status >= 200) {
        setCategoriesList(response?.data?.Categorys);
      }
    } catch (error) {
      showToast && showToast('error', error?.response?.data?.message);
    }
    setLoading(false);
  };
  const getAllRegions = async () => {
    setLoading(true);
    try {
      const response = await fetchRegions();
      if (response?.status >= 200) {
        setRegionsList(response?.data?.Regions);
      }
    } catch (error) {
      showToast && showToast(('error', error?.response?.data?.message));
    }
    setLoading(false);
  };

  const getSubRegions = async id => {
    setLoading(true);
    try {
      const response = await fetchRegionsById(id);
      if (response?.status >= 200) {
        setSubRegionsList(response?.data?.Regions);
      }
    } catch (error) {
      showToast('error', error?.response?.data?.message);
    }
    setLoading(false);
  };

  const checkInput = () => {
    if (!details?.category_id) {
      setMissingField('category');
    } else if (!details?.region_id) {
      setMissingField('region');
    } else if (!details?.subregion_id) {
      setMissingField('sub-region');
    } else {
      onChange && onChange(details);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <Picker
        title={'Select Category'}
        showMandatoryStar={true}
        isMandatory={missingField === 'category'}
        items={categoriesList}
        keyToRender={'name'}
        defaultValue={details?.category_id}
        onChange={item => {
          categoryName && categoryName(item);
          setDetails({...details, category_id: item?.id});
        }}
      />
      <Picker
        title={'Select Region'}
        showMandatoryStar={true}
        isMandatory={missingField === 'region'}
        items={regionsList}
        keyToRender={'name'}
        defaultValue={details?.region_id}
        onChange={item => setDetails({...details, region_id: item?.id})}
      />
      <Picker
        title={'Select Sub Region'}
        showMandatoryStar={true}
        isMandatory={missingField === 'sub-region'}
        items={subRegionsList}
        keyToRender={'name'}
        defaultValue={details?.subregion_id}
        onChange={item => setDetails({...details, subregion_id: item?.id})}
      />
      <AppButton
        title={'next'}
        titleAllCaps={true}
        mainStyle={{
          width: '97%',
          alignSelf: 'center',
          marginVertical: 20,
        }}
        onPress={() => checkInput()}
      />
      <Loader loading={loading} isShowIndicator={true} />
    </View>
  );
};

export default StepOne;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
    marginVertical: 20,
    padding: 5,
  },
});
