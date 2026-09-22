// mobile-app/src/components/Header.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { ArrowLeft, CheckCircle2, UserCheck, RefreshCw } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function Header({ 
  title, 
  isRegistered, 
  language = 'ENG', 
  onToggleLanguage, 
  currentUser, 
  onSwitchUser 
}) {
  const t = translations[language] || translations.ENG;
  const currentTags = t.tags;

  return (
    <View style={styles.container}>
      {/* 1. Reviewer Bar */}
      <View style={styles.reviewerBar}>
        <Text style={styles.reviewerLabel}>Evaluation Switcher:</Text>
        <TouchableOpacity 
          style={styles.userSwitchBtn} 
          onPress={onSwitchUser}
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <UserCheck size={14} color="#065F46" />
          <Text style={styles.userSwitchText}>
            {currentUser ? `${currentUser.name} (${isRegistered ? t.registered : (language === 'HINDI' ? 'अपंजीकृत' : 'Unregistered')})` : 'Select User'}
          </Text>
          <RefreshCw size={12} color="#065F46" />
        </TouchableOpacity>
      </View>

      {/* 2. Top navigation row */}
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={styles.backBtn} 
          activeOpacity={0.7}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <ArrowLeft size={20} color="#111827" />
          <Text style={styles.backText}>{t.goBack}</Text>
        </TouchableOpacity>

        {/* Language Pill */}
        <View style={styles.langPill}>
          <TouchableOpacity 
            style={[styles.langOption, language === 'ENG' && styles.langActive]}
            onPress={() => onToggleLanguage('ENG')}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          >
            <Text style={[styles.langText, language === 'ENG' && styles.langTextActive]}>ENG</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.langOption, language === 'HINDI' && styles.langActive]}
            onPress={() => onToggleLanguage('HINDI')}
            activeOpacity={0.8}
            hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
          >
            <Text style={[styles.langText, language === 'HINDI' && styles.langTextActive]}>हिंदी</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. Title & Registration Status */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>
          {language === 'HINDI' ? 'फ़ीडैंट्स शास्त्रीय नृत्य' : (title || 'Feedants Classical Dance')}
        </Text>
        {isRegistered && (
          <View style={styles.registeredBadge}>
            <CheckCircle2 size={13} color="#059669" />
            <Text style={styles.registeredBadgeText}>{t.registered}</Text>
          </View>
        )}
      </View>

      {/* 4. Category Badges */}
      <View style={styles.tagContainer}>
        {currentTags.map((tag, idx) => (
          <View key={idx} style={styles.tagBadge}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 8 : 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderColor: '#F1F5F9'
  },
  reviewerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12
  },
  reviewerLabel: { fontSize: 10, fontWeight: '700', color: '#047857', textTransform: 'uppercase' },
  userSwitchBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  userSwitchText: { fontSize: 12, fontWeight: '800', color: '#065F46' },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingVertical: 4 },
  backText: { fontSize: 14, fontWeight: '700', color: '#111827' },
  langPill: { flexDirection: 'row', backgroundColor: '#F3F4F6', borderRadius: 20, padding: 3 },
  langOption: { paddingVertical: 5, paddingHorizontal: 12, borderRadius: 16 },
  langActive: { backgroundColor: '#0D9488' },
  langText: { fontSize: 12, fontWeight: '600', color: '#6B7280' },
  langTextActive: { color: '#FFFFFF' },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  title: { fontSize: 21, fontWeight: '800', color: '#0F172A', flex: 1, marginRight: 8 },
  registeredBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#ECFDF5', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 14, borderWidth: 1, borderColor: '#A7F3D0' },
  registeredBadgeText: { fontSize: 12, fontWeight: '800', color: '#059669' },
  tagContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  tagBadge: { backgroundColor: '#F1F5F9', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6 },
  tagText: { fontSize: 11, color: '#475569', fontWeight: '600' }
});