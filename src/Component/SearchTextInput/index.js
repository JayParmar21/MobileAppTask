import React from "react";
import { View, Dimensions, Image, TextInput, StyleSheet } from "react-native";
import { Font, icon } from "../../Constant";
import { useTheme } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../Utils/LayoutMeasurement";
const { width } = Dimensions.get("screen");
export const SearchTextInput = (props) => {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View style={styles.searchView}>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        placeholderTextColor={colors.text}
        style={styles.textInputStyle}
        onSubmitEditing={props.onSubmitEditing}
        keyboardType="numeric"
        returnKeyLabel="done"
        returnKeyType="done"
      />
      <View style={{ marginLeft: 5 }}>
        <Image source={icon.SEARCH} style={styles.searchImage} />
      </View>
    </View>
  );
};
const makeStyles = (colors) =>
  StyleSheet.create({
    searchView: {
      flexDirection: "row",
      backgroundColor: colors.background,
      width: width - 40,
      padding: wp("2.5%"),
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.text,
      marginTop: hp("3%"),
      justifyContent: "space-between",
    },
    searchImage: {
      width: wp("8%"),
      height: wp("8%"),
      resizeMode: "contain",
      tintColor: colors.text,
    },
    textInputStyle: {
      flex: 1,
      color: colors.text,
      fontSize: Font.FONT_14,
    },
  });
export default SearchTextInput;
