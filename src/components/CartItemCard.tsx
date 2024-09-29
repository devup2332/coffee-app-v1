import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CartItem } from "../store/store";
import React from "react";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from "./CustomIcon";

interface CartItemProps {
  item: CartItem;
  incrementQuantityHandler: (id: string, size: string) => void;
  decrementQuantityHandler: (id: string, size: string) => void;
}

const windowWidth = Dimensions.get("window").width;

const CartItemCard: React.FC<CartItemProps> = ({
  item,
  decrementQuantityHandler,
  incrementQuantityHandler,
}) => {
  const {
    id,
    prices,
    imagelink_square,
    name,
    special_ingredient,
    roasted,
    type,
  } = item;
  return (
    <View>
      {prices.length !== 1 ? (
        <LinearGradient
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CardGradientStyles}
        >
          <View style={styles.CardImageContainer}>
            <Image source={imagelink_square} style={styles.CardImageStyles} />
            <View style={styles.CardItemInfo}>
              <View>
                <Text style={styles.CardItemTitle}>{name}</Text>
                <Text style={styles.CardItemSubTitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View style={styles.CardRoastedContainer}>
                <Text style={styles.CardRoastedText}>{roasted}</Text>
              </View>
            </View>
          </View>
          {prices.map((price, index) => {
            return (
              <View key={index} style={styles.CardItemSizeRowContainer}>
                <View style={styles.CardItemSizeRowValue}>
                  <View style={styles.SizedBox}>
                    <Text
                      style={[
                        styles.SizeText,
                        {
                          fontSize:
                            type === "Bean"
                              ? FONTSIZE.size_12
                              : FONTSIZE.size_16,
                        },
                      ]}
                    >
                      {price.size}
                    </Text>
                  </View>
                  <Text style={styles.SizeCurrency}>
                    {price.currency}
                    <Text style={styles.SizePrice}> {price.price}</Text>
                  </Text>
                </View>
                <View style={styles.CardItemSizeValueContainer}>
                  <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={() => decrementQuantityHandler(id, price.size)}
                  >
                    <CustomIcon
                      name="minus"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                  <View style={styles.CartItemQuantityContainer}>
                    <Text style={styles.CartItemQuantityText}>
                      {price.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.CartItemIcon}
                    onPress={() => incrementQuantityHandler(id, price.size)}
                  >
                    <CustomIcon
                      name="add"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 1,
            y: 1,
          }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.CardGradientStyles}
        >
          <View style={styles.CardImageContainer}>
            <Image
              source={imagelink_square}
              style={styles.CardSingleItemImageStyles}
            />
            <View style={styles.CardItemInfo}>
              <View>
                <Text style={styles.CardItemTitle}>{name}</Text>
                <Text style={styles.CardItemSubTitle}>
                  {special_ingredient}
                </Text>
              </View>
              <View
                style={[
                  styles.CardSingleItemSizeContainer,
                  { marginBottom: SPACING.space_8 },
                ]}
              >
                <View style={styles.CardSingleItemSize}>
                  <Text style={styles.CardSingleItemSizeText}>
                    {prices[0].size}
                  </Text>
                </View>
                <Text style={styles.SizeCurrency}>
                  {prices[0].currency}
                  <Text style={styles.SizePrice}> {prices[0].price}</Text>
                </Text>
              </View>
              <View style={styles.CardItemSizeValueContainer}>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => decrementQuantityHandler(id, prices[0].size)}
                >
                  <CustomIcon
                    name="minus"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
                <View style={styles.CartItemQuantityContainer}>
                  <Text style={styles.CartItemQuantityText}>
                    {prices[0].quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.CartItemIcon}
                  onPress={() => incrementQuantityHandler(id, prices[0].size)}
                >
                  <CustomIcon
                    name="add"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  CardImageStyles: {
    height: 130,
    width: 130,
    borderRadius: BORDERRADIUS.radius_20,
  },
  CardGradientStyles: {
    flex: 1,
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardImageContainer: {
    flexDirection: "row",
    gap: SPACING.space_12,
    flex: 1,
  },
  CardItemInfo: {
    flex: 1,
    paddingVertical: SPACING.space_4,
    justifyContent: "space-between",
  },
  CardItemTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CardItemSubTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CardRoastedContainer: {
    height: 50,
    width: 50 * 2 + SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryDarkGreyHex,
  },
  CardRoastedText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.primaryWhiteHex,
  },
  CardItemSizeRowContainer: {
    flex: 1,
    alignItems: "center",
    gap: SPACING.space_20,
    flexDirection: "row",
    justifyContent: "center",
  },
  CardItemSizeRowValue: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SizedBox: {
    height: 40,
    width: 100,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryBlackHex,
    justifyContent: "center",
    alignItems: "center",
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  SizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryOrangeHex,
  },
  SizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  CardItemSizeValueContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: SPACING.space_12,
  },
  CartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  CartItemQuantityContainer: {
    backgroundColor: COLORS.primaryBlackHex,
    width: 80,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: "center",
    paddingVertical: SPACING.space_4,
  },
  CartItemQuantityText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  CardSingleItemSize: {
    height: 50,
    width: 50 * 2,
    borderRadius: BORDERRADIUS.radius_15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  CardSingleItemSizeText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  CardSingleItemSizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: windowWidth * 0.02,
    justifyContent: "center",
  },
  CardSingleItemImageStyles: {
    height: 150,
    width: 150,
    borderRadius: BORDERRADIUS.radius_20,
  },
});

export default CartItemCard;
