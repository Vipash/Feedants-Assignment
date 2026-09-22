// mobile-app/src/components/BottomNavBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Home, Compass, Plus, Trophy, User } from 'lucide-react-native';

export default function BottomNavBar({ activeTab = 'Competitions', onSelectTab }) {
  const tabs = [
    { name: 'Home', icon: Home },
    { name: 'Explore', icon: Compass },
    { name: 'Add', isFab: true },
    { name: 'Competitions', icon: Trophy },
    { name: 'Profile', icon: User }
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
            onPress={() => {
              if (tab.name !== 'Competitions') {
                Alert.alert(tab.name, `Navigating to ${tab.name} feed.`);
              }
              onSelectTab?.(tab.name);
            }}
          >
            <Icon size={19} color={isActive ? '#0D9488' : '#94A3B8'} />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    height: 56,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8
  },
  tab: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  tabLabel: { fontSize: 10, color: '#94A3B8', marginTop: 2, fontWeight: '500' },
  activeTabLabel: { color: '#0D9488', fontWeight: '800' },
  fab: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0D9488',
    justifyContent: 'center',
    alignItems: 'center',
    top: -10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3
  }
});