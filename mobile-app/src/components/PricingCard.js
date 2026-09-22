// mobile-app/src/components/PricingCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AlertCircle } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function PricingCard({ prizePool, entryFee, totalCapacity, bookedSpots, remainingSpots, language = 'ENG' }) {
  const t = translations[language] || translations.ENG;
  const progressRatio = Math.min(1, bookedSpots / (totalCapacity || 1));

  return (
    <View style={styles.card}>
      <View style={styles.column}>
        <Text style={styles.label}>{t.prizePool}</Text>
        <Text style={styles.amount}>₹ {prizePool?.toLocaleString('en-IN')}</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.column}>
        <Text style={styles.label}>{t.entryFee}</Text>
        <Text style={styles.amount}>₹ {entryFee}</Text>
      </View>

      <View style={styles.divider} />

      <View style={[styles.column, { flex: 1.4 }]}>
        <View style={styles.spotsHeader}>
          <AlertCircle size={12} color="#D97706" />
          <Text style={styles.spotsWarning}>
            {remainingSpots > 0 ? t.spotsLeft(remainingSpots) : t.fullyBooked}
          </Text>
        </View>

        <View style={styles.progressBarBackground}>
          <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
        </View>

        <Text style={styles.bookedRatio}>{t.bookedRatio(bookedSpots, totalCapacity)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#F8FAFC', marginHorizontal: 16, marginTop: 8, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
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