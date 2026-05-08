import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useData } from '../context/DataContext';

const ICON_OPTIONS = ['📐', '📖', '🔬', '🧮', '🌍', '🎨', '💻', '🏃', '📝', '🧪'];

export default function SubjectsScreen() {
  const { subjects, addSubject } = useData();
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState({
    name: '',
    teacher: '',
    icon: '📐',
    progress: 0,
    totalLessons: 0,
    completedLessons: 0
  });

  const cardColors = [
    'bg-[rgba(27,94,59,0.1)] border-[rgba(27,94,59,0.2)]',
    'bg-blue-50 border-blue-200',
    'bg-purple-50 border-purple-200',
    'bg-orange-50 border-orange-200',
    'bg-rose-50 border-rose-200',
    'bg-teal-50 border-teal-200',
  ];

  const handleAddSubject = () => {
    if (newSubject.name && newSubject.teacher) {
      addSubject({
        ...newSubject,
        id: Date.now().toString(),
        completedLessons: 0,
        totalLessons: 0,
        progress: 0
      });
      setModalVisible(false);
      setNewSubject({ name: '', teacher: '', icon: '📐', progress: 0, totalLessons: 0, completedLessons: 0 });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-24">
          {/* Header */}
          <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
            <Text className="font-tajawal text-2xl font-bold text-foreground">
              المواد الدراسية
            </Text>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              className="bg-primary rounded-xl px-3.5 py-2 h-9 flex-row items-center gap-1.5 shadow-md"
            >
              <Icon name="plus" size={16} color="#F7F4EF" strokeWidth={2} />
              <Text className="font-tajawal text-sm font-medium text-primary-foreground">
                إضافة
              </Text>
            </TouchableOpacity>
          </View>

          {/* Subjects List */}
          <View className="px-5 gap-3">
            {subjects.map((subject, index) => (
              <TouchableOpacity 
                key={subject.id} 
                className={`${cardColors[index % cardColors.length]} rounded-2xl p-4 border shadow-sm`}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center gap-3">
                  <Text className="text-2xl">{subject.icon}</Text>
                  <View className="flex-1">
                    <Text className="font-tajawal text-base font-bold text-foreground">
                      {subject.name}
                    </Text>
                    <View className="flex-row items-center gap-1.5 mt-1">
                      <Icon name="user" size={12} color="#7A8E86" />
                      <Text className="font-tajawal text-xs text-muted-foreground">
                        {subject.teacher}
                      </Text>
                    </View>
                  </View>
                  <Icon name="chevron-left" size={20} color="#7A8E86" />
                </View>
                <View className="mt-3">
                  <View className="flex-row justify-between mb-1.5">
                    <Text className="font-tajawal text-xs text-muted-foreground">
                      {subject.completedLessons} / {subject.totalLessons} درس
                    </Text>
                    <Text className="font-tajawal text-xs text-muted-foreground">
                      {subject.progress}%
                    </Text>
                  </View>
                  <View className="h-2 bg-white/60 rounded-full overflow-hidden">
                    <View 
                      className="h-2 bg-primary rounded-full"
                      style={{ width: `${subject.progress}%` }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Add Subject Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          className="flex-1 bg-black/80 justify-center items-center"
          onPress={() => setModalVisible(false)}
        >
          <Pressable className="w-[90vw] bg-card rounded-3xl p-6" onPress={(e) => e.stopPropagation()}>
            <Text className="font-tajawal text-lg font-bold text-foreground text-center mb-4">
              إضافة مادة جديدة
            </Text>

            {/* Icon Selector */}
            <View className="mb-4">
              <Text className="font-tajawal text-sm font-medium text-foreground mb-2">
                الأيقونة
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {ICON_OPTIONS.map((icon) => (
                  <TouchableOpacity
                    key={icon}
                    onPress={() => setNewSubject({ ...newSubject, icon })}
                    className={`w-10 h-10 rounded-xl border-2 items-center justify-center ${
                      newSubject.icon === icon 
                        ? 'border-primary bg-primary/10' 
                        : 'border-border'
                    }`}
                  >
                    <Text className="text-lg">{icon}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Subject Name */}
            <View className="mb-4">
              <Text className="font-tajawal text-sm font-medium text-foreground mb-1.5">
                اسم المادة
              </Text>
              <TextInput
                className="h-10 rounded-xl border border-border px-3 font-tajawal text-sm text-foreground"
                value={newSubject.name}
                onChangeText={(text) => setNewSubject({ ...newSubject, name: text })}
                placeholder="مثال: الرياضيات"
                placeholderTextColor="#7A8E86"
                textAlign="right"
              />
            </View>

            {/* Teacher Name */}
            <View className="mb-6">
              <Text className="font-tajawal text-sm font-medium text-foreground mb-1.5">
                اسم المعلم
              </Text>
              <TextInput
                className="h-10 rounded-xl border border-border px-3 font-tajawal text-sm text-foreground"
                value={newSubject.teacher}
                onChangeText={(text) => setNewSubject({ ...newSubject, teacher: text })}
                placeholder="مثال: أ. أحمد"
                placeholderTextColor="#7A8E86"
                textAlign="right"
              />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
              onPress={handleAddSubject}
              className="w-full bg-primary rounded-xl h-10 items-center justify-center"
            >
              <Text className="font-tajawal text-sm font-medium text-primary-foreground">
                إضافة المادة
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
