// mobile-app/src/components/RewardsBreakdown.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy } from 'lucide-react-native';

export default function RewardsBreakdown({ rewards = [] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Rewards (All Positions)</Text>
      <View style={styles.card}>
        {rewards.map((reward, idx) => (
          <View key={idx} style={styles.row}>
            <View style={styles.rankCol}>
              <Trophy size={14} color={idx === 0 ? '#EAB308' : idx === 1 ? '#94A3B8' : '#D97706'} />
              <Text style={styles.rankTitle}>{reward.rankTitle}</Text>
            </View>
            <Text style={styles.amount}>₹ {reward.amount}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.disclaimer}>
        ⓘ Disclaimer: Only contributions from paid participants will be considered for judging.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 4 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8, paddingHorizontal: 14, borderBottomWidth: 1, borderColor: '#F1F5F9' },
  rankCol: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  rankTitle: { fontSize: 12, fontWeight: '600', color: '#334155' },
  amount: { fontSize: 13, fontWeight: '800', color: '#047857' },
  disclaimer: { fontSize: 10, color: '#94A3B8', marginTop: 6, fontStyle: 'italic' }
});