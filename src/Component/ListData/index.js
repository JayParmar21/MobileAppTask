import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { icon, Font } from "../../Constant";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "../../Utils/LayoutMeasurement";
import { useTheme } from "@react-navigation/native";
import { Card } from "react-native-shadow-cards";

function ListDataView(props) {
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const renderItem = ({ item, index }) => {
    return (
      <Card key={index} style={styles.flatListOuterView}>
        <TouchableOpacity
          style={styles.userIdView}
          onPress={() => props.onPressListItem(item.userId)}
        >
          <Text style={styles.text}>{item.userId}</Text>
          <View style={styles.listContentWrap}>
            <TouchableOpacity onPress={() => props.onDelete(item)}>
              <Image source={icon.DELETE} style={styles.arrowImage} />
            </TouchableOpacity>
            <View style={styles.expandView}>
              <Image
                source={icon.NEXT}
                style={[
                  styles.arrowImage,
                  {
                    transform: [
                      { rotate: !item.isExpanded ? "90 deg" : "-90 deg" },
                    ],
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
        {item.isExpanded ? (
          <View>
            {item.data.map((item1, index1) => {
              return (
                <TouchableOpacity
                  onPress={() => props.onPress(item1, item.userId)}
                  key={index1}
                >
                  <View style={styles.expandContent}>
                    <Text style={styles.listWrap}>{"\u2022"}</Text>
                    <Text numberOfLines={1} style={styles.titleText}>
                      {item1.title}
                    </Text>
                  </View>
                  {item.data.length != index1 + 1 ? (
                    <View
                      style={{ borderColor: colors.primary, borderWidth: 0.5 }}
                    />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>
        ) : null}
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            onRefresh={props.onRefresh}
            refreshing={props.refreshing}
            colors={["#9Bd35A", "#689F38"]}
          />
        }
      />
    </View>
  );
}

const makeStyles = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginBottom: wp("2%"),
      marginTop: wp("2%"),
    },
    flatListOuterView: {
      padding: wp("2%"),
      margin: wp("2%"),
      backgroundColor: colors.background,
      borderWidth: 1,
      borderColor: colors.text,
    },
    userIdView: {
      padding: wp("2%"),
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      color: colors.text,
      fontSize: Font.FONT_14,
      alignSelf: "center",
      flex: 3,
    },
    expandView: {
      alignItems: "center",
      justifyContent: "center",
      flex: 0.1,
      paddingLeft: wp("4%"),
    },
    arrowImage: {
      width: wp("5%"),
      height: hp("4%"),
      resizeMode: "contain",
      tintColor: colors.text,
    },
    listWrap: {
      color: colors.text,
    },
    titleText: {
      color: colors.text,
      fontSize: Font.FONT_14,
      flex: 1,
      padding: wp("2%"),
      textTransform: "capitalize",
    },
    expandContent: {
      flexDirection: "row",
      alignItems: "center",
      paddingRight: wp("4%"),
      paddingLeft: wp("2%"),
    },
    listContentWrap: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      flex: 1,
    },
  });

export default ListDataView;
