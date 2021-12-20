import { StyleSheet } from "react-native";

const commonStyle = (colors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      alignItems: "center",
    },
  });
export { commonStyle };
