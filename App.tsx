import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailsScreen from "./src/pages/DetailsScreen";
import PaymentScreen from "./src/pages/PaymentScreen";
import TabNavigator from "./src/navigators/TabNavigator";
import { useFonts } from "expo-font";

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    IcoMoon: require("./src/assets/fonts/app_icons.ttf"),
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Light": require("./src/assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
  });

  console.log({ fontsLoaded });
  if (!fontsLoaded) return;
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        />
        <Stack.Screen
          name="Payments"
          component={PaymentScreen}
          options={{
            animation: "slide_from_bottom",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
