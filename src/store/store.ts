import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageProps } from "react-native";
import { produce } from "immer";

interface IStore {
  CoffeeList: ItemCoffee[];
  BeanList: ItemCoffee[];
  FavoritesList: any[];
  CartList: CartItem[];
  CartPrice: number;
  OrderHistoryList: never[];
  addToFavoriteList: Function;
  deleteFromFavoriteList: Function;
  addToCartList: (newItem: CartItem) => void;
}

export interface ItemCoffee {
  id: string;
  name: string;
  type: string;
  description: string;
  ingredients: string;
  roasted: string;
  prices: IPrice[];
  imagelink_portrait: ImageProps;
  ratings_count: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  average_rating: number;
  favourite: boolean;
  index: number;
}

export interface CartItem {
  id: string;
  name: string;
  type: string;
  description: string;
  ingredients: string;
  roasted: string;
  prices: PriceCart[];
  imagelink_portrait: ImageProps;
  ratings_count: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  average_rating: number;
  favourite: boolean;
  index: number;
}

export interface PriceCart {
  size: string;
  price: string;
  currency: string;
  quantity: number;
}

export interface IPrice {
  size: string;
  price: string;
  currency: string;
}

export const useStore = create<IStore>()(
  persist(
    (set) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoritesList: [],
      CartList: [],
      CartPrice: 0,
      OrderHistoryList: [],
      addToFavoriteList: (type: string, id: string) =>
        set(
          produce((state: IStore) => {
            if (type == "Coffee") {
              state.CoffeeList.forEach((item) => {
                if (item.id === id) {
                  if (!item.favourite) {
                    item.favourite = true;
                    state.FavoritesList.unshift(item);
                  } else {
                    item.favourite = false;
                  }
                }
              });
            } else if (type == "Bean") {
              state.BeanList.forEach((item) => {
                if (item.id === id) {
                  if (!item.favourite) {
                    item.favourite = true;
                    state.FavoritesList.unshift(item);
                  } else {
                    item.favourite = false;
                  }
                }
              });
            }
          }),
        ),
      deleteFromFavoriteList: (type: string, id: string) =>
        set(
          produce((state: IStore) => {
            if (type == "Coffee") {
              state.CoffeeList.forEach((item) => {
                if (item.id === id) {
                  if (item.favourite) {
                    item.favourite = false;
                  } else {
                    item.favourite = true;
                  }
                }
              });
            } else if (type == "Beans") {
              state.BeanList.forEach((item) => {
                if (item.id === id) {
                  if (item.favourite) {
                    item.favourite = false;
                  } else {
                    item.favourite = true;
                  }
                }
              });
            }
            let spliceIndex = -1;
            state.FavoritesList.forEach((item, index) => {
              if (item.id === id) {
                spliceIndex = index;
              }
            });
            state.FavoritesList.splice(spliceIndex, 1);
          }),
        ),
      addToCartList: (newItem: CartItem) =>
        set(
          produce((state: IStore) => {
            const currentCart = state.CartList;

            const c = currentCart.find((item) => item.id === newItem.id);

            if (c) {
              const priceFounded = c.prices.find(
                (p) => p.size === newItem.prices[0].size,
              );
              if (priceFounded) {
                priceFounded.quantity += 1;
              } else {
                c.prices.push(newItem.prices[0]);
              }
            } else {
              currentCart.push(newItem);
            }

            const n = parseFloat(newItem.prices[0].price);

            state.CartPrice = Math.round((state.CartPrice + n) * 100) / 100;
          }),
        ),
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
