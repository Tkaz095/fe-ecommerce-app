import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../../types/navigation.types';
import { Ionicons } from '@expo/vector-icons';
import { useUserStore } from '../../store/useUserStore';
import { useAuth } from '../../hooks/useAuth';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

type Props = NativeStackScreenProps<ProfileStackParamList, 'Profile'>;

const MENU_ITEMS = [
  { icon: 'receipt-outline',   label: 'Order History', screen: 'OrderHistory' },
  { icon: 'settings-outline',  label: 'Settings',      screen: 'Settings' },
] as const;

export default function ProfileScreen({ navigation }: Props) {
  const user = useUserStore((s) => s.user);
  const { signOut } = useAuth();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Avatar & Name */}
      <View style={styles.header}>
        <Image
          source={{ uri: user?.avatar ?? `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name ?? 'User')}&background=4F46E5&color=fff` }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name ?? 'Guest'}</Text>
        <Text style={styles.email}>{user?.email ?? ''}</Text>
      </View>

      {/* Menu */}
      <View style={styles.card}>
        {MENU_ITEMS.map((item, i) => (
          <TouchableOpacity
            key={item.screen}
            style={[styles.row, i < MENU_ITEMS.length - 1 && styles.rowBorder]}
            onPress={() => navigation.navigate(item.screen)}
            activeOpacity={0.7}
          >
            <Ionicons name={item.icon} size={22} color={Colors.primary} style={styles.rowIcon} />
            <Text style={styles.rowLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={Colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign out */}
      <TouchableOpacity style={styles.signOutBtn} onPress={signOut}>
        <Ionicons name="log-out-outline" size={20} color={Colors.danger} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: Colors.background },
  content:     { padding: Spacing.base, paddingBottom: Spacing['4xl'] },
  header:      { alignItems: 'center', paddingVertical: Spacing['2xl'] },
  avatar:      { width: 90, height: 90, borderRadius: 45, backgroundColor: Colors.surfaceAlt, marginBottom: Spacing.sm },
  name:        { fontSize: Typography.fontSize['2xl'], fontWeight: Typography.fontWeight.bold, color: Colors.textPrimary },
  email:       { fontSize: Typography.fontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  card:        { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, ...Shadows.sm, marginTop: Spacing.sm },
  row:         { flexDirection: 'row', alignItems: 'center', padding: Spacing.base },
  rowBorder:   { borderBottomWidth: 1, borderBottomColor: Colors.divider },
  rowIcon:     { marginRight: Spacing.md },
  rowLabel:    { flex: 1, fontSize: Typography.fontSize.base, color: Colors.textPrimary },
  signOutBtn:  { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: Spacing.xl, padding: Spacing.base, gap: Spacing.sm },
  signOutText: { color: Colors.danger, fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold },
});
