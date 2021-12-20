import { Platform } from "react-native";
import { RFValue } from "../Utils/FontsSize";

export const Font = {
  IS_IOS: Platform.OS == "ios",

  FONT_10: RFValue(10),
  FONT_12: RFValue(12),
  FONT_14: RFValue(14),
  FONT_16: RFValue(16),
  FONT_18: RFValue(18),
  FONT_20: RFValue(20),
  FONT_22: RFValue(22),
  FONT_25: RFValue(25),
};
