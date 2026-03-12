import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Order, OrderStatus } from '../../types/order.types';
import { orderService } from '../../services/orderService';
import { Loader } from '../../components/common/Loader';
import { Colors, Typography, Spacing, BorderRadius, Shadows } from '../../constants/theme';
import { formatCurrency } from '../../utils/formatCurrency';

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending:    Colors.warning,
  confirmed:  Colors.primary,
  processing: Colors.primary,
  shipped:    Colors.secondary,
  delivered:  Colors.success,
  cancelled:  Colors.danger,
};

export default function OrderHistoryScreen() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    orderService.getAll()
      .then(setOrders)
      .catch(() => {/* TODO: show error toast */})
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader fullScreen message="Loading orders..." />;

  return (
    <View style={styles.container}>
      <FlatList
        data={orders}
        keyExtractor={(o) => o.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={60} color={Colors.textSecondary} />
            <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.orderId}>Order #{item.id}</Text>
              <View style={[styles.statusBadge, { backgroundColor: STATUS_COLOR[item.status] + '20' }]}>
                <Text style={[styles.statusText, { color: STATUS_COLOR[item.status] }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            <Text style={styles.total}>{formatCurrency(item.totalAmount)}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:   { flex: 1, backgroundColor: Colors.background },
  list:        { padding: Spacing.base, paddingBottom: Spacing['4xl'] },
  card:        { backgroundColor: Colors.surface, borderRadius: BorderRadius.xl, padding: Spacing.base, marginBottom: Spacing.sm, ...Shadows.sm },
  cardHeader:  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  orderId:     { fontSize: Typography.fontSize.base, fontWeight: Typography.fontWeight.semibold, color: Colors.textPrimary },
  statusBadge: { paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: BorderRadius.full },
  statusText:  { fontSize: Typography.fontSize.xs, fontWeight: Typography.fontWeight.bold },
  date:        { fontSize: Typography.fontSize.sm, color: Colors.textSecondary, marginBottom: Spacing.xs },
  total:       { fontSize: Typography.fontSize.lg, fontWeight: Typography.fontWeight.bold, color: Colors.primary },
  empty:       { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: Spacing['5xl'], gap: Spacing.md },
  emptyText:   { fontSize: Typography.fontSize.base, color: Colors.textSecondary, textAlign: 'center' },
});
