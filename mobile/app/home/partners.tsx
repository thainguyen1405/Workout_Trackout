import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getProfileByUserId } from '../../api';
import { getUserId } from '../../api/auth';
import { COLORS, FONT_FAMILIES } from '../../constants/theme';

export default function Partners() {
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('Partners');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('My Partners');
  const [maxDistance, setMaxDistance] = useState(15);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = await getUserId();
      if (userId) {
        const profile = await getProfileByUserId(userId);
        setDisplayName(profile.displayName || 'Partners');
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
        {/* Workout Partners Section */}
        <Text style={styles.sectionTitle}>Workout Partners</Text>
        <Text style={styles.sectionSubtitle}>Connect with like minded fitness enthusiasts</Text>
        <View style={styles.activePartnersRow}>
          <Ionicons name="people-outline" size={16} color="#000000" style={{marginRight: 4}} />
          <Text style={styles.activePartnersText}>0 active partners</Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'My Partners' && styles.tabActive]}
            onPress={() => setActiveTab('My Partners')}
          >
            <Text style={[styles.tabLabel, activeTab === 'My Partners' && styles.tabLabelActive]}>My Partners</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Find Partners' && styles.tabActive]}
            onPress={() => setActiveTab('Find Partners')}
          >
            <Text style={[styles.tabLabel, activeTab === 'Find Partners' && styles.tabLabelActive]}>Find Partners</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'Requests' && styles.tabActive]}
            onPress={() => setActiveTab('Requests')}
          >
            <Text style={[styles.tabLabel, activeTab === 'Requests' && styles.tabLabelActive]}>Requests</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'My Partners' && (
          <View style={styles.emptyCard}>
            <Ionicons name="people-outline" size={48} color="#BDBDBD" style={{marginBottom: 10}} />
            <Text style={styles.emptyTitle}>No workout partners yet</Text>
            <Text style={styles.emptySubtitle}>Start connecting with other fitness enthusiasts to stay motivated!</Text>
            <TouchableOpacity style={styles.findPartnerButton}>
              <Text style={styles.findPartnerButtonText}>Find Your First Partner</Text>
            </TouchableOpacity>
          </View>
        )}
        {activeTab === 'Find Partners' && (
          <>
            {/* Search Bar */}
            <View style={styles.searchBarContainer}>
              <Ionicons name="search-outline" size={18} color="#000000" style={{marginLeft: 8}} />
              <TextInput
                style={styles.searchBar}
                placeholder="Search by name, location, or workout type"
                placeholderTextColor="#BDBDBD"
              />
            </View>
            
            {/* Location Section */}
            <View style={styles.locationCard}>
              <View style={styles.locationRow}>
                <Ionicons name="location" size={18} color="#000000" style={{marginRight: 6}} />
                <Text style={styles.locationText}>Location enabled</Text>
              </View>
              <View style={styles.distanceRow}>
                <Text style={styles.distanceLabel}>Max distance</Text>
                <Text style={styles.distanceValue}>{maxDistance} miles</Text>
              </View>
              <View style={styles.sliderContainer}>
                <View style={styles.sliderTrack}>
                  <View style={[styles.sliderFill, { width: `${(maxDistance / 50) * 100}%` }]} />
                </View>
              </View>
            </View>
            
            {/* Partner Cards */}
            <View style={styles.partnerCard}>
              <View style={styles.partnerCardHeader}>
                <Image source={{uri: 'https://randomuser.me/api/portraits/men/1.jpg'}} style={styles.avatar} />
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>First Name Last Name</Text>
                  <Text style={styles.partnerLocation}>Fitness level</Text>
                </View>
                <TouchableOpacity style={styles.connectButton}>
                  <Ionicons name="person-add" size={16} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.partnerDetailsRow}>
                <Ionicons name="location-outline" size={16} color="#000000" style={{marginRight: 4}} />
                <Text style={styles.partnerDetailText}>Workout Location</Text>
              </View>
              <View style={styles.partnerTagsRow}>
                <View style={styles.tagWithIcon}>
                  <Ionicons name="time-outline" size={14} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.partnerTag}>Endurance Challenges</Text>
                </View>
                <View style={styles.tagWithIcon}>
                  <Ionicons name="list-outline" size={14} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.partnerTag}>Workout Goals</Text>
                </View>
              </View>
              <View style={styles.partnerDescriptionBox}>
                <Text style={styles.partnerDescription}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, massa ac maximus condimentum, lectus purus placerat risus, placerat tincidunt massa. Donec ac!"
                </Text>
              </View>
            </View>
            <View style={styles.partnerCard}>
              <View style={styles.partnerCardHeader}>
                <Image source={{uri: 'https://randomuser.me/api/portraits/women/2.jpg'}} style={styles.avatar} />
                <View style={styles.partnerInfo}>
                  <Text style={styles.partnerName}>First Name Last Name</Text>
                  <Text style={styles.partnerLocation}>Fitness level</Text>
                </View>
                <TouchableOpacity style={styles.connectButton}>
                  <Ionicons name="person-add" size={16} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.connectButtonText}>Connect</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.partnerDetailsRow}>
                <Ionicons name="location-outline" size={16} color="#000000" style={{marginRight: 4}} />
                <Text style={styles.partnerDetailText}>Workout Location</Text>
              </View>
              <View style={styles.partnerTagsRow}>
                <View style={styles.tagWithIcon}>
                  <Ionicons name="time-outline" size={14} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.partnerTag}>Endurance Challenges</Text>
                </View>
                <View style={styles.tagWithIcon}>
                  <Ionicons name="list-outline" size={14} color="#000000" style={{marginRight: 4}} />
                  <Text style={styles.partnerTag}>Workout Goals</Text>
                </View>
              </View>
              <View style={styles.partnerDescriptionBox}>
                <Text style={styles.partnerDescription}>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean gravida, massa ac maximus condimentum, lectus purus placerat risus, placerat tincidunt massa. Donec ac!"
                </Text>
              </View>
            </View>
          </>
        )}
        {activeTab === 'Requests' && (
          <View style={styles.emptyCard}>
            <Ionicons name="mail-outline" size={48} color="#BDBDBD" style={{marginBottom: 10}} />
            <Text style={styles.emptyTitle}>No pending requests</Text>
            <Text style={styles.emptySubtitle}>When someone wants to be your workout partner, their requests will appear here.</Text>
          </View>
        )}
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
  sectionTitle: {
    fontSize: 22,
    fontFamily: FONT_FAMILIES.semiBold,
    color: '#000000',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    marginBottom: 8,
  },
  activePartnersRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  activePartnersText: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
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
  locationCard: {
    backgroundColor: '#E8E8F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    fontFamily: 'Montserrat_500SemiBold',
    color: '#000000',
  },
  distanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  distanceLabel: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    color: '#757575',
  },
  distanceValue: {
    fontSize: 13,
    fontFamily: 'Montserrat_500SemiBold',
    color: '#000000',
  },
  sliderContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  sliderTrack: {
    width: '100%',
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  sliderFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  partnerCard: {
    backgroundColor: '#E8E8F0',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginBottom: 16,
  },
  partnerCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0E0E0',
    marginRight: 12,
  },
  partnerInfo: {
    flex: 1,
  },
  partnerName: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
  },
  partnerLocation: {
    fontSize: 12,
    color: '#000000',
    marginTop: 2,
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
  },
  connectButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 13,
  },
  partnerDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  partnerDetailText: {
    fontSize: 13,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
  },
  partnerTagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  tagWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  partnerTag: {
    fontSize: 12,
    fontFamily: 'Montserrat_500SemiBold',
    color: '#000000',
  },
  partnerDescriptionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  partnerDescription: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#000000',
    fontStyle: 'italic',
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 18,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#000000',
    marginBottom: 50,
    textAlign: 'center',
  },
  findPartnerButton: {
    backgroundColor: COLORS.accent,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    color: '#000000',
  },
  findPartnerButtonText: {
    color: '#000000',
    fontWeight: '600',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
  },
});