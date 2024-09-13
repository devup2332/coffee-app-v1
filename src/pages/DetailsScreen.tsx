import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import { useStore } from "../store/store";

interface DetailsScreenProps {
  navigation: any;
  route: any;
}

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList
  );
  const itemFounded = useStore((state) => {
    return route.params.type === "Coffee" ? state.CoffeeList : state.BeanList;
  }).find((item: any) => item.id === route.params.id);

  if (!itemFounded) {
    return (
      <View>
        <Text>Item not found</Text>
      </View>
    );
  }

  const backHandler = () => {
    navigation.pop();
  };

  const favouriteHandler = (favourite: boolean, type: string, id: string) => {
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    console.log({
      favourite,
      type,
      id,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewContainer}
      >
        <ImageBackgroundInfo
          item={itemFounded}
          EnableBackHandler
          ToggleFavourite={favouriteHandler}
          BackHandler={backHandler}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewContainer: {
    flex: 1,
  },
});
export default DetailsScreen;
