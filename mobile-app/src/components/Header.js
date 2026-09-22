// mobile-app/src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowLeft, CheckCircle2, UserCheck } from 'lucide-react-native';

export default function Header({ 
  title, 
  tags = [], 
  isRegistered, 
  language, 
  onToggleLanguage, 
  currentUser, 
  onSwitchUser 
}) {
  return (
    <View style={styles.container}>
      {/* Top utility row: Go back, Switch User (Demo Helper), Language toggle */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.backBtn} activeOpacity={0.7}>
          <ArrowLeft size={20} color="#111827" />
          <Text style={styles.backText}>Go back</Text>
        </TouchableOpacity>

        <View style={styles.topRightActions}>
          {/* User Switcher badge for rapid reviewer demo */}
          <TouchableOpacity style={styles.userSwitchChip} onPress={onSwitchUser}>
            <UserCheck size={14} color="#059669" />
            <Text style={styles.userSwitchText}>{currentUser?.name || 'User'}</Text>
          </TouchableOpacity>

          {/* Language Toggle Pill */}
          <View style={styles.langPill}>
            <TouchableOpacity 
              style={[styles.langOption, language === 'ENG' && styles.langActive]}
              onPress={() => onToggleLanguage('ENG')}
            >
              <Text style={[styles.langText, language === 'ENG' && styles.langTextActive]}>ENG</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.langOption, language === 'HINDI' && styles.langActive]}
              onPress={() => onToggleLanguage('HINDI')}
            >
              <Text style={[styles.langText, language === 'HINDI' && styles.langTextActive]}>हिंदी</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Title & Registered Status Row */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>{title}</Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <CheckCircle2 size={13} color="#059669" />
            <Text style={styles.registeredBadgeText}>Registered</Text>
          </View>
        )}
      </View>

      {/* Sub-tags */}
      <View style={styles.tagContainer}>
        {tags.map((tag, idx) => (
          <View key={idx} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, backgroundColor: '#FFFFFF' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backText: { fontSize: 14, fontWeight: '600', color: '#111827' },
  topRightActions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  userSwitchChip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ECFDF5', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 12, borderWidth: 1, borderColor: '#A7F3D0' },
  userSwitchText: { fontSize: 11, fontWeight: '700', color: '#065F46' },
  langPill: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 16, padding: 2 },
  langOption: { paddingVertical: 3, paddingHorizontal: 9, borderRadius: 14 },
  langActive: { backgroundColor: '#0D9488' },
  langText: { fontSize: 11, fontWeight: '600', color: '#6B7280' },
  langTextActive: { color: '#FFFFFF' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  title: { fontSize: 20, fontWeight: '800', color: '#111827', flex: 1 },
  registeredBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ECFDF5', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  registeredBadgeText: { fontSize: 12, fontWeight: '700', color: '#059669' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8 },
  tagBadge: { backgroundColor: '#F3F4F6', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#4B5563', fontWeight: '500' }
});