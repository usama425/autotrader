import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Loader from './Loader';
import Images from '../assets/images';
import colors from '../utils/colors';

const CustomImageComponent = ({
    source,
    mainStyle,
    alternate,
    nameAlternateText
}) => {

    const [src, setSrc] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        source && checkURL(source)
    }, [source])

    const checkURL = async (url) => {
        setLoading(true)
        try {
            const response = await fetch(url);

            if (response.ok) setSrc({ uri: url })
            else setSrc(alternate ? alternate : Images.placeholder)
        } catch (error) {
            // An error occurred during the fetch
            setSrc(alternate ? alternate : Images.placeholder)
            console.error(`Error checking URL ${url}:`, error);

        } finally { setLoading(false) }
    };

    return (
        <View style={{ width: "auto", height: "auto", justifyContent: "center", alignItems: "center" }}>
            {src === Images.placeholder && nameAlternateText ? <View style={styles.altContainer}>
                <Text style={styles.altText}>{`${nameAlternateText}`}</Text>
            </View>
                :
                <Image
                    source={src}
                    style={[styles.imageStyle, mainStyle]}
                    alt='image not available'
                />}
            <Loader loading={loading} isShowIndicator={true} />
        </View>
    )
}

export default CustomImageComponent;

const styles = StyleSheet.create({
    imageStyle: {
        width: 100,
        height: 100,
        resizeMode: "cover",
        alignSelf: "center",
    },
    altContainer: {
        width: "auto",
        height: "auto",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#6c757d"
    },
    altText: {
        fontSize: 12,
        color: colors.white,
        flexWrap: "wrap",
        textAlign: "center",
        fontWeight: "600",
        width: 100
    }
})