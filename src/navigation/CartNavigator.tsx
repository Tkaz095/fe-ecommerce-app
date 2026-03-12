import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartStackParamList } from '../types/navigation.types';
import { Colors, Typography } from '../constants/theme';
import CartScreen from '../screens/main/CartScreen';
import CheckoutScreen from '../screens/checkout/CheckoutScreen';
import OrderSummaryScreen from '../screens/checkout/OrderSummaryScreen';
import PaymentScreen from '../screens/checkout/PaymentScreen';

const Stack = createNativeStackNavigator<CartStackParamList>();

export default function CartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: Typography.fontWeight.bold },
        headerBackTitle: '',
      }}
    >
      <Stack.Screen name="Cart"         component={CartScreen}         options={{ title: 'My Cart' }} />
      <Stack.Screen name="Checkout"     component={CheckoutScreen}     options={{ title: 'Checkout' }} />
      <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Order Summary' }} />
      <Stack.Screen name="Payment"      component={PaymentScreen}      options={{ title: 'Payment' }} />
    </Stack.Navigator>
  );
}
