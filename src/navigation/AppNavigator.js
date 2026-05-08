import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { I18nManager, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import AssignmentsScreen from '../screens/AssignmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Enable RTL
I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

const Tab = createBottomTabNavigator();

const BottomTabBar = ({ state, descriptors, navigation }) => {
  const navItems = [
    { name: 'الرئيسية', icon: 'home', route: 'Home' },
    { name: 'المواد', icon: 'book-open', route: 'Subjects' },
    { name: 'الجدول', icon: 'calendar', route: 'Schedule' },
    { name: 'المهام', icon: 'clipboard', route: 'Assignments' },
    { name: 'حسابي', icon: 'user', route: 'Profile' },
  ];

  return (
    <View className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-[#E5DFD6] py-2 px-2 z-50" style={{ height: 72 }}>
      <View className="flex-row justify-around items-center">
        {navItems.map((item, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={item.route}
              onPress={() => navigation.navigate(item.route)}
              className="items-center gap-0.5 px-3 py-1.5 min-w-[56px] rounded-xl"
              activeOpacity={0.7}
            >
              <View className={isFocused ? 'bg-primary/10 p-1.5 rounded-xl' : 'p-1.5'}>
                <Icon
                  name={item.icon}
                  size={20}
                  color={isFocused ? '#1B5E3B' : '#7A8E86'}
                  strokeWidth={isFocused ? 2.5 : 1.5}
                />
              </View>
              <Text
                className={`text-[10px] font-tajawal ${isFocused ? 'font-bold text-primary' : 'font-medium text-muted-foreground'}`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default function AppNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Subjects" component={SubjectsScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Assignments" component={AssignmentsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
