import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
import Loader from '../../components/Loader';
import AppButton from "../../components/AppButton";
import RadioGroup from '../../components/RadioGroup';
import { fetchBodyTypes, fetchMakes, fetchModels, fetchRegions, fetchRegionsById } from '../../api/methods/auth';
import Icons from '../../assets/icons';
import Slider from '@react-native-community/slider';
import colors from '../../utils/colors';
import AppInput from '../../components/AppInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const carColors = [
    { id: "beige", label: "Beige" },
    { id: "black", label: "Black" },
    { id: "blue", label: "BLue" },
    { id: "brown", label: "Brown" },
    { id: "burgandy", label: "Burgandy" },
    { id: "gold", label: "Gold" },
    { id: "gray", label: "Gray" },
    { id: "green", label: "Green" },
    { id: "ivory", label: "Ivory" },
    { id: "matt_black", label: "Matt Black" },
    { id: "off_white", label: "Off White" },
    { id: "orange", label: "Orange" },
    { id: "pearl", label: "Pearl" },
    { id: "pink", label: "Pink" },
    { id: "purple", label: "Purple" },
    { id: "red", label: "Red" },
    { id: "silver", label: "Silver" },
    { id: "teal", label: "Teal" },
    { id: "white", label: "White" },
    { id: "yellow", label: "Yellow" },
    { id: "other", label: "Other" },
]


const carConditions = [
    { id: "brand_new", label: "Brand New" },
    { id: "damaged", label: "Damaged" },
    { id: "locally_used", label: "Locally Used" },
    { id: "foreign_used", label: "Foreign Used" },
]

const carTranmissions = [
    { id: "amt", label: "AMT" },
    { id: "automatic", label: "Automatic" },
    { id: "semi_automatic", label: "Semi Automatic" },
    { id: "cvt", label: "CVT" },
    { id: "manual", label: "Manual" },
]

const fuelTypes = [
    { id: "petrol", label: "Petrol" },
    { id: "hybrid", label: "Hybrid" },
    { id: "electric", label: "Electric" },
    { id: "diesel", label: "Diesel" },
    { id: "cng", label: "CNG" },
    { id: "lpg", label: "LPG" },
]

const Filters = ({
    onCrossPress,
    showToast,
    onSearchPress,
    defaultFilters,
    categoryId,
    regionsList,
    makesList,
    bodyTypes,
    isFocused
}) => {

    const [loading, setLoading] = useState(false)
    const [subRegionsList, setSubRegionsList] = useState([])
    const [modelsList, setModelsList] = useState([])
    const [minimumPriceLimit, setMinimumPriceLimit] = useState(categoryId === 7 ? 0 : 1000)
    const [maximumPriceLimit, setMaximumPriceLimit] = useState(categoryId === 7 ? 5000 : 1000000)
    const [minYear, setMinYear] = useState(1990)
    const [maxYear, setMaxYear] = useState(2023)

    const [details, setDetails] = useState()

    useEffect(() => {
        if (isFocused) {
            if (defaultFilters) setDetails(defaultFilters)
            else setDetails(null)
        }

    }, [defaultFilters])

    const getSubRegions = async (id) => {
        setLoading(true)
        try {
            const response = await fetchRegionsById(id)
            if (response?.status >= 200) setSubRegionsList(response?.data?.Regions)
        } catch (error) {
            showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }


    const getModalsList = async (id) => {
        setLoading(true)
        try {
            const response = await fetchModels(id);
            if (response?.status >= 200) {

                setModelsList(response?.data?.Models)
            }
        } catch (error) {
            showToast && showToast("error", error?.response?.data?.message)
        } setLoading(false)
    }



    return (
        <View style={styles.filterContainer}>
            <View style={styles.filterTopRowContainer}>
                <Text style={styles.filterTitle}>Advacnced Search</Text>
                <TouchableOpacity style={styles.crossButtonContainer} onPress={onCrossPress}>
                    <Image
                        source={Icons.simpleCrossIcon}
                        style={{
                            width: 15,
                            height: 15,
                            resizeMode: "contain"
                        }}
                    />
                </TouchableOpacity>
            </View>

            <View style={{
                width: "100%",
                height: "80%",
            }}>

                <KeyboardAwareScrollView style={{
                    width: "100%",
                    padding: 10,
                }}>
                    <RadioGroup
                        title={"Region"}
                        items={regionsList}
                        keyToRender={"name"}
                        noOfColumns={2}
                        count={"listings_count"}
                        defaultValue={details?.region_id}
                        titleCustomStyle={styles.radioGroupTitle}
                        onChange={(item) => {
                            getSubRegions(item?.id)
                            setDetails({ ...details, "region_id": item?.id })
                        }}
                    />
                    {subRegionsList && subRegionsList?.length > 0 && <RadioGroup
                        title={"Sub Region"}
                        items={subRegionsList}
                        keyToRender={"name"}
                        noOfColumns={2}
                        defaultValue={details?.subregion_id}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        onChange={(item) => {
                            setDetails({ ...details, "subregion_id": item?.id })
                        }}
                    />}
                    {makesList && makesList?.length > 0 && <RadioGroup
                        title={"Make"}
                        items={makesList}
                        keyToRender={"name"}
                        noOfColumns={2}
                        keyToCompare={"id"}
                        count={"listings_count"}
                        defaultValue={details?.make_id}
                        titleCustomStyle={styles.radioGroupTitle}
                        onChange={(item) => {
                            getModalsList(item?.id)
                            setDetails({ ...details, "make_id": item?.id })
                        }}
                        mainStyle={{
                            marginVertical: 10
                        }}
                    />}
                    {(modelsList && modelsList?.length > 0 && categoryId !== 7) && <RadioGroup
                        title={"Modal"}
                        items={modelsList}
                        keyToRender={"modal_name"}
                        noOfColumns={2}
                        defaultValue={details?.modal_id}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        keyToCompare={"modal_id"}
                        onChange={(item) => {
                            setDetails({ ...details, "modal_id": item?.modal_id })
                        }}
                    />}
                    {bodyTypes && bodyTypes?.length > 0 && <RadioGroup
                        title={"Body Type"}
                        items={bodyTypes}
                        keyToRender={"body_type_name"}
                        keyToCompare={"body_type_id"}
                        noOfColumns={2}
                        titleCustomStyle={styles.radioGroupTitle}
                        defaultValue={details?.body_type_id}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        onChange={(item) => {
                            setDetails({ ...details, "body_type_id": item?.body_type_id })
                        }}
                    />}
                    <RadioGroup
                        title={"Condition"}
                        items={carConditions}
                        keyToRender={"label"}
                        noOfColumns={2}
                        keyToCompare={"label"}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        defaultValue={details?.v_condition}
                        onChange={(item) => {
                            setDetails({ ...details, "v_condition": item?.label })
                        }}
                    />
                    <View style={styles.sliderContainer}>
                        <Text style={styles.radioGroupTitle}>Price</Text>
                        <Text style={styles.sliderLimitText}>{`Minimum Price: GH₵ ${minimumPriceLimit}`}</Text>
                        {categoryId === 7 ? <>
                            <Slider
                                style={{
                                    width: "100%",
                                    height: 40,
                                }}
                                value={details?.min_price || minimumPriceLimit}
                                minimumValue={0}
                                maximumValue={1000}
                                minimumTrackTintColor={colors.appBlack}
                                maximumTrackTintColor={colors.appBlack}
                                thumbTintColor={colors.warningRed}
                                onValueChange={(value) => {
                                    setMinimumPriceLimit(parseInt(value))
                                    setDetails({ ...details, "min_price": parseInt(value) })
                                }}
                            />
                            <Text style={styles.sliderLimitText}>{`Maximum Price: GH₵ ${maximumPriceLimit}`}</Text>
                            <Slider
                                style={{
                                    width: "100%",
                                    height: 40,
                                }}
                                value={details?.max_price || maximumPriceLimit}
                                minimumValue={1000}
                                maximumValue={5000}
                                minimumTrackTintColor={colors.appBlack}
                                maximumTrackTintColor={colors.appBlack}
                                thumbTintColor={colors.warningRed}
                                onValueChange={(value) => {
                                    setMaximumPriceLimit(parseInt(value))
                                    setDetails({ ...details, "max_price": parseInt(value) })
                                }}
                            />
                        </> :
                            <>
                                <Slider
                                    style={{
                                        width: "100%",
                                        height: 40,
                                    }}
                                    value={details?.min_price || minimumPriceLimit}
                                    minimumValue={1000}
                                    maximumValue={50000}
                                    minimumTrackTintColor={colors.appBlack}
                                    maximumTrackTintColor={colors.appBlack}
                                    thumbTintColor={colors.warningRed}
                                    onValueChange={(value) => {
                                        setMinimumPriceLimit(parseInt(value))
                                        setDetails({ ...details, "min_price": parseInt(value) })
                                    }}
                                />
                                <Text style={styles.sliderLimitText}>{`Maximum Price: GH₵ ${maximumPriceLimit}`}</Text>
                                <Slider
                                    style={{
                                        width: "100%",
                                        height: 40,
                                    }}
                                    value={details?.max_price || maximumPriceLimit}
                                    minimumValue={50000}
                                    maximumValue={1000000}
                                    minimumTrackTintColor={colors.appBlack}
                                    maximumTrackTintColor={colors.appBlack}
                                    thumbTintColor={colors.warningRed}
                                    onValueChange={(value) => {
                                        setMaximumPriceLimit(parseInt(value))
                                        setDetails({ ...details, "max_price": parseInt(value) })
                                    }}
                                />
                            </>}
                    </View>

                    {categoryId !== 7 && <View style={styles.sliderContainer}>
                        <Text style={styles.radioGroupTitle}>Year</Text>
                        <Text style={styles.sliderLimitText}>{`Min Year: ${minYear}`}</Text>
                        <Slider
                            style={{
                                width: "100%",
                                height: 40,
                            }}
                            value={details?.min_year || minYear}
                            minimumValue={1990}
                            maximumValue={2010}
                            minimumTrackTintColor={colors.appBlack}
                            maximumTrackTintColor={colors.appBlack}
                            thumbTintColor={colors.warningRed}
                            onValueChange={(value) => {
                                setMinYear(parseInt(value))
                                setDetails({ ...details, "min_year": value })
                            }}
                        />
                        <Text style={styles.sliderLimitText}>{`Max Year: ${maxYear}`}</Text>
                        <Slider
                            style={{
                                width: "100%",
                                height: 40,
                            }}
                            value={details?.max_year || maxYear}
                            minimumValue={2011}
                            maximumValue={2023}
                            minimumTrackTintColor={colors.appBlack}
                            maximumTrackTintColor={colors.appBlack}
                            thumbTintColor={colors.warningRed}
                            onValueChange={(value) => {
                                setMaxYear(parseInt(value))
                                setDetails({ ...details, "max_year": value })
                            }}
                        />
                    </View>}
                    {categoryId !== 7 && <>
                        <Text style={styles.radioGroupTitle}>{"Max Mileage"}</Text>
                        <AppInput
                            placeholder={"Type here"}
                            keyboardType={"number-pad"}
                            defaultValue={details?.mileage}
                            onChange={(text) => {
                                setDetails({ ...details, "mileage": text })
                            }}
                        />
                    </>}
                    {categoryId !== 7 && <RadioGroup
                        title={"Color"}
                        items={carColors}
                        keyToRender={"label"}
                        noOfColumns={2}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        keyToCompare={"label"}
                        defaultValue={details?.color}
                        onChange={(item) => {
                            console.log("item==>>", item);
                            setDetails({ ...details, "color": item?.label })
                        }}
                    />}
                    {categoryId !== 7 && <RadioGroup
                        title={"Transmission"}
                        items={carTranmissions}
                        keyToRender={"label"}
                        noOfColumns={2}
                        keyToCompare={"label"}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        defaultValue={details?.transmission}
                        onChange={(item) => {
                            setDetails({ ...details, "transmission": item?.label })
                        }}
                    />}
                    {categoryId !== 7 && <RadioGroup
                        title={"Fuel"}
                        items={fuelTypes}
                        keyToRender={"label"}
                        noOfColumns={2}
                        keyToCompare={"label"}
                        titleCustomStyle={styles.radioGroupTitle}
                        mainStyle={{
                            marginVertical: 10
                        }}
                        defaultValue={details?.fuel}
                        onChange={(item) => {
                            setDetails({ ...details, "fuel": item?.label })
                        }}
                    />}
                </KeyboardAwareScrollView>
            </View>
            <AppButton
                mainStyle={{
                    marginTop: "auto",
                    width: "92%",
                    alignSelf: "center"
                }}
                title={"Search"}
                titleAllCaps={true}
                onPress={() => onSearchPress && onSearchPress(details)}
            />
            <Loader loading={loading} isShowIndicator={true} />
        </View >
    )
}

export default Filters

const styles = StyleSheet.create({
    filterContainer: {
        width: "100%",
        height: "90%",
        padding: 10,
    },
    filterTopRowContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
        paddingHorizontal: 5
    },
    crossButtonContainer: {
        width: 100,
        alignItems: "flex-end"
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.appBlack
    },
    radioGroupTitle: {
        fontSize: 16,
        fontWeight: "600"
    },
    sliderContainer: {
        width: "100%",
        padding: 10,
    },
    sliderLimitText: {
        fontSize: 14,
        fontWeight: "400",
        textAlign: "center",
        color: colors.appBlack,
        marginVertical: 10
    }
})