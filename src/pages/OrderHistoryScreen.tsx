import {
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { COLORS, SPACING } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import OrderCard from "../components/OrderCard";
import EmptyListAnimation from "../components/EmptyListAnimation";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const windowWidth = Dimensions.get("window").width;

const OrderHistoryScreen = () => {
  const orders = useStore((state) => state.orders);
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={[styles.ScrollViewStyles]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.InnerContainer,
            {
              marginBottom: tabBarHeight,
            },
          ]}
        >
          <HeaderBar title="Order History" />
          {orders.length === 0 ? (
            <EmptyListAnimation title="No orders" />
          ) : (
            <View style={styles.ItemsContainer}>
              {orders.map((order, index) => {
                return (
                  <TouchableOpacity key={index} onPress={() => { }}>
                    <OrderCard order={order} />
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: windowWidth * 0.03,
  },
  ScrollViewStyles: {
    flexGrow: 1,
  },
  InnerContainer: {
    flex: 1,
  },
  ItemsContainer: {
    gap: SPACING.space_20,
  },
});
export default OrderHistoryScreen;
