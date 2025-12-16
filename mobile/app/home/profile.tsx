import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { createPreference, createProfile, getPreferenceByUserId, getProfileByUserId, updatePreference, updateProfile } from '../../api';
import { getUserId, logout } from '../../api/auth';
import { COLORS, FONT_FAMILIES } from '../../constants/theme';

const fitnessLevels = [
  'Beginner (0 - 1 years)',
  'Intermediate (1 - 3 years)',
  'Advanced (3+ years)'
];
const workoutTypes = [
  'Strength Training', 'Cardio', 'Yoga', 'Pilates', 'Running', 'Cycling', 'Swimming', 'CrossFit', 'Martial Arts', 'Dance', 'Basketball', 'Pickleball', 'Football'
];
const workoutGoals = [
  'Weight Loss', 'Muscle Gain', 'Endurance', 'Flexibility', 'General Fitness', 'Competition Prep'
];
const workoutTimes = [
  'Early Morning (5:00 AM - 7:00 AM)',
  'Morning (7:00 - 9:00 AM)',
  'Afternoon (12:00 PM - 5:00 PM)',
  'Evening (6:00 PM - 9:00 PM)',
  'Night (9:00 PM - 11:00 PM)'
];

export default function Profile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Profile state
  const [userId, setUserId] = useState<string | null>(null);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState(fitnessLevels[0]);
  const [yearsExperience, setYearsExperience] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [allowPartners, setAllowPartners] = useState(false);

  // Load profile and preferences on mount
  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      const currentUserId = await getUserId();
      if (!currentUserId) {
        Alert.alert('Error', 'Please sign in to view your profile');
        return;
      }
      setUserId(currentUserId);

      // Fetch profile
      try {
        const profileData = await getProfileByUserId(currentUserId);
        setProfileId(profileData._id);
        setDisplayName(profileData.displayName || '');
        setAvatarUrl(profileData.avatarUrl || null);
        setBio(profileData.bio || '');
        setLocation(profileData.gymName || '');
      } catch (error: any) {
        // Profile doesn't exist yet - will create on save
        console.log('No profile found, will create on save');
      }

      // Fetch preferences
      try {
        const preferenceData = await getPreferenceByUserId(currentUserId);
        setPreferenceId(preferenceData._id);
        setSelectedTypes(preferenceData.types || []);
        setSelectedGoals(preferenceData.goals || []);
        setSelectedTimes(preferenceData.preferredTimes || []);
      } catch (error: any) {
        // Preferences don't exist yet - will create on save
        console.log('No preferences found, will create on save');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (permissionResult.granted === false) {
        Alert.alert('Permission Required', 'You need to allow access to your photos');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setAvatarUrl(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/auth/sign-in');
          }
        }
      ]
    );
  };

  const toggleSelection = (item: string, selected: string[], setSelected: (value: string[]) => void) => {
    const newSelection = selected.includes(item)
      ? selected.filter(i => i !== item)
      : [...selected, item];
    setSelected(newSelection);
  };

  // Auto-save preferences when they change
  useEffect(() => {
    if (!loading && userId && preferenceId) {
      savePreferences();
    }
  }, [selectedTypes, selectedGoals, selectedTimes]);

  const savePreferences = async () => {
    if (!userId) return;

    try {
      const preferenceData = {
        types: selectedTypes,
        goals: selectedGoals,
        preferredTimes: selectedTimes,
      };

      if (preferenceId) {
        await updatePreference(preferenceId, preferenceData);
      } else {
        const created = await createPreference({ userId, ...preferenceData });
        setPreferenceId(created._id);
      }
    } catch (error: any) {
      console.log('Failed to save preferences:', error.message);
    }
  };

  const handleSaveProfile = async () => {
    if (!userId) {
      Alert.alert('Error', 'Please sign in to save your profile');
      return;
    }

    if (!displayName.trim()) {
      Alert.alert('Error', 'Display name is required');
      return;
    }

    try {
      setSaving(true);
      const profileData = {
        displayName: displayName.trim(),
        avatarUrl: avatarUrl || '',
        bio: bio.trim(),
        gymName: location.trim(),
        privacy: allowPartners ? 'public' : 'private',
      };

      if (profileId) {
        await updateProfile(profileId, profileData);
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        const created = await createProfile({ userId, ...profileData });
        setProfileId(created._id);
        Alert.alert('Success', 'Profile created successfully');
      }

      // Save preferences
      await savePreferences();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.appTitle}>{displayName || 'Profile'}</Text>
        <View style={styles.topBarIcons}>
          <TouchableOpacity onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={22} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Separator Line */}
      <View style={styles.separator} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <>
        {/* Profile Picture Section */}
        <View style={styles.profilePicContainer}>
          <View style={styles.profilePicSection}>
            {avatarUrl ? (
              <Image source={{uri: avatarUrl}} style={styles.profilePic} />
            ) : (
              <View style={styles.profilePicPlaceholder}>
                <Ionicons name="person" size={50} color="#9E9E9E" />
              </View>
            )}
            <TouchableOpacity style={styles.editPicButton} onPress={handleImagePicker}>
              <Ionicons name="camera-outline" size={24} color="#666666" />
            </TouchableOpacity>
          </View>
        </View>
        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity style={[styles.tab, activeTab === 'Profile' && styles.tabActive]} onPress={() => setActiveTab('Profile')}>
            <Text style={[styles.tabLabel, activeTab === 'Profile' && styles.tabLabelActive]}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Goals' && styles.tabActive]} onPress={() => setActiveTab('Goals')}>
            <Text style={[styles.tabLabel, activeTab === 'Goals' && styles.tabLabelActive]}>Goals</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Progress' && styles.tabActive]} onPress={() => setActiveTab('Progress')}>
            <Text style={[styles.tabLabel, activeTab === 'Progress' && styles.tabLabelActive]}>Progress</Text>
          </TouchableOpacity>
        </View>
        {/* Profile Form */}
        {activeTab === 'Profile' && (
          <View style={styles.formSection}>
            <Text style={styles.label}>Display Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Your name"
              placeholderTextColor="#BDBDBD"
              value={displayName}
              onChangeText={setDisplayName}
              editable={!saving}
            />
            <Text style={styles.label}>Bio</Text>
            <TextInput
              style={styles.input}
              placeholder="Tell others about your fitness journey..."
              placeholderTextColor="#BDBDBD"
              value={bio}
              onChangeText={setBio}
              multiline
            />
            <Text style={styles.label}>Fitness Level</Text>
            <View style={styles.selectBox}>
              <TextInput
                style={styles.input}
                value={fitnessLevel}
                editable={false}
              />
              {/* You can implement a picker here if needed */}
            </View>
            <Text style={styles.label}>Years of Experience</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#BDBDBD"
              value={yearsExperience}
              onChangeText={setYearsExperience}
              keyboardType="numeric"
            />
            <Text style={styles.label}>Primary Gym/Workout Location</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. LA Fitness, Planet Fitness, Home Gym"
              placeholderTextColor="#BDBDBD"
              value={location}
              onChangeText={setLocation}
            />
            <Text style={styles.label}>Preferred Workout Types</Text>
            <View style={styles.checkboxGrid}>
              {workoutTypes.map(type => (
                <TouchableOpacity
                  key={type}
                  style={styles.checkboxRow}
                  onPress={() => toggleSelection(type, selectedTypes, setSelectedTypes)}
                >
                  <Ionicons
                    name={selectedTypes.includes(type) ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={selectedTypes.includes(type) ? '#1976D2' : '#757575'}
                  />
                  <Text style={styles.checkboxLabel}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Workout Goals</Text>
            <View style={styles.checkboxGrid}>
              {workoutGoals.map(goal => (
                <TouchableOpacity
                  key={goal}
                  style={styles.checkboxRow}
                  onPress={() => toggleSelection(goal, selectedGoals, setSelectedGoals)}
                >
                  <Ionicons
                    name={selectedGoals.includes(goal) ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={selectedGoals.includes(goal) ? '#1976D2' : '#757575'}
                  />
                  <Text style={styles.checkboxLabel}>{goal}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.label}>Preferred Workout Times</Text>
            <View style={styles.checkboxList}>
              {workoutTimes.map(time => (
                <TouchableOpacity
                  key={time}
                  style={styles.checkboxRowFull}
                  onPress={() => toggleSelection(time, selectedTimes, setSelectedTimes)}
                >
                  <Ionicons
                    name={selectedTimes.includes(time) ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={selectedTimes.includes(time) ? '#1976D2' : '#757575'}
                  />
                  <Text style={styles.checkboxLabel}>{time}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.switchRow}>
              <TouchableOpacity onPress={() => setAllowPartners(!allowPartners)} style={[styles.switchBox, allowPartners && styles.switchBoxActive]}>
                <Ionicons
                  name={allowPartners ? 'checkmark-circle' : 'checkmark-circle-outline'}
                  size={24}
                  color={allowPartners ? '#000000' : '#757575'}
                  style={{marginRight: 8}}
                />
                <View style={{flex: 1}}>
                  <Text style={[styles.switchLabel, allowPartners && styles.switchLabelActive]}>I'm looking for workout partners</Text>
                  <Text style={[styles.switchSubLabel, allowPartners && styles.switchSubLabelActive]}>Allows others to find and connect with you as a workout partner.</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonRow}>
              <TouchableOpacity 
                style={[styles.saveButton, saving && styles.buttonDisabled]}
                onPress={handleSaveProfile}
                disabled={saving}
              >
                {saving ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <>
                    <Ionicons name="save-outline" size={18} color="#fff" style={{marginRight: 6}} />
                    <Text style={styles.saveButtonText}>Save Profile</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        </>
      )}
        {!loading && activeTab === 'Goals' && (
          <>
            {/* Current Goals Card */}
            <View style={styles.goalsCard}>
              <View style={styles.goalsCardHeader}>
                <Ionicons name="radio-button-on-outline" size={28} color="#000000" style={{marginRight: 10}} />
                <Text style={styles.goalsCardTitle}>Current Goals</Text>
              </View>
              <Text style={styles.goalsCardSubtitle}>No fitness goals set yet</Text>
              <TouchableOpacity style={styles.setGoalButton}>
                <Text style={styles.setGoalButtonText}>+ Set Your First Goal</Text>
              </TouchableOpacity>
            </View>
            {/* Goal Suggestions Section */}
            <View style={styles.suggestionsSectionHeader}>
              <Ionicons name="bookmark-outline" size={28} color="#000000" style={{marginRight: 10}} />
              <Text style={styles.suggestionsTitle}>Goal Suggestions</Text>
            </View>
            {/* Individual Suggestion Cards */}
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionIconContainer}>
                <Ionicons name="calendar-outline" size={32} color="#000000" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Workout Consistency</Text>
                <Text style={styles.suggestionDesc}>Exercise 4 times per week for the next month</Text>
              </View>
            </View>
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionIconContainer}>
                <MaterialCommunityIcons name="chart-line" size={32} color="#000000" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Strength Progress</Text>
                <Text style={styles.suggestionDesc}>Increase bench press by 10lbs in 6 weeks</Text>
              </View>
            </View>
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionIconContainer}>
                <Ionicons name="time-outline" size={32} color="#000000" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Endurance Challenge</Text>
                <Text style={styles.suggestionDesc}>Run a 5K without stopping in 8 weeks</Text>
              </View>
            </View>
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionIconContainer}>
                <Ionicons name="radio-button-on-outline" size={32} color="#000000" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Flexibility Focus</Text>
                <Text style={styles.suggestionDesc}>Attend yoga class twice weekly for flexibility</Text>
              </View>
            </View>
          </>
        )}
        {!loading && activeTab === 'Progress' && (
          <>
            <View style={styles.suggestionsSectionHeader}>
              <Ionicons name="bookmark-outline" size={28} color="#000000" style={{marginRight: 10}} />
              <Text style={styles.suggestionsTitle}>Workout Type Breakdown</Text>
            </View>
            <View style={styles.suggestionCard}>
              <View style={styles.suggestionIconContainer}>
                <Ionicons name="calendar-outline" size={32} color="#000000" />
              </View>
              <View style={styles.suggestionContent}>
                <Text style={styles.suggestionTitle}>Workout Consistency</Text>
                <Text style={styles.suggestionDesc}>Exercise 4 times per week for the next month</Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 32,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILIES.semiBold,
    color: '#222',
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  profilePicContainer: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 18,
  },
  profilePicSection: {
    alignItems: 'center',
    position: 'relative',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
  },
  editPicButton: {
    position: 'absolute',
    bottom: 0,
    right: -10,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#E8E8F0',
    borderRadius: 12,
    marginBottom: 18,
    padding: 4,
    justifyContent: 'space-between',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: 'transparent',
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tabLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat_500SemiBold',
    color: '#CCCCCC',
  },
  tabLabelActive: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#222',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: '#222',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectBox: {
    marginBottom: 6,
  },
  checkboxGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    marginBottom: 12,
  },
  checkboxList: {
    marginBottom: 12,
  },
  checkboxRowFull: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  checkboxLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#222',
    marginLeft: 8,
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  profilePicPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  switchRow: {
    marginTop: 12,
    marginBottom: 10,
  },
  switchBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  switchBoxActive: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  switchLabel: {
    fontSize: 14,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#222',
  },
  switchLabelActive: {
    color: '#000000',
  },
  switchSubLabel: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#757575',
    marginTop: 4,
  },
  switchSubLabelActive: {
    color: '#666666',
  },
  buttonRow: {
    marginTop: 16,
  },
  saveButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
  },
  goalsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 20,
  },
  goalsCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  goalsCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700SemiBold',
    color: '#000000',
  },
  goalsCardSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#757575',
    marginBottom: 16,
  },
  setGoalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  setGoalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
  },
  suggestionsSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700SemiBold',
    color: '#000000',
  },
  suggestionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  suggestionIconContainer: {
    marginRight: 16,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700SemiBold',
    color: '#000000',
    marginBottom: 4,
  },
  suggestionDesc: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    color: '#757575',
  },
});