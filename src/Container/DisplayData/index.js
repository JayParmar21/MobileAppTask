import React, { useEffect, useState } from "react";
import { View, Text, BackHandler } from "react-native";
import { Font, strings } from "../../Constant";
import { useDispatch, useSelector } from "react-redux";
import { ListDataAction } from "../../Redux/action";
import { useTheme } from "@react-navigation/native";
import ListDataView from "../../Component/ListData";
import { heightPercentageToDP as hp } from "../../Utils/LayoutMeasurement";
import SearchTextInput from "../../Component/SearchTextInput";
import { commonStyle } from "../../Theme/CommonStyles";
import { DeleteDataAction } from "../../Redux/action/DeleteAction";
function DisplayData({ navigation }) {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { ListData } = useSelector((state) => ({
    ListData: state.ListData,
  }));
  const reduxDispatch = useDispatch();

  const { colors } = useTheme();
  const styles = commonStyle(colors);
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
    BackHandler.exitApp();
    return true;
  }
  useEffect(() => {
    reduxDispatch(ListDataAction());
  }, []);
  useEffect(() => {
    if (ListData?.listDataSuccess) {
      let listData = ListData.data;
      var groups = {};
      for (var i = 0; i < listData.length; i++) {
        var userId = listData[i].userId;
        if (!groups[userId]) {
          groups[userId] = [];
        }
        groups[userId].push({
          title: listData[i].title,
          id: listData[i].id,
          body: listData[i].body,
        });
      }
      let myArray = [];
      for (var userId in groups) {
        myArray.push({
          userId: parseInt(userId),
          data: groups[userId],
          isExpanded: false,
        });
      }
      setData(myArray);
    }
  }, [ListData]);
  const listItem = (userId) => {
    data.map((item, index) => {
      if (!item.isExpanded && item.userId == userId) {
        item.isExpanded = true;
      } else {
        item.isExpanded = false;
      }
    });
    setData([...data]);
  };
  const filterData = (val) => {
    let dummyData = [];
    data.map((item, index) => {
      if (item.userId == val) {
        dummyData.push(item);
      }
    });
    setSearchData(dummyData);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSearchText("");
    reduxDispatch(ListDataAction());
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const onDelete = (item) => {
    reduxDispatch(DeleteDataAction(item.userId));
  };

  return (
    <View style={styles.container}>
      <SearchTextInput
        value={searchText}
        onChangeText={(val) => {
          setSearchText(val);
          if (val == "") {
            setSearchText("");
            setSearchData([]);
          } else {
            filterData(val);
          }
        }}
        placeholder={strings.SEARCH_PLACE_HOLDER}
        onSubmitEditing={() => filterData(searchText)}
      />
      {searchText != "" && searchData.length == 0 ? (
        <Text
          style={{
            fontSize: Font.FONT_18,
            color: colors.text,
            marginTop: hp("20%"),
          }}
        >
          {strings.NO_DATA_FOUND}
        </Text>
      ) : (
        <ListDataView
          onPress={(item1, userId) => {
            navigation.navigate("Details", { data: item1, userId: userId });
          }}
          data={searchText != "" ? searchData : data}
          onPressListItem={(userId) => listItem(userId)}
          onRefresh={() => onRefresh}
          refreshing={refreshing}
          onDelete={onDelete}
        />
      )}
    </View>
  );
}
export default DisplayData;
