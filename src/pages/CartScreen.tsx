import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { COLORS, SPACING } from "../theme/theme";
import { useStore } from "../store/store";
import HeaderBar from "../components/HeaderBar";
import { StatusBar } from "expo-status-bar";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import EmptyListAnimation from "../components/EmptyListAnimation";
import PaymentFooter from "../components/PaymentFooter";
import { SafeAreaView } from "react-native-safe-area-context";
import CartItemCard from "../components/CartItemCard";

interface CartScreenProps {
  navigation: any;
}

const windowWidth = Dimensions.get("window").width;

const CartScreen: React.FC<CartScreenProps> = ({ navigation }) => {
  const cartList = useStore((state) => state.CartList);
  const cartPrice = useStore((state) => state.CartPrice);

  // Increase and decrease quantity of items in cart from store
  const increaseQuantity = useStore((state) => state.increaseQuantity);
  const decreaseQuantity = useStore((state) => state.decreaseQuantity);
  const calculatePrice = useStore((state) => state.calculatePrice);
  const tabBarHeight = useBottomTabBarHeight();

  const bottomPressHandler = () => {
    navigation.navigate("Payments");
  };

  const incrementQuantityHandler = (id: string, size: string) => {
    increaseQuantity(id, size);
    calculatePrice();
  };
  const decrementQuantityHandler = (id: string, size: string) => {
    decreaseQuantity(id, size);
    calculatePrice();
  };

  return (
    <SafeAreaView style={styles.container}>
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
              <View style={styles.ListItemsContainer}>
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
                {cartList.map((item) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("Details", {
                          type: item.type,
                          id: item.id,
                          index: item.index,
                        });
                      }}
                      key={item.id}
                    >
                      <CartItemCard
                        item={item}
                        decrementQuantityHandler={decrementQuantityHandler}
                        incrementQuantityHandler={incrementQuantityHandler}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: windowWidth * 0.03,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    justifyContent: "space-between",
    flex: 1,
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemsContainer: {
    gap: SPACING.space_20,
  },
});

export default CartScreen;
