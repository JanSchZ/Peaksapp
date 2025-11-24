import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Home, Calendar, PlusCircle, User } from 'lucide-react-native';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.dark.card,
                    borderTopColor: Colors.dark.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: Colors.dark.tint,
                tabBarInactiveTintColor: Colors.dark.mutedForeground,
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="plan"
                options={{
                    title: 'Plan',
                    tabBarIcon: ({ color, size }) => <Calendar color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="log"
                options={{
                    title: 'Log',
                    tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
