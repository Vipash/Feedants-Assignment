// mobile-app/src/components/TrustAndReferral.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ShieldCheck, Share2, MessageSquare, ChevronRight, HelpCircle } from 'lucide-react-native';

export default function TrustAndReferral({ referralCode }) {
  const referralLink = `https://feedants.com/c/${referralCode || 'classicd21'}`;

  return (
    <View style={styles.container}>
      {/* FAQ & Trust banner */}
      <TouchableOpacity 
        style={styles.trustRow}
        onPress={() => Alert.alert('Prize Distribution FAQ', 'Prize money is directly transferred to your bank/UPI within 24h of result announcement.')}
      >
        <View style={styles.left}>
          <HelpCircle size={16} color="#0D9488" />
          <Text style={styles.trustText}>How will you receive prize money?</Text>
        </View>
        <ChevronRight size={16} color="#94A3B8" />
      </TouchableOpacity>

      <View style={styles.badgeRow}>
        <View style={styles.badge}>
          <ShieldCheck size={12} color="#059669" />
          <Text style={styles.badgeText}>Secure policy</Text>
        </View>
        <Text style={styles.poweredText}>Secure payments powered by Razorpay</Text>
      </View>

      {/* Referral Card */}
      <View style={styles.referralCard}>
        <View style={styles.referralTop}>
          <Share2 size={16} color="#0D9488" />
          <Text style={styles.referralTitle}>Refer & Earn more discount</Text>
        </View>
        <View style={styles.linkRow}>
          <Text style={styles.linkText} numberOfLines={1}>{referralLink}</Text>
          <TouchableOpacity 
            style={styles.copyBtn} 
            onPress={() => Alert.alert('Copied!', 'Referral link copied to clipboard.')}
          >
            <Text style={styles.copyBtnText}>Copy Link</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Testimonial preview */}
      <TouchableOpacity 
        style={styles.testimonialRow}
        onPress={() => Alert.alert('Community Testimonials', 'Over 12,000 dancers have won rewards on Feedants!')}
      >
        <View style={styles.left}>
          <MessageSquare size={16} color="#64748B" />
          <Text style={styles.testimonialText}>Hear From Our Users</Text>
        </View>
        <ChevronRight size={16} color="#94A3B8" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginHorizontal: 16, marginTop: 14 },
  trustRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  left: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  trustText: { fontSize: 12, fontWeight: '700', color: '#1E293B' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6, paddingHorizontal: 4 },
  badge: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  badgeText: { fontSize: 10, fontWeight: '600', color: '#059669' },
  poweredText: { fontSize: 9, color: '#94A3B8' },
  referralCard: { backgroundColor: '#F0FDFA', borderWidth: 1, borderColor: '#99F6E4', borderRadius: 8, padding: 12, marginTop: 10 },
  referralTop: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  referralTitle: { fontSize: 12, fontWeight: '700', color: '#0F766E' },
  linkRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 6, borderWidth: 1, borderColor: '#CCFBF1', paddingLeft: 8 },
  linkText: { flex: 1, fontSize: 11, color: '#64748B' },
  copyBtn: { backgroundColor: '#0D9488', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 5 },
  copyBtnText: { color: '#FFFFFF', fontSize: 10, fontWeight: '700' },
  testimonialRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#E2E8F0', marginTop: 10 }
});