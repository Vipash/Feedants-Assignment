// mobile-app/src/components/TabbedDetails.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { translations } from '../utils/translations';

export default function TabbedDetails({ description, parameters = [], rules = [], language = 'ENG' }) {
  const t = translations[language] || translations.ENG;
  const [activeTab, setActiveTab] = useState('ABOUT');
  const [expanded, setExpanded] = useState(false);

  // Compute localized list items (uses props if passed in English, otherwise falls back to translation dictionaries)
  const currentParams = language === 'HINDI' 
    ? t.parametersList 
    : (parameters?.length ? parameters.map(p => `${p.parameter} (${p.weightage}%)`) : t.parametersList);

  const currentRules = language === 'HINDI' 
    ? t.rulesList 
    : (rules?.length ? rules : t.rulesList);

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ABOUT' && styles.activeTab]} 
          onPress={() => setActiveTab('ABOUT')}
        >
          <Text style={[styles.tabText, activeTab === 'ABOUT' && styles.activeTabText]}>{t.tabAbout}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'JUDGING' && styles.activeTab]} 
          onPress={() => setActiveTab('JUDGING')}
        >
          <Text style={[styles.tabText, activeTab === 'JUDGING' && styles.activeTabText]}>{t.tabJudging}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'RULES' && styles.activeTab]} 
          onPress={() => setActiveTab('RULES')}
        >
          <Text style={[styles.tabText, activeTab === 'RULES' && styles.activeTabText]}>{t.tabRules}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contentBox}>
        {activeTab === 'ABOUT' && (
          <>
            <Text style={styles.bodyText} numberOfLines={expanded ? undefined : 2}>
              {language === 'HINDI' ? t.aboutText : (description || t.aboutText)}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.expandBtn}>
              <Text style={styles.expandText}>{expanded ? t.viewLess : t.viewMore}</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'JUDGING' && (
          <View style={styles.list}>
            {currentParams.map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        )}

        {activeTab === 'RULES' && (
          <View style={styles.list}>
            {currentRules.map((rule, idx) => (
              <Text key={idx} style={styles.listItem}>• {rule}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  tabBar: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E2E8F0' },
  tab: { paddingVertical: 8, marginRight: 16 },
  activeTab: { borderBottomWidth: 2, borderColor: '#0D9488' },
  tabText: { fontSize: 12, fontWeight: '600', color: '#64748B' },
  activeTabText: { color: '#0D9488', fontWeight: '800' },
  contentBox: { paddingVertical: 8 },
  bodyText: { fontSize: 12, color: '#475569', lineHeight: 18 },
  expandBtn: { alignSelf: 'center', marginTop: 4 },
  expandText: { fontSize: 11, fontWeight: '700', color: '#0D9488' },
  list: { gap: 4, marginTop: 4 },
  listItem: { fontSize: 12, color: '#475569' }
});