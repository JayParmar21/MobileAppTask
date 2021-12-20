import React from "react";
import { View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { heightPercentageToDP as hp } from "../../Utils/LayoutMeasurement";
import { commonStyle } from "../../Theme/CommonStyles";
import Button from "../../Component/Button";
function Home({ navigation }) {
  const { colors } = useTheme();
  const styles = commonStyle(colors);
  return (
    <View style={styles.container}>
      <Button
        title="Show List Data"
        onPress={() => navigation.navigate("Display Data")}
        customStyle={{ marginTop: hp("5%") }}
      />
      <Button
        title="Add Data In List"
        onPress={() => navigation.navigate("Add Data")}
      />
      <Button
        title="Edit Data from List"
        onPress={() => navigation.navigate("Edit Data", { edit: true })}
      />
    </View>
  );
}
export default Home;
