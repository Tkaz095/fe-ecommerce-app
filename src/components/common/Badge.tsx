import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

type BadgeVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'primary', style }: BadgeProps) {
  return (
    <View style={[styles.base, styles[`bg_${variant}` as keyof typeof styles] as StyleProp<ViewStyle>, style]}>
      <Text style={[styles.text, styles[`text_${variant}` as keyof typeof styles]]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },

  // Backgrounds
  bg_primary:   { backgroundColor: Colors.primaryLight },
  bg_secondary: { backgroundColor: Colors.secondaryLight },
  bg_success:   { backgroundColor: Colors.successLight },
  bg_danger:    { backgroundColor: Colors.dangerLight },
  bg_warning:   { backgroundColor: Colors.warningLight },

  // Text colors
  text_primary:   { color: Colors.primary },
  text_secondary: { color: Colors.secondary },
  text_success:   { color: Colors.success },
  text_danger:    { color: Colors.danger },
  text_warning:   { color: Colors.warning },
});
