import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import GradientBGIcon from "./GradientBGIcon";
import ProfilePic from "./ProfilePic";
import { useNavigation } from "@react-navigation/native";

interface HeaderBarProps {
  title?: string;
  backButton?: boolean;
}

const HeaderBar: React.FC<HeaderBarProps> = ({ title, backButton = false }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.HeaderContainer}>
      {backButton ? (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <GradientBGIcon
            name="left"
            color={COLORS.primaryLightGreyHex}
            size={FONTSIZE.size_16}
          />
        </TouchableOpacity>
      ) : (
        <GradientBGIcon
          name="menu"
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
      )}
      {title && <Text style={styles.HeaderTitle}>{title}</Text>}
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    paddingVertical: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  HeaderTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
});

export default HeaderBar;
