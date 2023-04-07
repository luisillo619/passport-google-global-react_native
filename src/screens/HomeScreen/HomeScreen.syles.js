import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  home__header_container: {
    alignItems: "center",
  },

  home__header_TouchableOpacity_rigth: {
    position: "absolute",
    right: wp("5%"),
    top: hp("2%"),
  },
 
});

export default styles;
