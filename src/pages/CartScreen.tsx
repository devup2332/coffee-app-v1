import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>CartScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
    color: COLORS.primaryWhiteHex,
  },
});

export default CartScreen;
