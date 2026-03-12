import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';

interface SettingRowProps {
  label: string;
  value?: string;
  toggle?: boolean;
  onPress?: () => void;
}

function SettingRow({ label, value, toggle = false, onPress }: SettingRowProps) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={toggle ? 1 : 0.7}>
      <Text style={styles.rowLabel}>{label}</Text>
      {toggle ? (
        <Switch value={false} onValueChange={() => {/* TODO */}} trackColor={{ true: Colors.primary, false: Colors.border }} />
      ) : (
        <Text style={styles.rowValue}>{value}</Text>
      )}
    </TouchableOpacity>
  );
}

export default function SettingsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.sectionTitle}>Notifications</Text>
      <View style={styles.card}>
        <SettingRow label="Push Notifications"  toggle />
        <SettingRow label="Order Updates"       toggle />
        <SettingRow label="Promotions & Offers" toggle />
      </View>

      <Text style={styles.sectionTitle}>Preferences</Text>
      <View style={styles.card}>
        <SettingRow label="Language"  value="English" />
        <SettingRow label="Currency"  value="USD ($)" />
        <SettingRow label="App Theme" value="System" />
      </View>

      <Text style={styles.sectionTitle}>About</Text>
      <View style={styles.card}>
        <SettingRow label="Version"        value="1.0.0" />
        <SettingRow label="Privacy Policy" value="›" />
        <SettingRow label="Terms of Use"   value="›" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: Colors.background },
  content:      { padding: Spacing.base, paddingBottom: Spacing['4xl'] },
  sectionTitle: { fontSize: Typography.fontSize.sm, fontWeight: Typography.fontWeight.semibold, color: Colors.textSecondary, marginTop: Spacing.base, marginBottom: Spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5 },
  card:         { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, ...Shadows.sm, overflow: 'hidden' },
  row:          { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing.base, borderBottomWidth: 1, borderBottomColor: Colors.divider },
  rowLabel:     { fontSize: Typography.fontSize.base, color: Colors.textPrimary },
  rowValue:     { fontSize: Typography.fontSize.base, color: Colors.textSecondary },
});
