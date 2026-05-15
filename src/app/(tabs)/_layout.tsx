import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabLayout() {
  return (
    <SafeAreaView className="flex-1" edges={['top']}>
      <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen
          name="characters"
          options={{
            title: 'Characters',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="user" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: 'Settings',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesome size={28} name="heart" color={color} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
}
