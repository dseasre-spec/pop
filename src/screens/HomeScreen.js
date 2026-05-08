import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useData } from '../context/DataContext';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const { user, subjects, assignments, stats } = useData();
  const { colors } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'صباح الخير ☀️';
    if (hour < 18) return 'مساء الخير 🌤️';
    return 'مساء الخير 🌙';
  };

  const upcomingAssignments = assignments
    .filter(a => a.status === 'pending')
    .slice(0, 3);

  return (
    <ScrollView className="flex-1 bg-background" showsVerticalScrollIndicator={false}>
      <View className="pb-24">
        {/* Welcome Header */}
        <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
          <View>
            <Text className="font-tajawal text-sm text-muted-foreground">
              {getGreeting()}
            </Text>
            <Text className="font-tajawal text-2xl font-bold text-foreground mt-0.5">
              {user?.full_name?.split(' ')[0] || 'Asre'}
            </Text>
          </View>
          <View className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-primary/20">
            <Image 
              source={require('../../assets/logo.png')}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>

        {/* Hero Banner */}
        <View className="px-5 mb-6">
          <LinearGradient
            colors={['#1B5E3B', 'rgba(27,94,59,0.8)']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            className="rounded-3xl p-5 relative overflow-hidden"
          >
            <View className="absolute -top-10 -left-10 w-32 h-32 bg-white/5 rounded-full" />
            <View className="absolute -bottom-10 -right-10 w-24 h-24 bg-white/5 rounded-full" />
            <View className="z-10">
              <Text className="font-tajawal text-sm text-primary-foreground/80">
                تعلّم · فكّر · اصنع المستقبل
              </Text>
              <Text className="font-tajawal text-xl font-bold text-primary-foreground mt-1">
                مرحباً بك في روافد
              </Text>
              <Text className="font-tajawal text-xs text-primary-foreground/70 mt-2 leading-5">
                منصتك الدراسية المتكاملة لتنظيم دروسك وواجباتك
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Quick Stats Grid */}
        <View className="px-5 mb-6">
          <View className="flex-row gap-3">
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
              <View className="w-9 h-9 rounded-xl bg-primary/10 mb-3 items-center justify-center">
                <Icon name="book-open" size={20} color="#1B5E3B" />
              </View>
              <Text className="font-tajawal text-2xl font-bold text-foreground">
                {stats.totalSubjects}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground mt-0.5">
                المواد
              </Text>
            </View>
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
              <View className="w-9 h-9 rounded-xl bg-orange-50 mb-3 items-center justify-center">
                <Icon name="clipboard" size={20} color="#EA580C" />
              </View>
              <Text className="font-tajawal text-2xl font-bold text-foreground">
                {stats.pendingAssignments}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground mt-0.5">
                واجبات معلقة
              </Text>
            </View>
          </View>
          <View className="flex-row gap-3 mt-3">
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
              <View className="w-9 h-9 rounded-xl bg-emerald-50 mb-3 items-center justify-center">
                <Icon name="award" size={20} color="#059669" />
              </View>
              <Text className="font-tajawal text-2xl font-bold text-foreground">
                {stats.completedAssignments}
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground mt-0.5">
                مكتملة
              </Text>
            </View>
            <View className="flex-1 bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
              <View className="w-9 h-9 rounded-xl bg-blue-50 mb-3 items-center justify-center">
                <Icon name="trending-up" size={20} color="#2563EB" />
              </View>
              <Text className="font-tajawal text-2xl font-bold text-foreground">
                {stats.averageGrade}%
              </Text>
              <Text className="font-tajawal text-[10px] text-muted-foreground mt-0.5">
                المعدل
              </Text>
            </View>
          </View>
        </View>

        {/* Subjects Section */}
        <View className="mb-6">
          <View className="px-5 mb-3 flex-row justify-between items-center">
            <Text className="font-tajawal text-lg font-bold text-foreground">
              المواد الدراسية
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="font-tajawal text-sm font-medium text-primary">
                عرض الكل
              </Text>
              <Icon name="chevron-left" size={16} color="#1B5E3B" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="px-5"
            contentContainerStyle={{ gap: 12 }}
          >
            {subjects.slice(0, 6).map((subject, index) => (
              <SubjectCard key={subject.id} subject={subject} index={index} />
            ))}
          </ScrollView>
        </View>

        {/* Upcoming Assignments */}
        <View className="px-5">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-tajawal text-lg font-bold text-foreground">
              الواجبات القادمة
            </Text>
            <TouchableOpacity className="flex-row items-center gap-1">
              <Text className="font-tajawal text-sm font-medium text-primary">
                عرض الكل
              </Text>
              <Icon name="chevron-left" size={16} color="#1B5E3B" />
            </TouchableOpacity>
          </View>
          <View className="gap-3">
            {upcomingAssignments.map(assignment => (
              <AssignmentCard key={assignment.id} assignment={assignment} />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const SubjectCard = ({ subject, index }) => {
  const iconColors = [
    'bg-primary/10', 'bg-blue-50', 'bg-purple-50', 'bg-orange-50', 'bg-rose-50', 'bg-teal-50'
  ];
  
  return (
    <View className="w-36 bg-card rounded-2xl p-4 border border-border/50 shadow-sm flex-shrink-0">
      <View className={`w-10 h-10 rounded-xl ${iconColors[index % iconColors.length]} items-center justify-center mb-3`}>
        <Text className="text-lg">{subject.icon}</Text>
      </View>
      <Text className="font-tajawal text-sm font-semibold text-foreground" numberOfLines={1}>
        {subject.name}
      </Text>
      <Text className="font-tajawal text-[10px] text-muted-foreground mt-1">
        {subject.teacher}
      </Text>
      <View className="mt-3">
        <View className="h-1.5 bg-muted rounded-full overflow-hidden">
          <View 
            className="h-1.5 bg-primary rounded-full"
            style={{ width: `${subject.progress}%` }}
          />
        </View>
        <Text className="font-tajawal text-[10px] text-muted-foreground mt-1">
          {subject.progress}% مكتمل
        </Text>
      </View>
    </View>
  );
};

const AssignmentCard = ({ assignment }) => {
  const isOverdue = new Date(assignment.dueDate) < new Date();
  const daysUntil = Math.ceil((new Date(assignment.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
  
  let daysText = '';
  if (daysUntil === 0) daysText = 'اليوم';
  else if (daysUntil === 1) daysText = 'غداً';
  else daysText = `${daysUntil} أيام`;

  return (
    <View className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <Text className="font-tajawal text-base font-semibold text-foreground">
            {assignment.title}
          </Text>
          <Text className="font-tajawal text-xs text-muted-foreground mt-1">
            {assignment.subject}
          </Text>
        </View>
        <View className={isOverdue ? 'bg-destructive/10 px-2.5 py-1 rounded-full flex-row items-center gap-1' : 'bg-muted px-2.5 py-1 rounded-full flex-row items-center gap-1'}>
          <Icon 
            name={isOverdue ? 'alert-circle' : 'clock'} 
            size={12} 
            color={isOverdue ? '#EF4444' : '#7A8E86'} 
          />
          <Text className={`font-tajawal text-[10px] font-medium ${isOverdue ? 'text-destructive' : 'text-muted-foreground'}`}>
            {isOverdue ? 'متأخر' : daysText}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center gap-1 mt-3">
        <Icon name="clock" size={12} color="#7A8E86" />
        <Text className="font-tajawal text-xs text-muted-foreground" dir="ltr">
          {new Date(assignment.dueDate).toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' })}
        </Text>
      </View>
    </View>
  );
};
