import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from "../theme/theme";
import HeaderBar from "../components/HeaderBar";
import { SafeAreaView } from "react-native-safe-area-context";
import GooglePayIcon from "../assets/app_images/gpay.png";
import ApplePayIcon from "../assets/app_images/applepay.png";
import AmazonPay from "../assets/app_images/amazonpay.png";
import { StatusBar } from "expo-status-bar";
import PaymentMethod from "../components/PaymentMethod";
import PaymentFooter from "../components/PaymentFooter";
import { useStore } from "../store/store";
import { LinearGradient } from "expo-linear-gradient";
import CustomIcon from "../components/CustomIcon";
import PopUpAnimation from "../components/PopUpAnimation";

interface PaymentScreenProps {
  navigation: any;
}

const windowWidth = Dimensions.get("window").width;

const paymentMethods = [
  {
    name: "Wallet",
    icon: "icon",
    isIcon: true,
  },
  {
    name: "Google Pay",
    icon: GooglePayIcon,
    isIcon: false,
  },
  {
    name: "Apple Pay",
    icon: ApplePayIcon,
    isIcon: false,
  },
  {
    name: "Amazon Pay",
    icon: AmazonPay,
    isIcon: false,
  },
];

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const [paymentMode, setPaymentMode] = useState("Wallet");
  const [loading, setLoading] = useState(false);
  const price = useStore((state) => state.CartPrice);
  const generateOrder = useStore((state) => state.generateOrder);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      console.log("Payment Successful");
      generateOrder();
      setLoading(false);
      navigation.navigate("History");
    }, 2000);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={COLORS.primaryBlackHex} />
      {loading ? (
        <PopUpAnimation
          source={require("../lottie/successful.json")}
          style={styles.PopUpAnimation}
        />
      ) : (
        <></>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.ScrollViewStyles}
      >
        <HeaderBar title="Payment" backButton />
        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity>
            <View
              style={[
                styles.CreditCardContainer,
                {
                  borderColor:
                    paymentMode === "Wallet"
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryGreyHex,
                },
              ]}
            >
              <Text style={styles.CardCreditTitle}>Credit Card</Text>
              <View>
                <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LinearGradientStyles}
                >
                  <View style={styles.CreditCardHeader}>
                    <CustomIcon
                      name="chip"
                      color={COLORS.primaryOrangeHex}
                      size={FONTSIZE.size_20 * 2}
                    />
                    <CustomIcon
                      name="visa"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_30 * 2}
                    />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                    <Text style={styles.CreditCardNumber}>3879</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View>
                      <Text style={styles.CreditCardSubtitle}>
                        Card Holder Name
                      </Text>
                      <Text style={styles.CreditCardName}>Robert Evans</Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardSubtitle}>Expire Date</Text>
                      <Text style={styles.CreditCardName}>02/30</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {paymentMethods.map((method, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setPaymentMode(method.name);
                }}
              >
                <PaymentMethod method={method} currentPayment={paymentMode} />
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
      <PaymentFooter
        buttonTitle={`Pay with ${paymentMode}`}
        price={{
          price: price.toString(),
          currency: "$",
        }}
        bottomPressHandler={() => {
          handlePayment();
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: windowWidth * 0.03,
  },
  ScrollViewStyles: {
    flex: 1,
  },
  PaymentOptionsContainer: {
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15,
    borderWidth: 3,
  },
  CardCreditTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  LinearGradientStyles: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardNumberContainer: {
    flexDirection: "row",
    gap: SPACING.space_16,
    alignItems: "center",
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  CreditCardName: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardSubtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  CreditCardDateContainer: {
    alignItems: "flex-end",
  },
  PopUpAnimation: {
    flex: 1,
  },
  CreditCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
export default PaymentScreen;
