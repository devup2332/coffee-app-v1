import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import React from "react";
import { COLORS } from "../theme/theme";

interface PopUpAnimationProps {
  style: object;
  source: any;
}

const PopUpAnimation: React.FC<PopUpAnimationProps> = ({ style, source }) => {
  return (
    <View style={styles.container}>
      <LottieView style={style} source={source} autoPlay loop={false} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: COLORS.secondaryBlackRGBA,
    justifyContent: "center",
  },
});
export default PopUpAnimation;
