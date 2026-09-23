// mobile-app/src/components/TrustAndReferral.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { 
  Play, 
  ShieldCheck, 
  Megaphone, 
  MessageSquare, 
  ChevronRight 
} from 'lucide-react-native';
import { translations } from '../utils/translations';

export default function TrustAndReferral({ referralCode, language = 'ENG' }) {
  const t = translations[language] || translations.ENG;
  const referralLink = `https://feedants.com/r/${referralCode || 'referral123'}`;

  return (
    <View style={styles.container}>
      {/* 1. Side-by-Side Trust Cards */}
      <View style={styles.sideBySideRow}>
        {/* Left: How will you receive prize money? (Clickable Video Card) */}
        <TouchableOpacity 
          style={styles.trustCard} 
          activeOpacity={0.8}
          onPress={() => Alert.alert(t.faqPrize, 'Demonstrating how prize money is credited to your bank account within 24 hours.')}
        >
          <View style={styles.playCircle}>
            <Play size={14} color="#0D9488" fill="#0D9488" />
          </View>
          <Text style={styles.trustCardTitle}>{t.faqPrize}</Text>
          <Text style={styles.trustCardSub}>{t.watchVideo}</Text>
        </TouchableOpacity>

        {/* Right: Refund policy & Razorpay */}
        <View style={styles.trustCard}>
          <TouchableOpacity 
            style={styles.policyRow}
            onPress={() => Alert.alert(t.refundPolicy, 'Full refund is guaranteed if a competition is rescheduled or cancelled.')}
          >
            <ShieldCheck size={14} color="#0D9488" />
            <Text style={styles.policyText}>{t.refundPolicy}</Text>
          </TouchableOpacity>

          <View style={[styles.policyRow, { marginTop: 8 }]}>
            <ShieldCheck size={14} color="#0D9488" />
            <View>
              <Text style={styles.secureText}>{t.securePayments}</Text>
              <Text style={styles.razorpayBrand}>Razorpay</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 2. Refer & Earn Box */}
      <View style={styles.referCard}>
        <View style={styles.referLeft}>
          <View style={styles.referHeader}>
            <Megaphone size={16} color="#0D9488" />
            <Text style={styles.referTitle}>{t.referTitle}</Text>
          </View>

          <View style={styles.linkRow}>
            <TextInput 
              value={referralLink} 
              editable={false} 
              style={styles.linkInput} 
              numberOfLines={1} 
            />
            <TouchableOpacity 
              style={styles.copyBtn}
              onPress={() => Alert.alert('Copied!', 'Referral link copied to clipboard.')}
            >
              <Text style={styles.copyText}>{t.copyLink}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Right: Refer Now Button & Reward Text */}
        <View style={styles.referRight}>
          <TouchableOpacity 
            style={styles.referNowBtn}
            onPress={() => Alert.alert(t.referTitle, 'Share this competition with your dancer friends to earn ₹10 per signup.')}
          >
            <Text style={styles.referNowText}>{t.referNow}</Text>
          </TouchableOpacity>
          <Text style={styles.earnSubText}>{t.earnSignup}</Text>
        </View>
      </View>

      {/* 3. Hear From Our Users */}
      <TouchableOpacity 
        style={styles.testimonialRow}
        onPress={() => Alert.alert(t.hearUsers, 'Read testimonials from 10,000+ dancers across India.')}
      >
        <View style={styles.testimonialLeft}>
          <MessageSquare size={16} color="#1E293B" />
          <View>
            <Text style={styles.testimonialTitle}>{t.hearUsers}</Text>
            <Text style={styles.testimonialSub}>{t.hearUsersSub}</Text>
          </View>
        </View>
        <ChevronRight size={18} color="#94A3B8" />
      </TouchableOpacity>

      {/* 4. Ad Here Box */}
      <View style={styles.adBox}>
        <Megaphone size={14} color="#94A3B8" />
        <Text style={styles.adText}>{t.adHere}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  sideBySideRow: { flexDirection: 'row', gap: 10 },
  trustCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12
  },
  playCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6
  },
  trustCardTitle: { fontSize: 11, fontWeight: '800', color: '#1E293B' },
  trustCardSub: { fontSize: 9, color: '#64748B', marginTop: 2 },
  policyRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  policyText: { fontSize: 11, fontWeight: '700', color: '#1E293B' },
  secureText: { fontSize: 9, color: '#64748B' },
  razorpayBrand: { fontSize: 12, fontWeight: '900', color: '#032D60' },
  referCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#99F6E4',
    padding: 12,
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  referLeft: { flex: 1 },
  referHeader: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 6 },
  referTitle: { fontSize: 11, fontWeight: '800', color: '#0F766E' },
  linkRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    alignItems: 'center'
  },
  linkInput: { flex: 1, fontSize: 10, color: '#64748B', paddingHorizontal: 6, paddingVertical: 4 },
  copyBtn: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: '#F1F5F9', borderLeftWidth: 1, borderColor: '#E2E8F0' },
  copyText: { fontSize: 9, fontWeight: '700', color: '#0D9488' },
  referRight: { alignItems: 'center', width: 95 },
  referNowBtn: { backgroundColor: '#0D9488', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 6, width: '100%', alignItems: 'center' },
  referNowText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800' },
  earnSubText: { fontSize: 8, color: '#0F766E', textAlign: 'center', marginTop: 3 },
  testimonialRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    marginTop: 12
  },
  testimonialLeft: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  testimonialTitle: { fontSize: 12, fontWeight: '800', color: '#1E293B' },
  testimonialSub: { fontSize: 10, color: '#64748B' },
  adBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    justify: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
    backgroundColor: '#F8FAFC'
  },
  adText: { fontSize: 12, fontWeight: '600', color: '#94A3B8' }
});