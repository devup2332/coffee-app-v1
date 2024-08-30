import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IStore {
  CoffeeList: any[];
  BeanList: any[];
  FavoritesList: never[];
  CartList: never[];
  CartPrice: number;
  OrderHistoryList: never[];
}

export const useStore = create<IStore>()(
  persist(
    () => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      FavoritesList: [],
      CartList: [],
      CartPrice: 0,
      OrderHistoryList: [],
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
