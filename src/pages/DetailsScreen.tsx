import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from "../theme/theme";
import ImageBackgroundInfo from "../components/ImageBackgroundInfo";
import { useStore } from "../store/store";
import PaymentFooter from "../components/PaymentFooter";
import { SafeAreaView } from "react-native-safe-area-context";

interface DetailsScreenProps {
  navigation: any;
  route: any;
}

const windowWidth = Dimensions.get("window").width;

const DetailsScreen: React.FC<DetailsScreenProps> = ({ navigation, route }) => {
  const [fullDesk, setFullDesk] = useState(false);
  const addToFavoriteList = useStore((state) => state.addToFavoriteList);
  const addToCart = useStore((state) => state.addToCartList);
  const deleteFromFavoriteList = useStore(
    (state) => state.deleteFromFavoriteList,
  );

  // Finded all data from an ID
  const itemFounded = useStore((state) => {
    return route.params.type === "Coffee" ? state.CoffeeList : state.BeanList;
  }).find((item: any) => item.id === route.params.id);
  const [price, setPrice] = useState(itemFounded!.prices[0]);

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
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewContainer}
      >
        <ImageBackgroundInfo
          item={itemFounded}
          EnableBackHandler
          toggleFavourite={favouriteHandler}
          BackHandler={backHandler}
        />

        <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>Description</Text>
          {fullDesk ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesk((prev) => !prev);
              }}
            >
              <Text style={styles.TextDescription}>
                {itemFounded.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesk((prev) => !prev);
              }}
            >
              <Text numberOfLines={3} style={styles.TextDescription}>
                {itemFounded.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>Size</Text>
          <View style={styles.SizeOuterContainer}>
            {itemFounded.prices.map((item) => {
              return (
                <TouchableOpacity
                  key={item.size}
                  onPress={() => {
                    setPrice(item);
                  }}
                  style={[
                    styles.SizeBox,
                    {
                      borderColor:
                        item.size === price?.size
                          ? COLORS.primaryOrangeHex
                          : COLORS.primaryDarkGreyHex,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.SizeText,
                      {
                        fontSize:
                          itemFounded.type === "bean"
                            ? FONTSIZE.size_14
                            : FONTSIZE.size_16,
                        color:
                          item.size === price?.size
                            ? COLORS.primaryOrangeHex
                            : COLORS.primaryLightGreyHex,
                      },
                    ]}
                  >
                    {item.size}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <PaymentFooter
        price={price}
        buttonTitle="Add to Cart"
        customStyles={{
          paddingHorizontal: windowWidth * 0.05,
        }}
        bottomPressHandler={() => {
          const newItem = {
            ...itemFounded,
            prices: [
              {
                size: price.size,
                quantity: 1,
                currency: price.currency,
                price: price.price,
              },
            ],
          };
          addToCart(newItem);
          navigation.navigate("Cart");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewContainer: {
    flex: 1,
  },
  FooterInfoArea: {
    padding: windowWidth * 0.05,
    flex: 1,
    flexShrink: 0,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_10,
  },
  TextDescription: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: "center",
    justifyContent: "center",
    height: SPACING.space_24 * 2,
    borderRadius: SPACING.space_10,
    borderWidth: 2,
  },
  SizeText: {},
});
export default DetailsScreen;
