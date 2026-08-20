import { Tabs } from 'expo-router';
import { Colors, Typography } from '../../src/theme';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { 
        backgroundColor: Colors.surface, 
        borderTopWidth: 1, 
        borderTopColor: Colors.outlineVariant,
        height: Platform.OS === 'ios' ? 85 : 65,
        paddingBottom: Platform.OS === 'ios' ? 25 : 10,
        paddingTop: 10,
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.onSurfaceVariant,
      tabBarLabelStyle: {
        fontFamily: Typography.fonts.body,
        fontSize: 12,
        fontWeight: '600',
      }
    }}>
      <Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: () => null }} />
      <Tabs.Screen name="discover" options={{ title: 'Explore', tabBarIcon: () => null }} />
      <Tabs.Screen name="create" options={{ title: 'Create', tabBarIcon: () => null }} />
      <Tabs.Screen name="activity" options={{ title: 'Activity', tabBarIcon: () => null }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: () => null }} />
    </Tabs>
  );
}
