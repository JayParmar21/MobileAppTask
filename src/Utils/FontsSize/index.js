import { Platform, StatusBar, Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");
const standardLength = width > height ? width : height;
const offset =
  width > height ? 0 : Platform.OS === "ios" ? 78 : StatusBar.currentHeight;

export function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
  if (isIphoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIphoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0,
  });
}

export function getBottomSpace() {
  return isIphoneX() ? 34 : 0;
}

const deviceHeight =
  isIphoneX() || Platform.OS === "android"
    ? standardLength - offset
    : standardLength;

// The font size is calculated as a percentage of the height(width in landscape mode) of the device.
export function RFPercentage(percent) {
  const heightPercent = (percent * deviceHeight) / 100;
  return Math.round(heightPercent);
}

// guideline height for standard 5" device screen is 680
// The font size is calculated based on standardScreenHeight and passed value
export function RFValue(fontSize, standardScreenHeight = 680) {
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
}
