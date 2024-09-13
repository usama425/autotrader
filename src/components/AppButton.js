import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import colors from '../utils/colors';

const AppButton = ({
  title,
  titleAllCaps,
  leftIcon,
  tintColor,
  onPress,
  mainStyle,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={[styles.mainContainer, mainStyle]}
      onPress={() => onPress && onPress(title)}
      disabled={disabled}>
      {leftIcon && (
        <Image
          source={leftIcon}
          style={{
            width: 15,
            height: 15,
            tintColor: tintColor ? tintColor : colors.white,
            marginRight: 5,
          }}
        />
      )}
      <Text style={styles.titleColor}>
        {titleAllCaps ? title?.toUpperCase() : title}
      </Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: colors.appButtonColor,
  },
  titleColor: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 14,
  },
});
