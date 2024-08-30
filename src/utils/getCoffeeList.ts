export const getCoffeeList = (category: string, data: any[]) => {
  if (category === "All") {
    return data;
  }
  return data.filter((item) => item.name === category);
};
