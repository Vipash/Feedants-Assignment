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
  Alert,
  StatusBar 
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
import BottomNavBar from './src/components/BottomNavBar';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [competitionId, setCompetitionId] = useState(null);
  const [language, setLanguage] = useState('ENG');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState('Competitions');

  // 1. Initial Load: Fetch Users & Initial Competition
  const initialize = async () => {
    try {
      const usersRes = await apiClient.get('/users');
      if (usersRes.data?.success && usersRes.data.data.length > 0) {
        setUsers(usersRes.data.data);
        setCurrentUser(usersRes.data.data[0]); // default to User A
      }
    } catch (e) {
      console.warn('Could not load users list:', e.message);
    }
  };

  // 2. Fetch Competition Details
  const fetchCompetition = useCallback(async (activeUserId) => {
    try {
      const headers = activeUserId ? { 'x-user-id': activeUserId } : {};
      // Fetch latest competition if ID not yet known
      const url = competitionId ? `/${competitionId}` : '/users';
      
      let compId = competitionId;
      if (!compId) {
        // Find seed competition ID from your database
        const checkRes = await apiClient.get('/users');
        // Fallback default ID if needed
        compId = '6ab264c3dfe2d14ecdda0b1b';
        setCompetitionId(compId);
      }

      const res = await apiClient.get(`/${compId}`, { headers });
      if (res.data?.success) {
        setCompetition(res.data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [competitionId]);

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchCompetition(currentUser._id);
    }
  }, [currentUser, fetchCompetition]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCompetition(currentUser?._id);
  };

  // Handle Creating a New Unregistered Guest User
  const handleAddNewUser = async () => {
    try {
      const res = await apiClient.post('/users/new');
      if (res.data?.success) {
        const newUser = res.data.data;
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        Alert.alert('New User Created', `Switched to ${newUser.name} (Unregistered). You can now test registration!`);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to create new guest user.');
    }
  };

  // Handle Resetting Demo State
  const handleResetDemo = async () => {
    if (!competitionId) return;
    try {
      const res = await apiClient.post(`/${competitionId}/reset-demo`);
      Alert.alert('Demo Reset', res.data.message || 'Reset complete');
      // Set to User B (Rohit Mehta) to test registration
      const rohit = users.find(u => u.name.includes('Rohit'));
      if (rohit) setCurrentUser(rohit);
      fetchCompetition(rohit?._id);
    } catch (e) {
      Alert.alert('Error', 'Failed to reset demo state.');
    }
  };

  // Handle Bottom CTA Action (Register / Submit)
  const handleAction = async () => {
    const action = competition?.actionState?.action;
    if (!currentUser) return;

    if (action === 'REGISTER') {
      setActionLoading(true);
      try {
        const res = await apiClient.post(
          `/${competitionId}/register`,
          {},
          { headers: { 'x-user-id': currentUser._id } }
        );
        Alert.alert('Success 🎉', res.data.message || 'Registered successfully!');
        fetchCompetition(currentUser._id);
      } catch (err) {
        Alert.alert('Notice', err.response?.data?.message || 'Registration failed');
      } finally {
        setActionLoading(false);
      }
    } else if (action === 'SUBMIT') {
      setActionLoading(true);
      try {
        const res = await apiClient.post(
          `/${competitionId}/submit`,
          { mediaUrl: 'https://feedants.com/uploads/classical_dance_entry.mp4' },
          { headers: { 'x-user-id': currentUser._id } }
        );
        Alert.alert('Submitted 🚀', 'Submission uploaded successfully!');
        fetchCompetition(currentUser._id);
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

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView 
        contentContainerStyle={styles.scroll}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Header 
          title={competition?.title}
          isRegistered={competition?.userState?.isRegistered}
          language={language}
          onToggleLanguage={setLanguage}
          currentUser={currentUser}
          users={users}
          onSelectUser={setCurrentUser}
          onAddNewUser={handleAddNewUser}
          onResetDemo={handleResetDemo}
        />

        <PricingCard 
          prizePool={competition?.prizePool}
          entryFee={competition?.entryFee}
          totalCapacity={competition?.totalCapacity}
          bookedSpots={competition?.bookedSpots}
          remainingSpots={competition?.remainingSpots}
          language={language}
        />

        <JudgeCard judge={competition?.judge} />

        <CountdownTimer 
          targetDate={competition?.registrationEndDate} 
          language={language}
        />

        <ImportantDates 
          registrationEnd={competition?.registrationEndDate}
          submissionStart={competition?.submissionStartDate}
          submissionEnd={competition?.submissionEndDate}
          resultDate={competition?.resultDate}
          language={language}
        />

        <PreviousWinners 
          winners={competition?.previousWinners} 
          language={language}
        />

        <TabbedDetails 
          description={competition?.description}
          parameters={competition?.judgingParameters}
          rules={competition?.rulesAndEligibility}
          language={language}
        />

        <RewardsBreakdown 
          rewards={competition?.rewards} 
          language={language}
        />

        <TrustAndReferral 
          referralCode={currentUser?.referralCode} 
          language={language}
        />
      </ScrollView>

      {/* Floating Sticky CTA */}
      <BottomActionBar 
        actionState={competition?.actionState}
        userState={competition?.userState}
        onAction={handleAction}
        loading={actionLoading}
        language={language}
      />

      {/* Bottom App Navigation Bar */}
      <BottomNavBar 
        activeTab={activeNavTab}
        onSelectTab={setActiveNavTab}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  scroll: { paddingBottom: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' },
  loadingText: { marginTop: 10, color: '#64748B', fontSize: 13, fontWeight: '500' }
});