// mobile-app/src/components/ImportantDates.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Send, UploadCloud, Award } from 'lucide-react-native';
import { translations } from '../utils/translations';

const formatDate = (dateStr) => {
  if (!dateStr) return { day: '', time: '' };
  const d = new Date(dateStr);
  const day = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' });
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return { day, time };
};

export default function ImportantDates({ registrationEnd, submissionStart, submissionEnd, resultDate, language = 'ENG' }) {
  const t = translations[language] || translations.ENG;

  const milestones = [
    { label: t.registerBefore, icon: Calendar, date: formatDate(registrationEnd) },
    { label: t.submissionStarts, icon: Send, date: formatDate(submissionStart) },
    { label: t.submissionEnds, icon: UploadCloud, date: formatDate(submissionEnd) },
    { label: t.resultDate, icon: Award, date: formatDate(resultDate) }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t.importantDates}</Text>
      <View style={styles.grid}>
        {milestones.map((item, idx) => {
          const Icon = item.icon;
          return (
            <View key={idx} style={styles.box}>
              <View style={styles.iconRow}>
                <Icon size={14} color="#0D9488" />
                <Text style={styles.boxLabel}>{item.label}</Text>
              </View>
              <Text style={styles.dateText}>{item.date.day}</Text>
              <Text style={styles.timeText}>{item.date.time}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  box: { width: '48.8%', backgroundColor: '#FFFFFF', padding: 10, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  boxLabel: { fontSize: 10, fontWeight: '600', color: '#64748B' },
  dateText: { fontSize: 13, fontWeight: '800', color: '#0F172A' },
  timeText: { fontSize: 11, fontWeight: '500', color: '#64748B' }
});