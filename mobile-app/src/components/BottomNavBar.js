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
                onPress={() => onSelectTab?.(tab.name)}
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
    height: 64, // Increased height to prevent congestion
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingBottom: 4,
    overflow: 'visible' // Allows FAB button to pop up cleanly without clipping
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
    marginTop: -20, // Clean vertical offset
    elevation: 6,
    shadowColor: '#0D9488',
    shadowOpacity: 0.35,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 }
  }
});