import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; // Or your preferred icon library
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, // Hides the header at the top of the screen
        tabBarActiveTintColor: '#000', // Color for the active icon and label (black)
        tabBarInactiveTintColor: '#000000', // Color for inactive icons and labels (black)
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 20,
          right: 20,
          borderRadius: 0,
          height: 80,
          backgroundColor: '#FFFFFF', // The white background of the bar
          borderTopWidth: 0, // Removes the default top border
          elevation: 5, // Shadow for Android
          shadowColor: '#000', // Shadow for iOS
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
        },
        tabBarItemStyle: {
          borderRadius: 20,
          margin: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5, // Adjust as needed to move label closer to icon
          paddingBottom: 5,
        },
        tabBarActiveBackgroundColor: '#fff', // The white background for the active tab
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'star' : 'star-outline'} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="partners"
        options={{
          title: 'Partners',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-group-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}