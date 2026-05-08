import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useData } from '../context/DataContext';

export default function ProfileScreen() {
  const { user, stats, logout } = useData();

  const handleLogout = () => {
    Alert.alert(
      'تسجيل الخروج',
      'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
      [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تسجيل الخروج', onPress: logout, style: 'destructive' }
      ]
    );
  };

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="pb-24">
        {/* Header */}
        <View className="px-5 pt-12 pb-6">
          <Text className="font-tajawal text-2xl font-bold text-foreground">
            حسابي
          </Text>
        </View>

        {/* Profile Identity Card */}
        <View className="px-5 mb-6">
          <View className="bg-card rounded-3xl p-6 border border-border/50 shadow-sm items-center">
            <View className="w-20 h-20 rounded-full bg-primary/10 items-center justify-center mb-4">
              <Icon name="user" size={36} color="#1B5E3B" strokeWidth={1.5} />
            </View>
            <Text className="font-tajawal text-xl font-bold text-foreground">
              {user?.full_name || 'Asre Almutairi'}
            </Text>
            <View className="flex-row items-center justify-center gap-1.5 mt-2">
              <Icon name="mail" size={14} color="#7A8E86" />
              <Text className="font-tajawal text-sm text-muted-foreground">
                {user?.email || 'asre@roafed.com'}
              </Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="px-5 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm items-center">
              <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center mb-2">
                <Icon name="book-open" size={20} color="#1B5E3B" />
              </View>
              <Text className="font-tajawal text-xl font-bold text-foreground">
                {stats.totalSubjects}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground">
                المواد
              </Text>
            </View>
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm items-center">
              <View className="w-10 h-10 rounded-xl bg-blue-50 items-center justify-center mb-2">
                <Icon name="clipboard" size={20} color="#2563EB" />
              </View>
              <Text className="font-tajawal text-xl font-bold text-foreground">
                {stats.totalAssignments}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground">
                الواجبات
              </Text>
            </View>
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm items-center">
              <View className="w-10 h-10 rounded-xl bg-emerald-50 items-center justify-center mb-2">
                <Icon name="award" size={20} color="#059669" />
              </View>
              <Text className="font-tajawal text-xl font-bold text-foreground">
                {stats.completedAssignments}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground">
                المكتملة
              </Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="px-5 gap-2">
          <TouchableOpacity className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-muted items-center justify-center">
              <Icon name="settings" size={20} color="#7A8E86" />
            </View>
            <Text className="font-tajawal text-base font-medium text-foreground flex-1 text-right">
              الإعدادات
            </Text>
            <Icon name="chevron-left" size={20} color="#7A8E86" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleLogout}
            className="bg-card rounded-2xl p-4 border border-destructive/20 shadow-sm flex-row items-center gap-3"
          >
            <View className="w-10 h-10 rounded-xl bg-destructive/10 items-center justify-center">
              <Icon name="log-out" size={20} color="#EF4444" />
            </View>
            <Text className="font-tajawal text-base font-medium text-destructive flex-1 text-right">
              تسجيل الخروج
            </Text>
            <Icon name="chevron-left" size={20} color="rgba(239,68,68,0.4)" />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
