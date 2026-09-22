// mobile-app/src/components/PreviousWinners.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Play } from 'lucide-react-native';

export default function PreviousWinners({ winners = [] }) {
  if (!winners || winners.length === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Previous Winners</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {winners.map((winner, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => Alert.alert('Winner Performance', `Playing winning performance by ${winner.name}`)}
          >
            <View style={styles.imageWrapper}>
              <Image source={{ uri: winner.avatarUrl }} style={styles.avatar} />
              <View style={styles.playBadge}>
                <Play size={10} color="#FFFFFF" fill="#FFFFFF" />
              </View>
            </View>
            <Text style={styles.name} numberOfLines={1}>{winner.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  scroll: { gap: 12, paddingRight: 16 },
  card: { alignItems: 'center', width: 70 },
  imageWrapper: { position: 'relative' },
  avatar: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: '#0D9488' },
  playBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#0D9488', width: 18, height: 18, borderRadius: 9, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 11, fontWeight: '600', color: '#334155', marginTop: 4, textAlign: 'center' }
});