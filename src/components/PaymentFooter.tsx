import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IPrice } from "../store/store";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";

interface PaymentFooterProps {
  price?: {
    price: string;
    currency: string;
  };
  buttonTitle: string;
  bottomPressHandler: () => void;
  customStyles?: object;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonTitle,
  bottomPressHandler,
  customStyles,
}) => {
  return (
    <View style={[styles.PriceFooter, customStyles]}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>Price</Text>
        <Text style={styles.PriceText}>
          {price?.currency} <Text style={styles.Price}>{price?.price}</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={() => {
          bottomPressHandler();
        }}
      >
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
  },
  PriceContainer: {
    alignItems: "center",
    width: 100,
  },
  PriceTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryOrangeHex,
  },
  Price: {
    color: COLORS.primaryWhiteHex,
  },

  PayButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_36 * 2,
    borderRadius: SPACING.space_24,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
});
export default PaymentFooter;
