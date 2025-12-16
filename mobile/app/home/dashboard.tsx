import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getProfileByUserId } from '../../api';
import { getUserId } from '../../api/auth';
import { COLORS, FONT_FAMILIES } from '../../constants/theme';

const windowWidth = Dimensions.get('window').width;

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('User');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const profile = await getProfileByUserId(userId);
        setDisplayName(profile.displayName || 'User');
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

      {/* Welcome Section */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Welcome back, {displayName}!</Text>
          <Text style={styles.welcomeSubtitle}>Ready to crush your fitness goals today?</Text>
          <TouchableOpacity style={styles.logWorkoutButton}>
            <Text style={styles.logWorkoutButtonText}>Log Workout</Text>
          </TouchableOpacity>
        </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
      
        {/* Recent Workouts Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Recent Workouts</Text>
            <TouchableOpacity>
              <Text style={styles.cardViewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          {/* Workout List */}
          <View style={styles.workoutItem}>
            <View style={styles.workoutImagePlaceholder} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>Upper Body Strength</Text>
              <Text style={styles.workoutMeta}>Sept. 09, 2025   45 min.   <Ionicons name="flash-outline" size={14} color="#757575" /> 4/10</Text>
            </View>
          </View>
          <View style={styles.workoutItem}>
            <View style={styles.workoutImagePlaceholder} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>Cardio</Text>
              <Text style={styles.workoutMeta}>Sept. 07, 2025   25 min.   <Ionicons name="flash-outline" size={14} color="#757575" /> 9/10</Text>
            </View>
          </View>
          <View style={styles.workoutItem}>
            <View style={styles.workoutImagePlaceholder} />
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>Yoga</Text>
              <Text style={styles.workoutMeta}>Sept. 04, 2025   60 min.   <Ionicons name="flash-outline" size={14} color="#757575" /> 4/10</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  welcome: {
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
    width: windowWidth,
  },
  welcomeTitle: {
    fontSize: 20,
    fontFamily: FONT_FAMILIES.semiBold,
    color: '#000000',
    marginBottom: 10,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#757575',
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
    fontSize: 16,
    fontFamily: 'Montserrat_600SemiBold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 20,
    width: windowWidth - 40,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardViewAll: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 13,
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#757575',
    borderWidth: 0.2,
    padding: 15,
  },
  workoutImagePlaceholder: {
    width: 38,
    height: 38,
    borderRadius: 8,
    backgroundColor: '#000000',
    marginRight: 12,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  workoutMeta: {
    fontSize: 12,
    color: '#000000',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
});