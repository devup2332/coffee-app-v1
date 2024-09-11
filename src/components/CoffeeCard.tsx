import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import CustomIcon from "./CustomIcon";
import BGIcon from "./BGIcon";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

export interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  rosted: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  prices: IPrice[];
  buttonPressHandler: () => void;
}
export interface IPrice {
  size: "S" | "M" | "L";
  price: string;
  currency: string;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({
  imagelink_square,
  average_rating,
  name,
  special_ingredient,
  prices,
}) => {
  const mediumPrice = prices.find((price) => price.size === "M");
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
      style={styles.CardLinearGradientContainer}
    >
      <ImageBackground
        resizeMode="cover"
        style={styles.CardImageBG}
        source={imagelink_square}
      >
        <View style={styles.CardRatingContainer}>
          <CustomIcon
            name="star"
            color={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_18}
          />
          <Text style={styles.CardRatingText}>{average_rating}</Text>
        </View>
      </ImageBackground>
      <Text style={styles.CardTitle}>{name}</Text>
      <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
      <View style={styles.CardFooterRow}>
        <Text style={styles.CardPriceCurrency}>
          {mediumPrice?.currency} <Text>{mediumPrice?.price}</Text>
        </Text>
        <TouchableOpacity>
          <BGIcon
            color={COLORS.primaryWhiteHex}
            name="add"
            BGColor={COLORS.primaryOrangeHex}
            size={FONTSIZE.size_10}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  CardImageBG: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: "hidden",
  },
  CardLinearGradientContainer: {
    marginRight: SPACING.space_15,
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
  },
  CardRatingContainer: {
    flexDirection: "row",
    backgroundColor: COLORS.primaryBlackRGBA,
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: "absolute",
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  CardFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: SPACING.space_15,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_16,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_10,
  },
  CardPrice: {},
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryOrangeHex,
    fontSize: FONTSIZE.size_18,
  },
});
export default CoffeeCard;
