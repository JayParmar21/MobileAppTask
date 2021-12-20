import React, { useState } from "react";
import { Image, Switch, TouchableOpacity, View } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import Home from "../Container/Home";
import Details from "../Container/Details";
import { widthPercentageToDP as wp } from "../Utils/LayoutMeasurement";
import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import { icon } from "../Constant";
import DisplayData from "../Container/DisplayData";
import AddData from "../Container/AddData";
const Stack = createStackNavigator();

const Router = () => {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const theme = isEnabled ? DarkTheme : DefaultTheme;
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <AppearanceProvider>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={({ navigation }) => ({
            headerStyle: { backgroundColor: colors.card },
            headerTitleAlign: "left",
            headerTitleStyle: { color: colors.text },
            gestureEnabled: false,
            gestureDirection: "horizontal",
            headerBackTitleVisible: false,
            headerLeft: () => (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => navigation.goBack()}
              >
                <Image
                  source={icon.NEXT}
                  style={{
                    resizeMode: "contain",
                    width: 20,
                    height: 20,
                    transform: [{ rotate: "180 deg" }],
                  }}
                />
              </TouchableOpacity>
            ),
            ...TransitionPresets.SlideFromRightIOS,
          })}
          initialRouteName="Home"
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerLeft: () => null,
              headerRight: () => (
                <View
                  style={{
                    flexDirection: "row",
                    display: "flex",
                    alignItems: "center",
                    marginRight: wp("5%"),
                  }}
                >
                  <Switch onValueChange={toggleSwitch} value={isEnabled} />
                  <Image
                    source={isEnabled ? icon.SUN : icon.MOON}
                    style={{ resizeMode: "contain", width: 22, height: 22 }}
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen name="Add Data" component={AddData} />
          <Stack.Screen name="Edit Data" component={AddData} />
          <Stack.Screen name="Display Data" component={DisplayData} />
          <Stack.Screen
            name="Details"
            component={Details}
            options={({ navigation, route }) => ({
              headerLeft: () => (
                <TouchableOpacity
                  style={{ marginLeft: 10 }}
                  onPress={() => navigation.goBack()}
                >
                  <Image
                    source={icon.NEXT}
                    style={{
                      resizeMode: "contain",
                      width: 20,
                      height: 20,
                      transform: [{ rotate: "180 deg" }],
                    }}
                  />
                </TouchableOpacity>
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppearanceProvider>
  );
};
export default Router;
