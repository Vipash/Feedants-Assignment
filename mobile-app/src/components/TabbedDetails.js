// mobile-app/src/components/TabbedDetails.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TabbedDetails({ description, parameters = [], rules = [] }) {
  const [activeTab, setActiveTab] = useState('ABOUT');
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ABOUT' && styles.activeTab]} 
          onPress={() => setActiveTab('ABOUT')}
        >
          <Text style={[styles.tabText, activeTab === 'ABOUT' && styles.activeTabText]}>About Competition</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'JUDGING' && styles.activeTab]} 
          onPress={() => setActiveTab('JUDGING')}
        >
          <Text style={[styles.tabText, activeTab === 'JUDGING' && styles.activeTabText]}>Judging Parameters</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'RULES' && styles.activeTab]} 
          onPress={() => setActiveTab('RULES')}
        >
          <Text style={[styles.tabText, activeTab === 'RULES' && styles.activeTabText]}>Rules & Eligibility</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <View style={styles.contentBox}>
        {activeTab === 'ABOUT' && (
          <>
            <Text style={styles.bodyText} numberOfLines={expanded ? undefined : 2}>
              {description || 'This is an online classical dance competition open for all age groups. Participate from anywhere and showcase your talent. Express your passion through traditional dance.'}
            </Text>
            <TouchableOpacity onPress={() => setExpanded(!expanded)} style={styles.expandBtn}>
              <Text style={styles.expandText}>{expanded ? 'View less ▲' : 'View more ▼'}</Text>
            </TouchableOpacity>
          </>
        )}

        {activeTab === 'JUDGING' && (
          <View style={styles.list}>
            {parameters.map((item, idx) => (
              <Text key={idx} style={styles.listItem}>• {item.parameter} ({item.weightage}%)</Text>
            ))}
          </View>
        )}

        {activeTab === 'RULES' && (
          <View style={styles.list}>
            {rules.map((rule, idx) => (
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