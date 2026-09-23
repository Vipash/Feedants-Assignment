import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Users } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function PricingCard({ 
  prizePool, 
  entryFee, 
  totalCapacity = 20, 
  bookedSpots = 1, 
  remainingSpots = 19, 
  language = 'ENG' 
}) {
  const t = translations[language] || translations.ENG;
  const progressRatio = Math.min(1, bookedSpots / (totalCapacity || 1));

  return (
    <View style={styles.card}>
      {/* Prize Pool */}
      <View style={styles.col}>
        <Text style={styles.label}>{t.prizePool}</Text>
        <Text style={styles.prizeAmount}>₹ {prizePool?.toLocaleString('en-IN')}</Text>
      </View>

      {/* Entry Fee */}
      <View style={styles.col}>
        <Text style={styles.label}>{t.entryFee}</Text>
        <Text style={styles.feeAmount}>₹ {entryFee}</Text>
      </View>

      {/* Dynamic Spots with Progress Bar */}
      <View style={[styles.col, { flex: 1.3 }]}>
        <View style={styles.spotsTopRow}>
          <Users size={13} color="#0D9488" />
          <Text style={styles.spotsText}>
            {remainingSpots > 0 ? t.spotsLeft(remainingSpots) : t.fullyBooked}
          </Text>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progressRatio * 100}%` }]} />
        </View>

        <Text style={styles.bookedText}>{t.bookedRatio(bookedSpots, totalCapacity)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    elevation: 1
  },
  col: { flex: 1 },
  label: { fontSize: 11, color: '#64748B', fontWeight: '500', marginBottom: 2 },
  prizeAmount: { fontSize: 20, fontWeight: '900', color: '#0F766E' },
  feeAmount: { fontSize: 20, fontWeight: '900', color: '#0F172A' },
  spotsTopRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 4 },
  spotsText: { fontSize: 11, fontWeight: '700', color: '#0F766E' },
  progressBarBg: { height: 4, backgroundColor: '#E2E8F0', borderRadius: 2, overflow: 'hidden', marginVertical: 3 },
  progressBarFill: { height: '100%', backgroundColor: '#0D9488', borderRadius: 2 },
  bookedText: { fontSize: 10, color: '#94A3B8', fontWeight: '500' }
});