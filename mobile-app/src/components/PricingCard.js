// mobile-app/src/components/PricingCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';

export default function PricingCard({ prizePool, entryFee, totalCapacity, bookedSpots, remainingSpots }) {
  const progressRatio = Math.min(1, bookedSpots / (totalCapacity || 1));

  return (
    <View style={styles.card}>
      {/* Prize Pool */}
      <View style={styles.column}>
        <Text style={styles.label}>Prize Pool</Text>
        <Text style={styles.amount}>₹ {prizePool?.toLocaleString('en-IN')}</Text>
      </View>

      <View style={styles.divider} />

      {/* Entry Fee */}
      <View style={styles.column}>
        <Text style={styles.label}>Entry Fee</Text>
        <Text style={styles.amount}>₹ {entryFee}</Text>
      </View>

      <View style={styles.divider} />

      {/* Spot Counter with dynamic progress */}
      <View style={[styles.column, { flex: 1.4 }]}>
        <View style={styles.spotsHeader}>
          <AlertCircle size={12} color="#D97706" />
          <Text style={styles.spotsWarning}>
            {remainingSpots > 0 ? `Only ${remainingSpots} spots left` : 'Fully Booked'}
          </Text>
        </View>

        {/* Custom Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
        </View>

        <Text style={styles.bookedRatio}>{bookedSpots}/{totalCapacity} Booked</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8FAFC',
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0'
  },
  column: { flex: 1 },
  divider: { width: 1, height: '75%', backgroundColor: '#E2E8F0', marginHorizontal: 10 },
  label: { fontSize: 11, color: '#64748B', fontWeight: '500', marginBottom: 2 },
  amount: { fontSize: 18, fontWeight: '800', color: '#0F172A' },
  spotsHeader: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  spotsWarning: { fontSize: 11, fontWeight: '700', color: '#D97706' },
  progressBarBackground: { height: 5, backgroundColor: '#E2E8F0', borderRadius: 3, overflow: 'hidden', marginVertical: 3 },
  progressBarFill: { height: '100%', backgroundColor: '#0D9488', borderRadius: 3 },
  bookedRatio: { fontSize: 10, color: '#64748B', fontWeight: '500' }
});