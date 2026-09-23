import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar, Send, UploadCloud, Award } from 'lucide-react-native';
import { translations } from '../utils/translations';

const formatDate = (dateStr) => {
  if (!dateStr) return { day: '10 Aug 26', time: '11:50 PM' };
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
      
      {/* 2x2 Grid enclosed in the container card */}
      <View style={styles.gridCard}>
        {/* Row 1 */}
        <View style={styles.gridRow}>
          <View style={[styles.cell, styles.borderRight]}>
            <View style={styles.iconRow}>
              <Calendar size={15} color="#0D9488" />
              <Text style={styles.label}>{milestones[0].label}</Text>
            </View>
            <Text style={styles.dateVal}>{milestones[0].date.day}</Text>
            <Text style={styles.timeVal}>{milestones[0].date.time}</Text>
          </View>

          <View style={styles.cell}>
            <View style={styles.iconRow}>
              <Send size={15} color="#0D9488" />
              <Text style={styles.label}>{milestones[1].label}</Text>
            </View>
            <Text style={styles.dateVal}>{milestones[1].date.day}</Text>
            <Text style={styles.timeVal}>{milestones[1].date.time}</Text>
          </View>
        </View>

        <View style={styles.horizontalDivider} />

        {/* Row 2 */}
        <View style={styles.gridRow}>
          <View style={[styles.cell, styles.borderRight]}>
            <View style={styles.iconRow}>
              <UploadCloud size={15} color="#0D9488" />
              <Text style={styles.label}>{milestones[2].label}</Text>
            </View>
            <Text style={styles.dateVal}>{milestones[2].date.day}</Text>
            <Text style={styles.timeVal}>{milestones[2].date.time}</Text>
          </View>

          <View style={styles.cell}>
            <View style={styles.iconRow}>
              <Award size={15} color="#0D9488" />
              <Text style={styles.label}>{milestones[3].label}</Text>
            </View>
            <Text style={styles.dateVal}>{milestones[3].date.day}</Text>
            <Text style={styles.timeVal}>{milestones[3].date.time}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  heading: { fontSize: 14, fontWeight: '800', color: '#1E293B', marginBottom: 8 },
  gridCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    overflow: 'hidden'
  },
  gridRow: { flexDirection: 'row' },
  cell: { flex: 1, paddingVertical: 12, paddingHorizontal: 14 },
  borderRight: { borderRightWidth: 1, borderColor: '#E2E8F0' },
  horizontalDivider: { height: 1, backgroundColor: '#E2E8F0' },
  iconRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 },
  label: { fontSize: 10, fontWeight: '600', color: '#64748B' },
  dateVal: { fontSize: 14, fontWeight: '900', color: '#0F766E' },
  timeVal: { fontSize: 11, fontWeight: '500', color: '#64748B' }
});