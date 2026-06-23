import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Routes } from '../constants/routes';
import { Colors } from '../constants/colors';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: '#FFFFFF', 
          borderTopColor: '#E8E0CE',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarIcon: ({ color, focused }) => {
          let iconName: keyof typeof Feather.glyphMap = 'home';

          if (route.name === Routes.app.home) {
            iconName = 'home';
          } else if (route.name === Routes.app.analytics) {
            iconName = 'bar-chart-2';
          } else if (route.name === Routes.app.activity) {
            iconName = 'bell';
          } else if (route.name === Routes.app.profile) {
            iconName = 'user';
          }

          return (
            <Feather 
              name={iconName} 
              size={20} 
              color={color} 
              style={{
                transform: [{ scale: focused ? 1.15 : 1.0 }],
              }}
            />
          );
        },
      })}
    >
      <Tab.Screen name={Routes.app.home} component={HomeScreen} options={{ tabBarLabel: 'Home' }} />
      <Tab.Screen name={Routes.app.analytics} component={AnalyticsScreen} options={{ tabBarLabel: 'Analytics' }} />
      <Tab.Screen name={Routes.app.activity} component={ActivityScreen} options={{ tabBarLabel: 'Activity' }} />
      <Tab.Screen name={Routes.app.profile} component={ProfileScreen} options={{ tabBarLabel: 'Profile' }} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
