import { View, Text, Dimensions, ImageBackground } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../theme/theme";

const CARD_WIDTH = Dimensions.get("window").width * 0.32;

export interface CoffeeCardProps {
  id: string;
  index: number;
  type: string;
  rosted: string;
  imagelink_square: string;
  name: string;
  special_ingridients: string;
  averge_rating: number;
  price: any;
  buttonPressHandler: () => void;
}

const CoffeeCard: React.FC<CoffeeCardProps> = ({ imagelink_square }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
    >
      <ImageBackground source={imagelink_square} />
    </LinearGradient>
  );
};

export default CoffeeCard;
