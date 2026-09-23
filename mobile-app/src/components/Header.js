// mobile-app/src/components/Header.js
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Platform, 
  StatusBar, 
  Modal,
  ScrollView
} from 'react-native';
import { ArrowLeft, CheckCircle2, User, Trophy, Plus, RotateCcw, X } from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function Header({ 
  title, 
  isRegistered, 
  language = 'ENG', 
  onToggleLanguage, 
  currentUser, 
  users = [],
  onSelectUser,
  onAddNewUser,
  onResetDemo,
  onGoBack
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const t = translations[language] || translations.ENG;

  return (
    <View style={styles.container}>
      {/* Top navigation row: Go back (Left) | User Switcher + Language Toggle (Right) */}
      <View style={styles.topRow}>
        <TouchableOpacity 
          style={styles.backBtn} 
          activeOpacity={0.7}
          onPress={onGoBack}
        >
          <ArrowLeft size={20} color="#111827" />
          <Text style={styles.backText}>{t.goBack}</Text>
        </TouchableOpacity>

        <View style={styles.rightHeaderActions}>
          {/* User Switcher Pill */}
          <TouchableOpacity 
            style={styles.userChip} 
            onPress={() => setModalVisible(true)}
            activeOpacity={0.7}
          >
            <User size={13} color="#0D9488" />
            <Text style={styles.userChipText} numberOfLines={1}>
              {currentUser?.name?.split(' ')[0] || 'User'}
            </Text>
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

      {/* Sub-tags matching the mockup */}
      <View style={styles.tagContainer}>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{t.tags[0] || 'Dance'}</Text>
        </View>
        <View style={styles.tagBadge}>
          <Text style={styles.tagText}>{t.tags[1] || 'Multi-Win'}</Text>
        </View>
        <View style={[styles.tagBadge, styles.certTag]}>
          <Trophy size={12} color="#0D9488" />
          <Text style={[styles.tagText, styles.certText]}>{t.tags[2] || 'Winners get certificate'}</Text>
        </View>
      </View>

      {/* USER SWITCHER MODAL */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Switch User / Demo Control</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={20} color="#64748B" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>Select a user to test dynamic states:</Text>

            <ScrollView style={{ maxHeight: 220, marginVertical: 6 }} showsVerticalScrollIndicator={true}>
                {users.map((u) => {
                  const isSelected = u._id === currentUser?._id;
                  return (
                    <TouchableOpacity 
                      key={u._id} 
                      style={[styles.userOption, isSelected && styles.userOptionSelected]}
                      onPress={() => {
                        onSelectUser(u);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={[styles.userName, isSelected && styles.userNameSelected]}>{u.name}</Text>
                      <Text style={styles.userEmail}>{u.email}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

            {/* Actions: Add New Unregistered User & Reset Demo */}
            <View style={styles.modalActionButtons}>
              <TouchableOpacity 
                style={styles.newUserBtn}
                onPress={() => {
                  onAddNewUser();
                  setModalVisible(false);
                }}
              >
                <Plus size={16} color="#FFFFFF" />
                <Text style={styles.btnTextWhite}>+ New Unregistered User</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.resetBtn}
                onPress={() => {
                  onResetDemo();
                  setModalVisible(false);
                }}
              >
                <RotateCcw size={15} color="#DC2626" />
                <Text style={styles.resetBtnText}>Reset Demo State (1/20 Booked)</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 8 : 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF'
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pushes left button to left, right controls to right
    alignItems: 'center',
    width: '100%'
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginRight: 12, // Prevents collision with user chip on small viewports
    flexShrink: 1
  },
  backText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827'
  },
  rightHeaderActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0
  },
  userChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDFA',
    paddingVertical: 5,
    paddingHorizontal: 9,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CCFBF1'
  },
  userChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F766E'
  },
  langPill: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 20,
    padding: 3
  },
  langOption: {
    paddingVertical: 4,
    paddingHorizontal: 11,
    borderRadius: 14
  },
  langActive: {
    backgroundColor: '#0D9488'
  },
  langText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280'
  },
  langTextActive: {
    color: '#FFFFFF'
  },
  titleRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    marginTop: 14
  },
  title: {
    fontSize: 21,
    fontWeight: '800',
    color: '#0F172A',
    flex: 1
  },
  registeredBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0'
  },
  registeredBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#059669'
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 8
  },
  tagBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6
  },
  certTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDFA'
  },
  tagText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600'
  },
  certText: {
    color: '#0D9488'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20
  },
  modalHeader: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center'
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F172A'
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    marginVertical: 10
  },
  userOption: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 8
  },
  userOptionSelected: {
    borderColor: '#0D9488',
    backgroundColor: '#F0FDFA'
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1E293B'
  },
  userNameSelected: {
    color: '#0D9488'
  },
  userEmail: {
    fontSize: 11,
    color: '#64748B'
  },
  modalActionButtons: {
    marginTop: 12,
    gap: 8
  },
  newUserBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#0D9488',
    padding: 10,
    borderRadius: 8
  },
  btnTextWhite: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13
  },
  resetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FEF2F2',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FCA5A5'
  },
  resetBtnText: {
    color: '#DC2626',
    fontWeight: '700',
    fontSize: 12
  }
});