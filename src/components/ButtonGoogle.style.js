import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  google__WebView: {
    flex: 1,
  },

  google__container: {
    flex: 1,
  },

  google__TouchableOpacity: {
    position: "absolute",
    bottom: hp("10%"),
    width: wp("50%"),
    alignSelf: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: wp("3%"),
    paddingVertical: wp("3%"),
    borderRadius: wp("20%"),
  },

  google__TouchableOpacity_Text: {
    textAlign: "center",
    fontWeight: "600",
  },
});

export default styles;
