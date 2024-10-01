import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useStore } from "../store/store";
import { COLORS, SPACING } from "../theme/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavoritesCard from "../components/FavoritesCard";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

interface FavoritesScreenProps {
  navigation: any;
}

const windowWidth = Dimensions.get("window").width;

const FavoritesScreen = () => {
  const favoritesList = useStore((state) => state.FavoritesList);
  const tabBarHeight = useBottomTabBarHeight();
  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList,
  );
  console.log({ favoritesList });

  const favoriteHandler = (favorite: boolean, type: string, id: string) => {
    console.log({ favorite, type, id });
    favorite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewContainer}
      >
        <View
          style={[
            styles.ScrollViewInnerContainer,
            { marginBottom: tabBarHeight },
          ]}
        >
          <View style={styles.ItemContainer}>
            <HeaderBar title="Favorites" />
            {favoritesList.length === 0 ? (
              <EmptyListAnimation title="No favorites" />
            ) : (
              <View style={styles.ItemsContainer}>
                {favoritesList.map((item) => {
                  return (
                    <TouchableOpacity key={item.id}>
                      <FavoritesCard
                        item={item}
                        toggleFavorite={favoriteHandler}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: windowWidth * 0.03,
  },
  ScrollViewContainer: {
    flexGrow: 1,
  },
  ScrollViewInnerContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  ItemContainer: {
    flex: 1,
  },
  ItemsContainer: {
    gap: SPACING.space_24
  }
});
export default FavoritesScreen;
