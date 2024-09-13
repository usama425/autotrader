import React, { useRef } from 'react';
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { IMAGEURL } from '../../api/config';
import CustomImageComponent from '../../components/CustomImageComponent';

const ImageHeader = ({
    onBackPress,
    postImages,
    onImagePress,
    slug
}) => {

    const ref = useRef()

    return (
        <View style={styles.mainContainer}>
            <Carousel
                ref={ref}
                data={postImages}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity style={styles.imageContainer} onPress={() => onImagePress && onImagePress(postImages)}>
                            <CustomImageComponent
                                mainStyle={styles.coverImage}
                                source={`${IMAGEURL}/${slug}/${item?.name}`}
                            />
                        </TouchableOpacity>
                    )
                }}

                sliderWidth={Dimensions.get("window").width}
                itemWidth={Dimensions.get("window").width}
            />
        </View>
    )
}

export default ImageHeader

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
    },
    rowContainer: {
        width: "100%",
        zIndex: 1,
        top: 20,
        position: "absolute",
        paddingLeft: 20,
    },
    backIconContainer: {
        width: 60,
        height: 60,
    },
    coverImage: {
        width: "100%",
        height: 400,
        resizeMode: "cover"
    },
    imageContainer: {
        width: 400,
    }
})