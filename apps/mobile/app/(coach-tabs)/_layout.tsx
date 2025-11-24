import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { LayoutDashboard, Users, Zap, MessageSquare } from 'lucide-react-native';

export default function CoachTabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: Colors.light.card,
                    borderTopColor: Colors.light.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: Colors.light.tint,
                tabBarInactiveTintColor: Colors.light.mutedForeground,
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
                    title: 'Overview',
                    tabBarIcon: ({ color, size }) => <LayoutDashboard color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="athletes"
                options={{
                    title: 'Athletes',
                    tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="session"
                options={{
                    title: 'Live Session',
                    tabBarIcon: ({ color, size }) => <Zap color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="inbox"
                options={{
                    title: 'Inbox',
                    tabBarIcon: ({ color, size }) => <MessageSquare color={color} size={size} />,
                }}
            />
        </Tabs>
    );
}
