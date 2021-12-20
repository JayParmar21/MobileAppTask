import React from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";
import { Font } from "../../Constant";
function CustomTextInput(props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  return (
    <View>
      <Text style={styles.labelWrap}>{props.label}</Text>
      <TextInput
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        style={[styles.textInputStyle, props.customStyle]}
        returnKeyLabel={props.returnKeyLabel}
        returnKeyType={props.returnKeyType}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        multiline={props.multiline}
      />
    </View>
  );
}
const makeStyles = (colors) =>
  StyleSheet.create({
    textInputStyle: {
      padding: 12,
      borderRadius: 10,
      fontSize: 14,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.text,
      color: colors.text,
    },
    labelWrap: {
      marginVertical: 10,
      fontSize: Font.FONT_14,
      color: colors.text,
    },
  });
export default CustomTextInput;
