import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppTabParamList } from '../types/navigation.types';
import { Colors } from '../constants/theme';
import { useCartStore } from '../store/useCartStore';
import ShopNavigator from './ShopNavigator';
import CartNavigator from './CartNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator<AppTabParamList>();

const TAB_ICONS: Record<string, { focused: keyof typeof Ionicons.glyphMap; idle: keyof typeof Ionicons.glyphMap }> = {
  ShopTab:    { focused: 'storefront',      idle: 'storefront-outline' },
  CartTab:    { focused: 'cart',             idle: 'cart-outline' },
  ProfileTab: { focused: 'person',           idle: 'person-outline' },
};

export default function AppTabNavigator() {
  const cartCount = useCartStore((s) =>
    s.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: { borderTopColor: Colors.border },
        tabBarIcon: ({ focused, color, size }) => {
          const icon = TAB_ICONS[route.name];
          return (
            <Ionicons
              name={focused ? icon.focused : icon.idle}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="ShopTab"    component={ShopNavigator}    options={{ title: 'Shop' }} />
      <Tab.Screen
        name="CartTab"
        component={CartNavigator}
        options={{
          title: 'Cart',
          tabBarBadge: cartCount > 0 ? cartCount : undefined,
        }}
      />
      <Tab.Screen name="ProfileTab" component={ProfileNavigator} options={{ title: 'Profile' }} />
    </Tab.Navigator>
  );
}
