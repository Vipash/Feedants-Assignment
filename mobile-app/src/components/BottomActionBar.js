// mobile-app/src/components/BottomActionBar.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react-native';

export default function BottomActionBar({ actionState, userState, onAction, loading }) {
  const isEnabled = actionState?.enabled && !loading;

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[
          styles.actionButton, 
          !isEnabled && styles.disabledButton,
          userState?.isRegistered && styles.registeredActionButton
        ]}
        disabled={!isEnabled}
        onPress={onAction}
        activeOpacity={0.8}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <View style={styles.btnContent}>
            {userState?.isRegistered ? (
              <UploadCloud size={18} color="#FFFFFF" />
            ) : (
              <CheckCircle2 size={18} color="#FFFFFF" />
            )}
            <View style={styles.textStack}>
              <Text style={styles.buttonLabel}>{actionState?.label || 'Register Now'}</Text>
              {userState?.isRegistered && (
                <Text style={styles.subText}>Registered</Text>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 4
  },
  actionButton: {
    backgroundColor: '#0D9488',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center'
  },
  registeredActionButton: {
    backgroundColor: '#0F766E'
  },
  disabledButton: {
    backgroundColor: '#94A3B8'
  },
  btnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  textStack: {
    alignItems: 'center'
  },
  buttonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800'
  },
  subText: {
    color: '#CCFBF1',
    fontSize: 10,
    fontWeight: '600'
  }
});