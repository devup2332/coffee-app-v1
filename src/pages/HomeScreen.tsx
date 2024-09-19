import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
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
import CoffeeCard from "../components/CoffeeCard";

interface HomeScreenProps {
  navigation: any;
}

const debounce = (func: (...args: any) => any, timeout: number = 300) => {
  let timer: NodeJS.Timeout | undefined;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(null, args);
    }, timeout);
  };
};
const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const CoffeeList = useStore((state) => state.CoffeeList);
  const BeanList = useStore((state) => state.BeanList);
  const FlatListRef = useRef<FlatList>(null);
  const InputRef = useRef<TextInput>(null);
  const categories = getCategoriesFromData(CoffeeList);
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedCoffee, setSortedCoffee] = useState(
    getCoffeeList(categoryIndex.category, CoffeeList)
  );

  const searchByText = (text: string) => {
    if (!text.length) {
      resetSearch();
      return;
    }
    setCategoryIndex({
      category: categories[0],
      index: 0,
    });
    setSortedCoffee(
      CoffeeList.filter((item) => item.name.toLowerCase().includes(text))
    );
  };

  const resetSearch = () => {
    setSearchText("");
    InputRef.current?.clear();
    setCategoryIndex({
      category: categories[0],
      index: 0,
    });
    setSortedCoffee([...CoffeeList]);
  };

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <SafeAreaView style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        {/* Header  */}
        <HeaderBar title="Home Screen" />
        <Text style={styles.ScreenTitle}>
          Find the best{"\n"}coffee for you
        </Text>

        {/* Input  */}
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
            ref={InputRef}
            placeholder="Find your Coffee..."
            onChangeText={debounce((text: string) => {
              setSearchText(text);
              searchByText(text);
            }, 500)}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputStyles}
          />
          {searchText.length > 0 && (
            <TouchableOpacity>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_18}
                color={
                  searchText.length > 0
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryLightGreyHex
                }
                onPress={resetSearch}
              />
            </TouchableOpacity>
          )}
        </View>
        {/* Categories scroll  */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoriesScrollViewStyles}
        >
          {categories.map((category, index) => {
            return (
              <View key={index.toString()} style={styles.CategorieItemStyles}>
                <TouchableOpacity
                  style={styles.TouchableCategorie}
                  onPress={() => {
                    FlatListRef.current?.scrollToOffset({
                      animated: true,
                      offset: 0,
                    });
                    setCategoryIndex({
                      index,
                      category: categories[index],
                    });
                    setSortedCoffee([...getCoffeeList(category, CoffeeList)]);
                  }}
                >
                  <Text
                    style={[
                      styles.CategorieText,
                      categoryIndex.index === index
                        ? {
                            color: COLORS.primaryOrangeHex,
                          }
                        : {},
                    ]}
                  >
                    {category}
                  </Text>
                  {categoryIndex.index === index ? (
                    <View style={styles.CategorieActive}></View>
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        {/* Coffee List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={FlatListRef}
          data={sortedCoffee}
          ListEmptyComponent={
            <View style={styles.EmptyContainer}>
              <Text style={styles.EmptyText}>No coffee available</Text>
            </View>
          }
          contentContainerStyle={[styles.ListContainerStyles]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details", {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}
              >
                <CoffeeCard item={item} />
              </TouchableOpacity>
            );
          }}
        />
        <Text style={styles.CoffeeBeansListTitle}>Coffee Beans</Text>
        {/* Beans List */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[
            styles.ListContainerStyles,
            {
              marginBottom: tabBarHeight,
            },
          ]}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.push("Details", {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                  });
                }}
              >
                <CoffeeCard item={item} />
              </TouchableOpacity>
            );
          }}
        />
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
    flex: 1,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    height: SPACING.space_20 * 3,
  },
  InputContainerComponent: {
    flexDirection: "row",
    marginVertical: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
    paddingHorizontal: SPACING.space_20,
    alignItems: "center",
    gap: SPACING.space_12,
  },
  CategoriesScrollViewStyles: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategorieActive: {
    width: SPACING.space_10,
    height: SPACING.space_10,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    marginTop: SPACING.space_10,
  },
  CategorieText: {
    color: COLORS.primaryLightGreyHex,
  },
  CategorieItemStyles: {
    paddingHorizontal: SPACING.space_20,
  },
  TouchableCategorie: {
    alignItems: "center",
  },
  CoffeeBeansListTitle: {
    fontSize: FONTSIZE.size_18,
    marginTop: SPACING.space_20,
    marginBottom: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  ListContainerStyles: {
    gap: SPACING.space_20,
  },
  EmptyContainer: {
    width: Dimensions.get("window").width - SPACING.space_30 * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  EmptyText: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    paddingVertical: SPACING.space_36,
    textAlign: "center",
  },
});

export default HomeScreen;
