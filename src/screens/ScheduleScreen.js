import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useData } from '../context/DataContext';

const DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'];
const ACCENT_COLORS = ['#1B5E3B', '#3B82F6', '#8B5CF6', '#EA580C', '#14B8A6'];

export default function ScheduleScreen() {
  const { schedule } = useData();
  const [selectedDay, setSelectedDay] = useState(DAYS[0]);

  const todaySessions = schedule.filter(s => s.day === selectedDay);

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-24">
          {/* Header */}
          <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
            <Text className="font-tajawal text-2xl font-bold text-foreground">
              الجدول الدراسي
            </Text>
            <TouchableOpacity className="bg-primary rounded-xl px-3.5 py-2 h-9 flex-row items-center gap-1.5 shadow-md">
              <Icon name="plus" size={16} color="#F7F4EF" strokeWidth={2} />
              <Text className="font-tajawal text-sm font-medium text-primary-foreground">
                إضافة
              </Text>
            </TouchableOpacity>
          </View>

          {/* Day Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-5 mb-5"
            contentContainerStyle={{ gap: 8 }}
          >
            {DAYS.map((day) => (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDay(day)}
                className={`px-5 py-2.5 rounded-xl ${
                  selectedDay === day 
                    ? 'bg-primary shadow-md' 
                    : 'bg-card border border-border'
                }`}
              >
                <Text className={`font-tajawal text-sm font-medium ${
                  selectedDay === day ? 'text-primary-foreground' : 'text-muted-foreground'
                }`}>
                  {day}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Schedule Items */}
          <View className="px-5 gap-3">
            {todaySessions.length > 0 ? (
              todaySessions.map((session, index) => (
                <View 
                  key={session.id} 
                  className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm"
                  style={{ borderRightWidth: 4, borderRightColor: ACCENT_COLORS[index % ACCENT_COLORS.length] }}
                >
                  <View className="flex-row justify-between items-start">
                    <View>
                      <Text className="font-tajawal text-base font-bold text-foreground">
                        {session.subject}
                      </Text>
                      {session.teacher && (
                        <View className="flex-row items-center gap-1.5 mt-1.5">
                          <Icon name="user" size={12} color="#7A8E86" />
                          <Text className="font-tajawal text-xs text-muted-foreground">
                            {session.teacher}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View className="bg-primary/10 px-3 py-1.5 rounded-xl flex-row items-center gap-1.5">
                      <Icon name="clock" size={14} color="#1B5E3B" />
                      <Text className="font-tajawal text-xs font-medium text-primary" dir="ltr">
                        {session.startTime} - {session.endTime}
                      </Text>
                    </View>
                  </View>
                  {session.room && (
                    <View className="flex-row items-center gap-1.5 mt-3">
                      <Icon name="map-pin" size={12} color="#7A8E86" />
                      <Text className="font-tajawal text-xs text-muted-foreground">
                        {session.room}
                      </Text>
                    </View>
                  )}
                </View>
              ))
            ) : (
              <View className="items-center justify-center pt-16">
                <View className="w-16 h-16 bg-muted rounded-2xl items-center justify-center mb-4">
                  <Icon name="calendar" size={28} color="#7A8E86" />
                </View>
                <Text className="font-tajawal text-base font-medium text-muted-foreground">
                  لا توجد حصص في هذا اليوم
                </Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
