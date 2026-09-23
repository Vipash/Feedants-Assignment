import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { 
  Play, 
  ShieldCheck, 
  Megaphone, 
  MessageSquare, 
  ChevronRight,
  CheckCircle2
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
          style={[styles.trustCard, styles.videoCard]} 
          activeOpacity={0.8}
          onPress={() => Alert.alert(t.faqPrize, 'Demonstrating how prize money is credited to your bank account within 24 hours.')}
        >
          <View style={styles.badgeRow}>
            <View style={styles.playCircle}>
              <Play size={12} color="#0D9488" fill="#0D9488" />
            </View>
            <View style={styles.faqTag}>
              <Text style={styles.faqTagText}>FAQ Video</Text>
            </View>
          </View>

          <View style={styles.cardBottomText}>
            <Text style={styles.trustCardTitle} numberOfLines={2}>{t.faqPrize}</Text>
            <Text style={styles.trustCardSub}>{t.watchVideo} →</Text>
          </View>
        </TouchableOpacity>

        {/* Right: Refund policy & Razorpay */}
        <View style={styles.trustCard}>
          {/* Refund Block */}
          <TouchableOpacity 
            style={styles.innerBlock}
            activeOpacity={0.7}
            onPress={() => Alert.alert(t.refundPolicy, 'Full refund is guaranteed if a competition is rescheduled or cancelled.')}
          >
            <ShieldCheck size={16} color="#0D9488" />
            <View style={styles.blockTextWrapper}>
              <Text style={styles.policyText}>{t.refundPolicy}</Text>
              <Text style={styles.guaranteeSub}>100% Money Back</Text>
            </View>
          </TouchableOpacity>

          {/* Payment Block */}
          <View style={[styles.innerBlock, styles.paymentBlock]}>
            <CheckCircle2 size={16} color="#032D60" />
            <View style={styles.blockTextWrapper}>
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
            <Megaphone size={15} color="#0D9488" />
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
        activeOpacity={0.7}
      >
        <View style={styles.testimonialLeft}>
          <View style={styles.iconCircle}>
            <MessageSquare size={15} color="#0F766E" />
          </View>
          <View style={styles.testimonialTextContainer}>
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
  container: { 
    marginHorizontal: 16, 
    marginTop: 14 
  },
  sideBySideRow: { 
    flexDirection: 'row', 
    gap: 10 
  },
  trustCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 8, 
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  videoCard: {
    backgroundColor: '#FAF5FF',
    borderColor: '#F3E8FF'
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  playCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  faqTag: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  faqTagText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#7E22CE'
  },
  cardBottomText: {
    marginTop: 4
  },
  trustCardTitle: { 
    fontSize: 11, 
    fontWeight: '800', 
    color: '#1E293B',
    lineHeight: 15
  },
  trustCardSub: { 
    fontSize: 10, 
    color: '#0D9488', 
    fontWeight: '700',
    marginTop: 4 
  },

  /* Inner Blocks for Right Card */
  innerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6, // Reduced gap from 8 to 6
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 6, // Reduced padding to preserve inner text width
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  paymentBlock: {
    backgroundColor: '#F0F9FF',
    borderColor: '#E0F2FE',
    marginTop: 6
  },
  blockTextWrapper: {
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  policyText: { 
    fontSize: 10.5, 
    fontWeight: '800', 
    color: '#1E293B',
    lineHeight: 13
  },
  guaranteeSub: {
    fontSize: 8.5,
    color: '#059669',
    fontWeight: '700',
    marginTop: 1
  },
  secureText: { 
    fontSize: 8.5, 
    color: '#0369A1',
    fontWeight: '600'
  },
  razorpayBrand: { 
    fontSize: 11, 
    fontWeight: '900', 
    color: '#032D60',
    lineHeight: 13
  },

  /* Refer Card */
  referCard: {
    backgroundColor: '#F0FDFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#99F6E4',
    padding: 12,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  referLeft: { 
    flex: 1 
  },
  referHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 6, 
    marginBottom: 6 
  },
  referTitle: { 
    fontSize: 11.5, 
    fontWeight: '800', 
    color: '#0F766E' 
  },
  linkRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCFBF1',
    alignItems: 'center',
    overflow: 'hidden'
  },
  linkInput: { 
    flex: 1, 
    fontSize: 10, 
    color: '#64748B', 
    paddingHorizontal: 8, 
    paddingVertical: 4 
  },
  copyBtn: { 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    backgroundColor: '#CCFBF1' 
  },
  copyText: { 
    fontSize: 9.5, 
    fontWeight: '800', 
    color: '#0F766E' 
  },
  referRight: { 
    alignItems: 'center', 
    width: 92 
  },
  referNowBtn: { 
    backgroundColor: '#0D9488', 
    paddingVertical: 7, 
    borderRadius: 6, 
    width: '100%', 
    alignItems: 'center' 
  },
  referNowText: { 
    color: '#FFFFFF', 
    fontSize: 10, 
    fontWeight: '800' 
  },
  earnSubText: { 
    fontSize: 8.5, 
    color: '#0F766E', 
    textAlign: 'center', 
    marginTop: 4 
  },

  /* Testimonial Row */
  testimonialRow: {
    flexDirection: 'row',
    justify: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10
  },
  testimonialLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 10, 
    flex: 1 
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#CCFBF1',
    justifyContent: 'center',
    alignItems: 'center'
  },
  testimonialTextContainer: { 
    flex: 1 
  },
  testimonialTitle: { 
    fontSize: 11.5, 
    fontWeight: '800', 
    color: '#1E293B' 
  },
  testimonialSub: { 
    fontSize: 9.5, 
    color: '#64748B' 
  },

  /* Ad Box */
  adBox: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#CBD5E1',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
    marginTop: 10,
    backgroundColor: '#F8FAFC'
  },
  adText: { 
    fontSize: 11.5, 
    fontWeight: '600', 
    color: '#94A3B8' 
  }
});