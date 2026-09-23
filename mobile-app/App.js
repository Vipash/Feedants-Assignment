import React, { useState, useEffect, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  RefreshControl,
  TouchableOpacity,
  StatusBar
} from 'react-native';

// Components
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

const API_BASE_URL = 'http://10.78.55.113:5000/api/v1/competitions';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [competition, setCompetition] = useState(null);
  const [language, setLanguage] = useState('ENG');
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeNavTab, setActiveNavTab] = useState('Competitions');

  // 1. Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      const data = await res.json();
      if (data?.success && data.data.length > 0) {
        setUsers(data.data);
        if (!currentUser) {
          setCurrentUser(data.data[0]);
        }
      }
    } catch (e) {
      console.warn('Could not load users list:', e.message);
    }
  };

  // 2. Dynamically fetch primary competition
  const fetchCompetition = useCallback(async (activeUserId) => {
    try {
      const headers = activeUserId ? { 'x-user-id': activeUserId } : {};
      const res = await fetch(`${API_BASE_URL}/primary`, { headers });
      const data = await res.json();
      if (data?.success) {
        setCompetition(data.data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      Alert.alert('Connection Error', 'Could not load competition. Ensure backend is running.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
    fetchCompetition();
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchCompetition(currentUser._id);
    }
  }, [currentUser, fetchCompetition]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchUsers();
    fetchCompetition(currentUser?._id);
  };

  // Handle Creating a New Guest User
  const handleAddNewUser = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/new`, { method: 'POST' });
      const data = await res.json();
      if (data?.success) {
        const newUser = data.data;
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        Alert.alert('New User Created', `Switched to ${newUser.name} (Unregistered). Ready to test registration!`);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to create new guest user.');
    }
  };

  // Handle Instant Demo Reset
  const handleResetDemo = async () => {
    if (!competition?._id) return;
    try {
      const res = await fetch(`${API_BASE_URL}/${competition._id}/reset-demo`, { method: 'POST' });
      const data = await res.json();
      Alert.alert('Demo State Reset', data.message || 'Reset complete');
      await fetchUsers();

      const resUsers = await fetch(`${API_BASE_URL}/users`);
      const dataUsers = await resUsers.json();
      if (dataUsers?.success) {
        const rohit = dataUsers.data.find(u => u.name.includes('Rohit'));
        if (rohit) setCurrentUser(rohit);
        fetchCompetition(rohit?._id);
      }
    } catch (e) {
      Alert.alert('Error', 'Failed to reset demo state.');
    }
  };

  // Handle CTA Action
  const handleAction = async () => {
    const action = competition?.actionState?.action;
    const compId = competition?._id;

    if (!currentUser || !compId) return;

    if (action === 'REGISTER') {
      setActionLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/${compId}/register`, {
          method: 'POST',
          headers: { 'x-user-id': currentUser._id, 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        Alert.alert('Success 🎉', data.message || 'Registered successfully!');
        fetchCompetition(currentUser._id);
      } catch (err) {
        Alert.alert('Notice', 'Registration failed');
      } finally {
        setActionLoading(false);
      }
    } else if (action === 'SUBMIT') {
      setActionLoading(true);
      try {
        await fetch(`${API_BASE_URL}/${compId}/submit`, {
          method: 'POST',
          headers: { 'x-user-id': currentUser._id, 'Content-Type': 'application/json' },
          body: JSON.stringify({ mediaUrl: 'https://feedants.com/uploads/classical_dance_submission.mp4' })
        });
        Alert.alert('Submitted 🚀', 'Submission uploaded successfully!');
        fetchCompetition(currentUser._id);
      } catch (err) {
        Alert.alert('Error', 'Submission failed');
      } finally {
        setActionLoading(false);
      }
    } else if (action === 'VIEW_SUBMISSION') {
      Alert.alert('Submission Details', 'Your video has been recorded and is in queue for judging.');
    }
  };

  const renderTabContent = () => {
    if (activeNavTab !== 'Competitions') {
      return (
        <View style={styles.placeholderContainer}>
          <Text style={styles.feedantsBrand}>FEEDANTS</Text>
          <Text style={styles.placeholderTitle}>{activeNavTab} Feed</Text>
          <Text style={styles.placeholderSub}>
            Welcome to Feedants! Explore creative talents and events.
          </Text>
          <TouchableOpacity 
            style={styles.returnBtn} 
            onPress={() => setActiveNavTab('Competitions')}
          >
            <Text style={styles.returnBtnText}>← Back to Classical Dance Competition</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <>
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
            onGoBack={() => setActiveNavTab('Home')}
          />

          <PricingCard 
            prizePool={competition?.prizePool}
            entryFee={competition?.entryFee}
            totalCapacity={competition?.totalCapacity}
            bookedSpots={competition?.bookedSpots}
            remainingSpots={competition?.remainingSpots}
            language={language}
          />

          <JudgeCard judge={competition?.judge} language={language} />

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

        <BottomActionBar 
          actionState={competition?.actionState}
          userState={competition?.userState}
          onAction={handleAction}
          loading={actionLoading}
          language={language}
        />
      </>
    );
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

      {renderTabContent()}

      <BottomNavBar 
        activeTab={activeNavTab}
        onSelectTab={setActiveNavTab}
        language={language}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  scroll: {
    paddingBottom: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600'
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#F8FAFC'
  },
  feedantsBrand: {
    fontSize: 14,
    fontWeight: '900',
    color: '#0D9488',
    letterSpacing: 2,
    marginBottom: 8
  },
  placeholderTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 8
  },
  placeholderSub: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20
  },
  returnBtn: {
    backgroundColor: '#0D9488',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10
  },
  returnBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14
  }
});