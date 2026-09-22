// mobile-app/src/components/JudgeCard.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Play } from 'lucide-react-native';

export default function JudgeCard({ judge }) {
  if (!judge) return null;

  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: judge.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150' }} 
        style={styles.avatar} 
      />
      <View style={styles.details}>
        <Text style={styles.subLabel}>Judge</Text>
        <Text style={styles.name}>{judge.name}</Text>
        <Text style={styles.title}>{judge.title}</Text>
        <Text style={styles.expBadge}>{judge.experience}</Text>
      </View>

      <TouchableOpacity 
        style={styles.playButtonContainer} 
        activeOpacity={0.8}
        onPress={() => Alert.alert('Judge Spotlight', `Playing introductory trailer from ${judge.name}`)}
      >
        <View style={styles.playCircle}>
          <Play size={16} color="#0D9488" fill="#0D9488" />
        </View>
        <Text style={styles.playLabel}>Intro Video</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: '#CBD5E1' },
  details: { flex: 1, marginLeft: 12 },
  subLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '600', textTransform: 'uppercase' },
  name: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  title: { fontSize: 12, color: '#475569', fontWeight: '500' },
  expBadge: { fontSize: 10, color: '#0D9488', fontWeight: '700', marginTop: 2 },
  playButtonContainer: { alignItems: 'center', paddingLeft: 8 },
  playCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#CCFBF1', justifyContent: 'center', alignItems: 'center' },
  playLabel: { fontSize: 10, fontWeight: '600', color: '#0D9488', marginTop: 4 }
});