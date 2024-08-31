import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useStore } from "../store/store";
import { getCategoriesFromData } from "../utils/getCategoriesfromdata";
import { getCoffeeList } from "../utils/getCoffeeList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomIcon from "../components/CustomIcon";

const HomeScreen = () => {
  const CoffeeList = useStore((state) => state.CoffeeList);
  const BeanList = useStore((state) => state.BeanList);
  const [categories, setCategories] = useState(
    getCategoriesFromData(CoffeeList)
  );
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <HeaderBar title="Home Screen" />
        <Text style={styles.ScreenTitle}>
          Find the best{"\n"}coffee for you
        </Text>

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {}}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Find your Coffee..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputStyles}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_30,
  },
  ScrollViewFlex: {},
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
  TextInputStyles: {
    color: COLORS.primaryWhiteHex,
  },
  InputContainerComponent: {
    flexDirection: "row",
    marginVertical: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_12,
    alignItems: "center",
    gap: SPACING.space_12,
  },
});

export default HomeScreen;
