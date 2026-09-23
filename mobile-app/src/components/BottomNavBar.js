import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Home, Compass, Plus, Trophy, User } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function BottomNavBar({ activeTab = 'Competitions', onSelectTab, language = 'ENG' }) {
  const t = translations[language] || translations.ENG;

  const tabs = [
    { name: 'Home', label: t.nav?.home || 'Home', icon: Home },
    { name: 'Explore', label: t.nav?.explore || 'Explore', icon: Compass },
    { name: 'Add', isFab: true },
    { name: 'Competitions', label: t.nav?.comp || 'Competitions', icon: Trophy },
    { name: 'Profile', label: t.nav?.profile || 'Profile', icon: User }
  ];

  return (
    <View style={styles.navBar}>
      {tabs.map((tab, idx) => {
        if (tab.isFab) {
          return (
            <TouchableOpacity 
              key={idx} 
              style={styles.fab} 
              activeOpacity={0.8}
              onPress={() => Alert.alert('Feedants Create', 'Open video creator or submission recorder')}
            >
              <Plus size={24} color="#FFFFFF" />
            </TouchableOpacity>
          );
        }

        const Icon = tab.icon;
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity 
            key={idx} 
            style={styles.tab} 
            activeOpacity={0.7}
            onPress={() => onSelectTab?.(tab.name)}
          >
            <Icon size={19} color={isActive ? '#0D9488' : '#94A3B8'} />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 77,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justify: 'space-around',
    paddingHorizontal: 8,
    paddingBottom: 4,
    overflow: 'visible'
  },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 3, fontWeight: '500' },
  activeTabLabel: { color: '#0D9488', fontWeight: '800' },
  fab: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',  
    marginTop: -10,
    alignSelf: 'center',
    elevation: 6,
    shadowColor: '#0D9488',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  }
});