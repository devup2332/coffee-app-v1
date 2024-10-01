import { Dimensions, StyleSheet, Text, View } from "react-native";
import { ItemCoffee } from "../store/store";
import React from "react";
import ImageBackgroundInfo from "./ImageBackgroundInfo";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import { LinearGradient } from "expo-linear-gradient";

interface FavoritesCardProps {
  item: ItemCoffee;
  toggleFavorite: (favorite: boolean, type: string, id: string) => void;
}

const windowWidth = Dimensions.get("window").width;

const FavoritesCard: React.FC<FavoritesCardProps> = ({
  item,
  toggleFavorite,
}) => {
  return (
    <View style={styles.FavoriteCardContainer}>
      <ImageBackgroundInfo
        item={item}
        toggleFavourite={toggleFavorite}
        EnableBackHandler={false}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        style={styles.ContainerLinearGradient}
      >
        <Text style={styles.CardTitle}>Description</Text>
        <Text style={styles.CardDescription}>{item.description}</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  FavoriteCardContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: "hidden",
  },
  ContainerLinearGradient: {
    gap: SPACING.space_10,
    padding: windowWidth * 0.05,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.secondaryLightGreyHex,
    fontSize: FONTSIZE.size_16,
  },
  CardDescription: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
});

export default FavoritesCard;
