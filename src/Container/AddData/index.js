import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import { commonStyle } from "../../Theme/CommonStyles";
import { useTheme } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomTextInput from "../../Component/CustomTextInput";
import Button from "../../Component/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddDataAction, ListDataAction } from "../../Redux/action";
import { heightPercentageToDP as hp } from "../../Utils/LayoutMeasurement";
import DropDownPicker from "react-native-dropdown-picker";
import { EditDataAction } from "../../Redux/action/EditDataAction";

const { width, height } = Dimensions.get("screen");

function AddData({ route }) {
  const { colors } = useTheme();
  const innerStyle = makeStyles(colors);
  const styles = commonStyle(colors);
  const { postData, edit } = route?.params || {};
  const isEdit = postData || edit;
  const [title, setTitle] = useState(postData?.title || "");
  const [body, setBody] = useState(postData?.body || "");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(postData?.userId || null);
  const [openUser, setOpenUser] = useState(false);
  const [valueUser, setValueUser] = useState(postData?.id || null);
  const [items, setItems] = useState([]);
  const [itemsUser, setItemsUser] = useState([]);
  const [firstSet, setFirstSet] = useState(false);
  const { ListData } = useSelector((state) => ({
    ListData: state.ListData,
  }));

  const reduxDispatch = useDispatch();

  useEffect(() => {
    reduxDispatch(ListDataAction());
  }, []);
  useEffect(() => {
    if (ListData?.listDataSuccess) {
      let listData = ListData?.data || [];

      let newItems = [];
      listData.forEach((element) => {
        newItems.includes(element.userId)
          ? null
          : newItems.push(element.userId);
      });
      setItems(
        newItems.map((item) => ({
          label: item,
          value: item,
        }))
      );
    }
  }, [ListData]);

  useEffect(() => {
    if (value) {
      let listData = ListData?.data || [];
      let newItems = [];
      listData.forEach((element) => {
        if (element.userId === value) {
          newItems.includes(element.id) ? null : newItems.push(element.id);
        }
      });
      setItemsUser(
        newItems.map((item) => ({
          label: item,
          value: item,
        }))
      );
      if (firstSet) {
        setValueUser(null);
      } else {
        setFirstSet(true);
      }
      setTitle("");
      setBody("");
    }
  }, [value]);

  useEffect(() => {
    if (valueUser) {
      let final = ListData?.data?.filter((item) => item.id === valueUser) || [];
      setTitle(final[0]?.title);
      setBody(final[0]?.body);
    }
  }, [valueUser]);

  const btnSubmit = () => {
    if (
      value === "" ||
      title === "" ||
      body === "" ||
      (valueUser === "" && isEdit)
    ) {
      Alert.alert("Please fill all the fields.");
    } else {
      if (isEdit)
        reduxDispatch(
          EditDataAction({ userId: value, id: valueUser, title, body })
        );
      else reduxDispatch(AddDataAction({ userId: value, title, body }));
      setTitle("");
      setBody("");
      setValue(null);
      setValueUser(null);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView>
        <View style={innerStyle.innerView}>
          <Text style={innerStyle.labelWrap}>User Group</Text>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            style={innerStyle.listWrap}
            placeholderStyle={innerStyle.placeHolderWrap}
            dropDownContainerStyle={innerStyle.listWrap}
            listItemLabelStyle={innerStyle.placeHolderWrap}
            labelStyle={innerStyle.placeHolderWrap}
            arrowIconStyle={innerStyle.iconWrap}
          />
          {isEdit && (
            <View>
              <Text style={innerStyle.labelWrap}>User Id</Text>
              <DropDownPicker
                open={openUser}
                value={valueUser}
                items={itemsUser}
                setOpen={setOpenUser}
                setValue={setValueUser}
                setItems={setItemsUser}
                style={innerStyle.listContent}
                placeholderStyle={innerStyle.placeHolderWrap}
                dropDownContainerStyle={innerStyle.listContent}
                listItemLabelStyle={innerStyle.placeHolderWrap}
                labelStyle={innerStyle.placeHolderWrap}
                arrowIconStyle={innerStyle.iconWrap}
              />
            </View>
          )}

          <CustomTextInput
            label="Title"
            value={title}
            onChangeText={(val) => setTitle(val)}
            placeholder="Enter Title"
            returnKeyLabel="next"
            returnKeyType="next"
          />
          <CustomTextInput
            label="Description"
            value={body}
            onChangeText={(val) => setBody(val)}
            placeholder="Enter Description"
            multiline={true}
            returnKeyLabel="done"
            returnKeyType="done"
            customStyle={{ height: 80 }}
          />
          <Button
            title={isEdit ? "Update" : "Submit"}
            onPress={() => btnSubmit()}
            customStyle={{ marginTop: hp("3%") }}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const makeStyles = (colors) =>
  StyleSheet.create({
    listContent: {
      zIndex: 99,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.text,
      color: colors.text,
    },
    listWrap: {
      zIndex: 9999,
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.text,
      color: colors.text,
    },
    placeHolderWrap: {
      color: colors.text,
    },
    iconWrap: {
      tintColor: colors.text,
    },
    labelWrap: {
      color: colors.text,
      paddingVertical: hp("2%"),
    },
    imgStyle: {
      width: 20,
      height: 20,
      resizeMode: "contain",
      tintColor: "#67BB52",
    },
    text: {
      marginHorizontal: 10,
      fontSize: 14,
    },
    innerView: {
      width: width - 40,
      alignSelf: "center",
      marginTop: 20,
      marginBottom: 50,
    },
  });
export default AddData;
