import { View, Text, StyleSheet } from "react-native";
import React from "react";

const PaymentScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Payment Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default PaymentScreen;
