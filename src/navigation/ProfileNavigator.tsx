import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../types/navigation.types';
import { Colors, Typography } from '../constants/theme';
import ProfileScreen from '../screens/profile/ProfileScreen';
import OrderHistoryScreen from '../screens/profile/OrderHistoryScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: Colors.primary,
        headerTitleStyle: { fontWeight: Typography.fontWeight.bold },
        headerBackTitle: '',
      }}
    >
      <Stack.Screen name="Profile"      component={ProfileScreen}      options={{ title: 'My Profile' }} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ title: 'Order History' }} />
      <Stack.Screen name="Settings"     component={SettingsScreen}     options={{ title: 'Settings' }} />
    </Stack.Navigator>
  );
}
