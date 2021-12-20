import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  BackHandler,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import { Font, customColors, strings, icon } from "../../Constant";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../Utils/LayoutMeasurement";
import { Card } from "react-native-shadow-cards";
import { commonStyle } from "../../Theme/CommonStyles";

function Details({ route, navigation }) {
  const { addListener } = useNavigation();
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  const [body, setBody] = useState("");
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const cStyle = commonStyle(colors);
  useEffect(() => {
    const unsubscribe = addListener("focus", async () => {
      if (route.params) {
        let data = route.params.data;
        setBody(data.body);
        setId(data.id);
        setTitle(data.title);
        setUserId(route.params.userId);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, [handleBackButtonClick]);

  function handleBackButtonClick() {
    navigation.goBack();
    return true;
  }
  const onEdit = () => {
    navigation.navigate("Edit Data", { postData: { userId, title, id, body } });
  };
  const CardValue = (props) => {
    return (
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>{props.title}</Text>
          <Text style={styles.text}>{props.value}</Text>
        </View>
        {props.edit ? (
          <TouchableOpacity onPress={onEdit}>
            <Image source={icon.EDIT} style={styles.iconWrap} />
          </TouchableOpacity>
        ) : null}
      </View>
    );
  };
  return (
    <View style={cStyle.container}>
      <Card style={styles.cardView}>
        <CardValue title={strings.USER_ID} value={userId} edit />
        <CardValue title={strings.ID} value={id} />
        <CardValue title={strings.TITLE} value={title} />
        <CardValue title={strings.BODY} value={body} />
      </Card>
    </View>
  );
}
const makeStyles = (colors) =>
  StyleSheet.create({
    header: {
      fontSize: Font.FONT_16,
      color: colors.text,
      marginVertical: wp("2%"),
      fontWeight: "500",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    headerText: {
      fontWeight: "bold",
      fontSize: Font.FONT_16,
      color: colors.text,
    },
    text: {
      fontWeight: "300",
      fontSize: Font.FONT_14,
      color: colors.text,
      textTransform: "capitalize",
    },
    cardView: {
      marginTop: hp("2%"),
      padding: hp("2%"),
      backgroundColor: colors.background,
      borderColor: colors.text,
      borderWidth: 1,
    },
    iconWrap: {
      width: wp("5%"),
      height: hp("4%"),
      resizeMode: "contain",
      alignContent: "flex-start",
      tintColor: colors.text,
    },
  });
export default Details;
