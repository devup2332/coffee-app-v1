import React from "react";
import { IOrder } from "../store/store";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";

interface OrderCardProps {
  order: IOrder;
}

const windowWidth = Dimensions.get("window").width;
const imageWidth = windowWidth * 0.2;

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    <View>
      <View style={styles.OrderHeader}>
        <View style={styles.HeaderColumnDate}>
          <Text style={styles.HeaderTitle}>Order Date</Text>
          <Text style={styles.HeaderSubtitle}>{order.createdAt}</Text>
        </View>
        <View style={styles.HeaderColumnMount}>
          <Text style={styles.HeaderTitle}>Total Amount</Text>
          <Text style={styles.HeaderTotalPrice}>$ {order.totalPrice}</Text>
        </View>
      </View>

      {order.products.map((product) => {
        let priceItem = 0;
        product.prices.forEach((price) => {
          priceItem += parseFloat(price.price) * price.quantity;
        });
        priceItem = Math.round(priceItem * 100) / 100;
        return (
          <LinearGradient
            key={product.id}
            start={{
              x: 0,
              y: 0,
            }}
            end={{
              x: 1,
              y: 1,
            }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.GradientStyles}
          >
            <View>
              <View style={styles.ProductHeaderContainer}>
                <View style={styles.ProductHeaderLeftContainer}>
                  <Image
                    style={styles.ProductImage}
                    source={product.imagelink_square}
                  />
                  <View>
                    <Text style={styles.ProductNameText}>{product.name}</Text>
                    <Text style={styles.ProductSubtitle}>
                      {product.roasted}
                    </Text>
                  </View>
                </View>
                <View style={styles.ProductPriceContainer}>
                  <Text style={styles.ProductCurrency}>$</Text>
                  <Text style={styles.ProductAmount}>{priceItem}</Text>
                </View>
              </View>
              {product.prices.map((price, index) => {
                return (
                  <View key={index} style={styles.PriceItemContainer}>
                    <View style={styles.PriceItemSizeBox}>
                      <View style={styles.PriceItemSizeRight}>
                        <Text
                          style={[
                            styles.PriceItemSizeText,
                            {
                              fontSize:
                                price.size.length > 1
                                  ? FONTSIZE.size_12
                                  : FONTSIZE.size_20,
                                  paddingHorizontal:
                                    price.size.length > 1 
                                  ? SPACING.space_10
                                  : SPACING.space_20
                            },
                          ]}
                        >
                          {price.size}
                        </Text>
                      </View>
                      <View style={styles.PriceItemSizeLeft}>
                        <Text style={styles.ProductCurrency}>$</Text>
                        <Text style={styles.PriceItemSizeText}>
                          {price.price}
                        </Text>
                      </View>
                    </View>
                    <View style={styles.PriceQuantityContainer}>
                      <Text style={styles.PriceQuantityXSimbol}>X</Text>
                      <Text style={styles.PriceQuantityNumber}>
                        {price.quantity}
                      </Text>
                    </View>
                    <Text style={styles.PriceTotalPerItem}>
                      {Math.round(
                        price.quantity * parseFloat(price.price) * 100,
                      ) / 100}
                    </Text>
                  </View>
                );
              })}
            </View>
          </LinearGradient>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {},
  OrderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderColumnDate: {
    alignItems: "flex-start",
  },
  HeaderColumnMount: {
    alignItems: "flex-end",
  },
  HeaderTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  HeaderSubtitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  HeaderTotalPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  GradientStyles: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: windowWidth * 0.05,
    paddingVertical: windowWidth * 0.04,
    marginTop: SPACING.space_20,
  },
  ProductHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ProductImage: {
    width: imageWidth,
    height: imageWidth,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ProductNameText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  ProductSubtitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_12,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  ProductPriceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_4,
  },
  ProductCurrency: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  ProductAmount: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_bold,
  },
  ProductHeaderLeftContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_28,
  },
  PriceItemContainer: {
    flexDirection: "row",
    marginTop: SPACING.space_16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  PriceItemSizeBox: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: BORDERRADIUS.radius_10,
    flexDirection: "row",
  },
  PriceItemSizeRight: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: SPACING.space_4,

    borderRightWidth: 2,
    borderRightColor: COLORS.primaryGreyHex,
  },
  PriceItemSizeText: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  PriceItemSizeLeft: {
    paddingHorizontal: SPACING.space_24 * 1.2,
    paddingVertical: SPACING.space_4,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_4,
  },
  PriceQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_8,
  },
  PriceQuantityXSimbol: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  PriceQuantityNumber: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  PriceTotalPerItem: {
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default OrderCard;
