// mobile-app/App.js
import React, { useState, useEffect, useCallback } from 'react';
import { 
  SafeAreaView, 
  ScrollView, 
  RefreshControl, 
  StyleSheet, 
  ActivityIndicator, 
  View, 
  Text, 
  Alert 
} from 'react-native';
import apiClient from './src/config/api';

import Header from './src/components/Header';
import PricingCard from './src/components/PricingCard';
import JudgeCard from './src/components/JudgeCard';
import CountdownTimer from './src/components/CountdownTimer';
import ImportantDates from './src/components/ImportantDates';
import PreviousWinners from './src/components/PreviousWinners';
import TabbedDetails from './src/components/TabbedDetails';
import RewardsBreakdown from './src/components/RewardsBreakdown';
import TrustAndReferral from './src/components/TrustAndReferral';
import BottomActionBar from './src/components/BottomActionBar';

// COMPETITION ID FROM YOUR SEED OUTPUT
const COMPETITION_ID = '6ab264c3dfe2d14ecdda0b1b';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [language, setLanguage] = useState('ENG');

  // Available seeded users for rapid demo switching
  const [users, setUsers] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/users');
      if (res.data?.success) {
        setUsers(res.data.data);
      }
    } catch (e) {
      console.warn('Could not load users list:', e.message);
    }
  };

  // 2. Fetch Competition Details with active user context
  const fetchCompetition = useCallback(async () => {
    const activeUser = users[currentUserIndex];
    try {
      const headers = activeUser ? { 'x-user-id': activeUser._id } : {};
      const res = await apiClient.get(`/${COMPETITION_ID}`, { headers });
      if (res.data?.success) {
        setCompetition(res.data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Error', 'Unable to reach backend. Check your IP and server.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUserIndex, users]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      fetchCompetition();
    }
  }, [users, currentUserIndex, fetchCompetition]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompetition();
  };

  // Switch between User A (Registered) and User B (Unregistered)
  const handleSwitchUser = () => {
    if (users.length < 2) return;
    const nextIndex = (currentUserIndex + 1) % users.length;
    setCurrentUserIndex(nextIndex);
  };

  // 3. Handle Dynamic Bottom CTA Action
  const handleAction = async () => {
    const action = competition?.actionState?.action;
    const activeUser = users[currentUserIndex];

    if (!activeUser) {
      Alert.alert('Error', 'No user selected.');
      return;
    }

    if (action === 'REGISTER') {
      setActionLoading(true);
      try {
        const res = await apiClient.post(
          `/${COMPETITION_ID}/register`,
          {},
          { headers: { 'x-user-id': activeUser._id } }
        );
        Alert.alert('Success 🎉', res.data.message || 'Registered successfully!');
        fetchCompetition(); // Auto-refresh to update spots and button state
      } catch (err) {
        const msg = err.response?.data?.message || 'Registration failed';
        Alert.alert('Notice', msg);
      } finally {
        setActionLoading(false);
      }
    } else if (action === 'SUBMIT') {
      setActionLoading(true);
      try {
        const res = await apiClient.post(
          `/${COMPETITION_ID}/submit`,
          { mediaUrl: 'https://feedants.com/uploads/classical_dance_submission.mp4' },
          { headers: { 'x-user-id': activeUser._id } }
        );
        Alert.alert('Submitted 🚀', res.data.message || 'Submission received!');
        fetchCompetition();
      } catch (err) {
        Alert.alert('Error', err.response?.data?.message || 'Submission failed');
      } finally {
        setActionLoading(false);
      }
    } else if (action === 'VIEW_SUBMISSION') {
      Alert.alert('Submission Details', 'Your video has been recorded and is in queue for judging.');
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0D9488" />
        <Text style={styles.loadingText}>Loading competition details...</Text>
      </View>
    );
  }

  const activeUser = users[currentUserIndex];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView 
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header 
          title={competition?.title}
          tags={competition?.tags}
          isRegistered={competition?.userState?.isRegistered}
          language={language}
          onToggleLanguage={setLanguage}
          currentUser={activeUser}
          onSwitchUser={handleSwitchUser}
        />

        <PricingCard 
          prizePool={competition?.prizePool}
          entryFee={competition?.entryFee}
          totalCapacity={competition?.totalCapacity}
          bookedSpots={competition?.bookedSpots}
          remainingSpots={competition?.remainingSpots}
        />

        <JudgeCard judge={competition?.judge} />

        <CountdownTimer targetDate={competition?.registrationEndDate} />

        <ImportantDates 
          registrationEnd={competition?.registrationEndDate}
          submissionStart={competition?.submissionStartDate}
          submissionEnd={competition?.submissionEndDate}
          resultDate={competition?.resultDate}
        />

        <PreviousWinners winners={competition?.previousWinners} />

        <TabbedDetails 
          description={competition?.description}
          parameters={competition?.judgingParameters}
          rules={competition?.rulesAndEligibility}
        />

        <RewardsBreakdown rewards={competition?.rewards} />

        <TrustAndReferral referralCode={activeUser?.referralCode} />
      </ScrollView>

      {/* Dynamic CTA at Bottom */}
      <BottomActionBar 
        actionState={competition?.actionState}
        userState={competition?.userState}
        onAction={handleAction}
        loading={actionLoading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 20 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  loadingText: { marginTop: 10, color: '#64748B', fontSize: 13, fontWeight: '500' }
});