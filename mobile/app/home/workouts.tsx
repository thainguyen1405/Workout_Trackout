import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getProfileByUserId } from '../../api';
import { getUserId } from '../../api/auth';
import { COLORS, FONT_FAMILIES } from '../../constants/theme';

export default function Workouts() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('Workouts');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const profile = await getProfileByUserId(userId);
        setDisplayName(profile.displayName || 'Workouts');
        setAvatarUrl(profile.avatarUrl || null);
      }
    } catch (error) {
      console.log('No profile found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.userInfo}>
          {avatarUrl ? (
            <Image source={{uri: avatarUrl}} style={styles.avatarImage} />
          ) : (
            <Ionicons name="person-circle" size={32} color="#000000"/>
          )}
          <Text style={styles.appTitle} numberOfLines={1}>{loading ? 'Loading...' : displayName}</Text>
        </View>
        <View style={styles.topBarIcons}>
          <Ionicons name="notifications-outline" size={24} color="#000000" style={{marginRight: 16}} />
          <Ionicons name="settings-outline" size={24} color="#000000" />
        </View>
      </View>
      
      {/* Separator Line */}
      <View style={styles.separator} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* My Workouts Section */}
        <Text style={styles.sectionTitle}>My Workouts</Text>
        <Text style={styles.sectionSubtitle}>Track your progress and stay motivated</Text>
        <TouchableOpacity style={styles.logWorkoutButton}>
          <Text style={styles.logWorkoutButtonText}>Log Workout</Text>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={18} color="#000000" style={{marginLeft: 8}} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search workouts..."
            placeholderTextColor="#BDBDBD"
          />
        </View>

        {/* Workout Cards */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconPlaceholder} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.workoutName}>Upper Body Strength</Text>
              <Text style={styles.workoutDate}>MM DD, YYYY • 00:00 AM</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={16} color="#fff" style={{marginRight: 4}} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardDetailsRow}>
            <Ionicons name="location-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>Workout Location</Text>
            <View style={styles.dot} />
            <Ionicons name="time-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>75 minutes</Text>
            <View style={styles.dot} />
            <Ionicons name="eye-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>Public</Text>
          </View>
          <Text style={styles.cardDescription}>
            *Lorem ipsum dolor sit amet, consectetur adipiscing elit.*
          </Text>
        </View>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.cardIconPlaceholder} />
            <View style={styles.cardHeaderText}>
              <Text style={styles.workoutName}>Cardio</Text>
              <Text style={styles.workoutDate}>MM DD, YYYY • 00:00 AM</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={16} color="#fff" style={{marginRight: 4}} />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardDetailsRow}>
            <Ionicons name="location-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>Workout Location</Text>
            <View style={styles.dot} />
            <Ionicons name="time-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>75 minutes</Text>
            <View style={styles.dot} />
            <Ionicons name="eye-outline" size={16} color="#000000" />
            <Text style={styles.cardDetailText}>Public</Text>
          </View>
          <Text style={styles.cardDescription}>
            *Lorem ipsum dolor sit amet, consectetur adipiscing elit.*
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 75,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 24,
  },
  appTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILIES.semiBold,
    color: '#000000',
    marginLeft: 10,
    flex: 1,
  },
  topBarIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 24,
    fontFamily: FONT_FAMILIES.semiBold,
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    marginBottom: 12,
  },
  logWorkoutButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 18,
  },
  logWorkoutButtonText: {
    color: '#000',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    height: 40,
  },
  searchBar: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontSize: 15,
    color: '#222',
    backgroundColor: 'transparent',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIconPlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  cardHeaderText: {
    flex: 1,
  },
  workoutName: {
    fontWeight: 'bold',
    fontFamily: 'Montserrat_700SemiBold',
    fontSize: 16,
    color: '#000000',
  },
  workoutDate: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    marginTop: 2,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 8,
  },
  editButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
  },
  cardDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardDetailText: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    marginHorizontal: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#BDBDBD',
    marginHorizontal: 4,
  },
  cardDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    fontStyle: 'italic',
    marginTop: 4,
  },
});