// mobile-app/src/components/CountdownTimer.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Hourglass, Flame } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function CountdownTimer({ targetDate, language = 'ENG' }) {
  const t = translations[language] || translations.ENG;
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    if (!targetDate) return;

    const calculateTime = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / 1000 / 60) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, '0'),
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <View style={styles.banner}>
      <View style={styles.left}>
        <Hourglass size={14} color="#047857" />
        <Text style={styles.label}>{t.regClosesIn}</Text>
      </View>

      <Text style={styles.timerNumbers}>
        {timeLeft.days}d : {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
      </Text>

      <View style={styles.hurryTag}>
        <Flame size={12} color="#DC2626" />
        <Text style={styles.hurryText}>{t.hurryUp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: '#F0FDF4', marginHorizontal: 16, marginTop: 10, borderRadius: 8, paddingVertical: 8, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#BBF7D0' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  label: { fontSize: 11, fontWeight: '600', color: '#065F46' },
  timerNumbers: { fontSize: 12, fontWeight: '800', color: '#047857' },
  hurryTag: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FEE2E2', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
  hurryText: { fontSize: 10, fontWeight: '700', color: '#DC2626' }
});