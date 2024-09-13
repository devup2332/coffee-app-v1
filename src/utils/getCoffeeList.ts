import { ItemCoffee } from "../store/store";

export const getCoffeeList = (category: string, data: ItemCoffee[]) => {
  if (category === "All") {
    return data;
  }
  return data.filter((item) => item.name === category);
};
