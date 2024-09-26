import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import { useStore } from "../store/store";
import HeaderBar from "../components/HeaderBar";
import { StatusBar } from "expo-status-bar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";

interface CartScreenProps {
  navigation: any;
}

const CartScreen = ({ navigation }: CartScreenProps) => {
  const cartList = useStore((state) => state.CartList);
  const cartPrice = useStore((state) => state.CartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const bottomPressHandler = () => {
    navigation.navigate("Payments");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Cart" />
            {cartList.length === 0 ? (
              <EmptyListAnimation title="Cart is empty" />
            ) : (
              <View></View>
            )}
          </View>
          {cartList.length !== 0 && (
            <PaymentFooter
              bottomPressHandler={() => {
                bottomPressHandler();
              }}
              buttonTitle="Pay"
              price={{
                price: cartPrice.toString(),
                currency: "$",
              }}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.space_30,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flex: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
  },
  ItemContainer: {
    flex: 1,
  },
});

export default CartScreen;
