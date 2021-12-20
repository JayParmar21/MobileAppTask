import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  BackHandler,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { customColors, Font, strings } from "../../Constant";
import { useTheme } from "@react-navigation/native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../../Utils/LayoutMeasurement";
import { commonStyle } from "../../Theme/CommonStyles";
function Button(props) {
  return (
    <TouchableOpacity
      style={[styles.btnView, props.customStyle]}
      onPress={props.onPress}
    >
      <Text style={styles.btnText}>{props.title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  btnView: {
    width: wp("90%"),
    backgroundColor: customColors.BLUE,
    padding: wp("3%"),
    borderRadius: wp("2%"),
    marginVertical: hp("1%"),
  },
  btnText: {
    color: customColors.WHITE,
    fontSize: Font.FONT_14,
    textAlign: "center",
    fontWeight: "500",
  },
});
export default Button;
