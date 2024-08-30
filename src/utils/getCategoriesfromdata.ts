export const getCategoriesFromData = (data: any[]) => {
  const temp: { [key: string]: number } = {};
  data.forEach((item) => {
    if (temp[item.name]) {
      ++temp[item.name];
    } else {
      temp[item.name] = 1;
    }
  });
  const categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
};
