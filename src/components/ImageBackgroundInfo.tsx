import {
  View,
  Text,
  ImageProps,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ItemCoffee } from "../store/store";
import GradientBGIcon from "./GradientBGIcon";
import { COLORS, FONTSIZE, SPACING } from "../theme/theme";

interface ImageBackgroundInfoProps {
  item: ItemCoffee;
  EnableBackHandler: boolean;
  ToggleFavourite: Function;
  BackHandler: Function;
}

const ImageBackgroundInfo: React.FC<ImageBackgroundInfoProps> = ({
  item,
  EnableBackHandler,
  ToggleFavourite,
  BackHandler,
}) => {
  const { favourite, imagelink_portrait, type, id } = item;
  return (
    <View>
      <ImageBackground
        style={styles.ItemBackgroundImage}
        source={imagelink_portrait}
      >
        {EnableBackHandler ? (
          <View style={styles.ImageHeaderBarContainerWithBack}>
            <TouchableOpacity onPress={() => BackHandler()}>
              <GradientBGIcon
                name="left"
                color={COLORS.primaryLightGreyHex}
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ToggleFavourite(favourite, type, id)}
            >
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.ImageHeaderBarContainerWithoutBack}>
            <TouchableOpacity>
              <GradientBGIcon
                name="like"
                color={
                  favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
                }
                size={FONTSIZE.size_16}
              />
            </TouchableOpacity>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  ItemBackgroundImage: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ImageHeaderBarContainerWithoutBack: {
    padding: SPACING.space_30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});

export default ImageBackgroundInfo;
