import React, { useState } from "react";
import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { useStore } from "../store/store";
import { getCategoriesFromData } from "../utils/getCategoriesfromdata";
import { getCoffeeList } from "../utils/getCoffeeList";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import HeaderBar from "../components/HeaderBar";

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
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <HeaderBar title="Home Screen" />
        <Text style={styles.ScreenTitle}>
          Find the best{"\n"}coffee for you
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: SPACING.space_30
  },
  ScrollViewFlex: {},
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default HomeScreen;
