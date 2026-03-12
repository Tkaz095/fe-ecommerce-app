import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useUserStore } from '../store/useUserStore';
import { RootStackParamList } from '../types/navigation.types';
import AuthNavigator from './AuthNavigator';
import AppTabNavigator from './AppTabNavigator';

const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * RootNavigator — decides between the Auth flow and the main App tabs
 * based on the user's authentication state in the global store.
 */
export default function RootNavigator() {
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen name="App" component={AppTabNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
