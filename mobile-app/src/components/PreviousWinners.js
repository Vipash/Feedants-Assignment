import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Linking } from 'react-native';
import { Play } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function PreviousWinners({ winners = [], language = 'ENG' }) {
  const t = translations[language] || translations.ENG;
  const demoVideoUrl = 'https://www.youtube.com/watch?v=4xnsmyI5KMQ';

  const defaultWinners = [
    { name: 'Riya Parashar', rank: '1st Winner', avatarUrl: 'https://images.unsplash.com/photo-1609137144822-38605c48b788?w=300' },
    { name: 'Vinod Kumar', rank: '1st Winner', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300' },
    { name: 'Neha Choudhary', rank: '2nd Winner', avatarUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=300' },
    { name: 'Ishita Dhariwal', rank: '3rd Winner', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300' }
  ];

  const list = winners.length > 0 ? winners : defaultWinners;

  const handlePlayWinnerVideo = (winner) => {
    const videoUrl = winner.videoUrl || demoVideoUrl;

    Alert.alert(
      'Previous Winner',
      `Playing winning classical performance of ${winner.name}\n\nLink: ${videoUrl}`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Watch Performance',
          onPress: async () => {
            try {
              const supported = await Linking.canOpenURL(videoUrl);
              if (supported) {
                await Linking.openURL(videoUrl);
              } else {
                Alert.alert('Error', 'Unable to open video link.');
              }
            } catch (err) {
              Alert.alert('Error', 'An error occurred while opening the video.');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t.previousWinners}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {list.map((winner, idx) => (
          <TouchableOpacity 
            key={idx} 
            style={styles.card} 
            activeOpacity={0.8}
            onPress={() => handlePlayWinnerVideo(winner)}
          >
            <View style={styles.imgContainer}>
              <Image source={{ uri: winner.avatarUrl }} style={styles.thumbnail} />
              <View style={styles.playCircle}>
                <Play size={10} color="#0D9488" fill="#0D9488" />
              </View>
            </View>

            <View style={styles.meta}>
              <Text style={styles.name} numberOfLines={1}>{winner.name}</Text>
              <Text style={styles.rank}>{winner.rank || '1st Winner'}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  scroll: { gap: 10, paddingRight: 16 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
    width: 145
  },
  imgContainer: { position: 'relative' },
  thumbnail: { width: 50, height: 50, borderRadius: 10, backgroundColor: '#E2E8F0' },
  playCircle: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFFFFF',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center'
  },
  meta: { flex: 1 },
  name: { fontSize: 11, fontWeight: '800', color: '#1E293B' },
  rank: { fontSize: 10, fontWeight: '700', color: '#0D9488', marginTop: 2 }
});