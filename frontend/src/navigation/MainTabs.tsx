import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import AnalyticsScreen from "../screens/AnalyticsScreen";
import ActivityScreen from "../screens/ActivityScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const tabBarOptions = {
  headerShown: false,
  tabBarStyle: {
    backgroundColor: "#FFFFFF",
    borderTopColor: "#E8E0CE",
    borderTopWidth: 1,
    paddingBottom: 8,
    paddingTop: 8,
    height: 72,
  },
  tabBarActiveTintColor: "#BF1A1A",
  tabBarInactiveTintColor: "#7A5555",
};

const icons: Record<string, { name: string; size: number }> = {
  Home: { name: "home", size: 20 },
  Analytics: { name: "chart-bar", size: 20 },
  Activity: { name: "bell", size: 20 },
  Profile: { name: "user", size: 20 },
};

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      ...tabBarOptions,
      tabBarIcon: ({ color, focused }) => {
        const icon = icons[route.name];
        return (
          <FontAwesome5
            name={icon.name}
            size={focused ? icon.size * 1.15 : icon.size}
            color={color}
          />
        );
      },
      tabBarLabelStyle: { fontSize: 12, fontWeight: "600" },
      tabBarHideOnKeyboard: true,
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Analytics" component={AnalyticsScreen} />
      <Tab.Screen name="Activity" component={ActivityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
