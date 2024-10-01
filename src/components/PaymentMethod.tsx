import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Image, ImageProps, StyleSheet, Text, View } from "react-native";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import CustomIcon from "./CustomIcon";
import { useStore } from "../store/store";

interface PaymentMethodProps {
  method: {
    name: string;
    icon: ImageProps;
    isIcon: boolean;
  };
  currentPayment: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({
  method,
  currentPayment,
}) => {
  const price = useStore((state) => state.CartPrice);
  return (
    <View
      style={[
        styles.PaymentCardContainer,
        {
          borderColor:
            currentPayment === method.name
              ? COLORS.primaryOrangeHex
              : COLORS.primaryGreyHex,
        },
      ]}
    >
      {method.isIcon ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientStyles}
        >
          <View style={styles.WalletRow}>
            <CustomIcon
              name="wallet"
              color={COLORS.primaryOrangeHex}
              size={FONTSIZE.size_30}
            />
            <Text style={styles.PaymentTitle}>{method.name}</Text>
          </View>
          <Text style={styles.PaymentPrice}>$ {price}</Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
          style={styles.LinearGradientRegularStyles}
        >
          <Image source={method.icon} style={styles.ImageStyles} />
          <Text style={styles.PaymentTitle}>{method.name}</Text>
        </LinearGradient>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  PaymentCardContainer: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    backgroundColor: COLORS.primaryGreyHex,
    borderWidth: 3,
  },
  LinearGradientStyles: {
    borderRadius: BORDERRADIUS.radius_15 * 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
  },
  LinearGradientRegularStyles: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.space_12,
    paddingHorizontal: SPACING.space_24,
    gap: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_15 * 2,
  },
  PaymentTitle: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
  },
  WalletRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.space_24,
  },
  ImageStyles: {
    width: SPACING.space_30,
    height: SPACING.space_30,
  },
  PaymentPrice: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
  },
});

export default PaymentMethod;
