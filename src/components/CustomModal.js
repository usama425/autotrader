import React, { useState } from "react";
import { View, StyleSheet, Alert, Text, Dimensions, } from "react-native"
// import { Colors } from '../utils/Colors'

import colors from "../utils/colors";
import { Modal } from "react-native";


export default CustomModal = ({
    visible
}) => {

    return (
        <View>
            <Modal visible={visible}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={[styles.container]}>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        alignSelf: 'center',
        height: 280,
        width: '80%',
        alignItems: 'center',
        // justifyContent: 'center',
        borderRadius: 20,
        // marginTop:'50%'
    },
})