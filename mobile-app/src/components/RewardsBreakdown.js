// mobile-app/src/components/RewardsBreakdown.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Trophy, Medal, Award, Star } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function RewardsBreakdown({ rewards = [], language = 'ENG' }) {
  const t = translations[language] || translations.ENG;

  const defaultRewards = [
    { rankTitle: '1st Winner', amount: 550 },
    { rankTitle: '2nd Winner', amount: 300 },
    { rankTitle: '3rd Winner', amount: 240 },
    { rankTitle: '4th Winner', amount: 200 },
    { rankTitle: '5th Winner', amount: 130 },
    { rankTitle: '6th Winner', amount: 80 }
  ];

  const rewardList = rewards.length >= 6 ? rewards : defaultRewards;

  const getRankIcon = (index) => {
    switch (index) {
      case 0: return <Trophy size={16} color="#EAB308" />;
      case 1: return <Medal size={16} color="#94A3B8" />;
      case 2: return <Award size={16} color="#D97706" />;
      default: return <Star size={16} color="#0D9488" />;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t.rewardsTitle}</Text>
      <View style={styles.card}>
        {rewardList.map((reward, idx) => (
          <View key={idx} style={[styles.row, idx === rewardList.length - 1 && styles.noBorder]}>
            <View style={styles.leftCol}>
              {getRankIcon(idx)}
              <Text style={styles.rankTitle}>
                {language === 'HINDI' && t.ranks && t.ranks[idx] ? t.ranks[idx] : reward.rankTitle}
              </Text>
            </View>
            <Text style={styles.amount}>₹ {reward.amount}</Text>
          </View>
        ))}
      </View>

      <View style={styles.disclaimerBox}>
        <Text style={styles.disclaimerText}>{t.disclaimer}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 13, fontWeight: '700', color: '#64748B', marginBottom: 8 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
    gap: 12
  },
  noBorder: { borderBottomWidth: 0 },
  leftCol: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  rankTitle: { fontSize: 13, fontWeight: '700', color: '#1E293B' },
  amount: { fontSize: 14, fontWeight: '900', color: '#0F766E' },
  disclaimerBox: {
    backgroundColor: '#F0FDFA',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#CCFBF1'
  },
  disclaimerText: { fontSize: 11, color: '#0F766E', fontWeight: '500', lineHeight: 16 }
});