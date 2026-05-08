import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, TextInput, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useData } from '../context/DataContext';

export default function AssignmentsScreen() {
  const { assignments, subjects, addAssignment, updateAssignmentStatus } = useData();
  const [activeTab, setActiveTab] = useState('pending');
  const [modalVisible, setModalVisible] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    subject: '',
    dueDate: '',
    description: '',
    status: 'pending'
  });

  const filteredAssignments = assignments.filter(a => {
    if (activeTab === 'pending') return a.status === 'pending';
    if (activeTab === 'submitted') return a.status === 'submitted';
    if (activeTab === 'graded') return a.status === 'graded';
    return true;
  });

  const tabs = [
    { key: 'pending', label: 'معلقة' },
    { key: 'submitted', label: 'مسلّمة' },
    { key: 'graded', label: 'مقيّمة' }
  ];

  const handleSubmit = (id) => {
    updateAssignmentStatus(id, 'submitted');
  };

  const getIconConfig = (assignment) => {
    if (assignment.status === 'pending') {
      const isOverdue = new Date(assignment.dueDate) < new Date();
      if (isOverdue) {
        return { name: 'alert-circle', color: '#EF4444', bgColor: 'bg-destructive/10' };
      }
      return { name: 'clock', color: '#EA580C', bgColor: 'bg-orange-50' };
    }
    if (assignment.status === 'submitted') {
      return { name: 'check-circle', color: '#2563EB', bgColor: 'bg-blue-50' };
    }
    return { name: 'star', color: '#059669', bgColor: 'bg-emerald-50' };
  };

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.subject && newAssignment.dueDate) {
      addAssignment({
        ...newAssignment,
        id: Date.now().toString(),
        status: 'pending'
      });
      setModalVisible(false);
      setNewAssignment({ title: '', subject: '', dueDate: '', description: '', status: 'pending' });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="pb-24">
          {/* Header */}
          <View className="px-5 pt-12 pb-4 flex-row justify-between items-center">
            <Text className="font-tajawal text-2xl font-bold text-foreground">
              المهام والواجبات
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

          {/* Status Tabs */}
          <View className="px-5 mb-5">
            <View className="w-full bg-muted rounded-xl h-11 p-0.5 flex-row">
              {tabs.map((tab) => (
                <TouchableOpacity
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  className={`flex-1 rounded-lg items-center justify-center ${
                    activeTab === tab.key ? 'bg-card shadow-sm' : ''
                  }`}
                >
                  <Text className={`font-tajawal text-xs font-medium ${
                    activeTab === tab.key ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {tab.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Assignment Cards */}
          <View className="px-5 gap-3">
            {filteredAssignments.map(assignment => {
              const iconConfig = getIconConfig(assignment);
              return (
                <View key={assignment.id} className="bg-card rounded-2xl p-4 border border-border/50 shadow-sm">
                  <View className="flex-row items-start gap-3">
                    <View className={`w-10 h-10 rounded-xl ${iconConfig.bgColor} items-center justify-center`}>
                      <Icon name={iconConfig.name} size={20} color={iconConfig.color} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-tajawal text-base font-semibold text-foreground">
                        {assignment.title}
                      </Text>
                      <Text className="font-tajawal text-xs text-muted-foreground mt-0.5">
                        {assignment.subject}
                      </Text>
                      {assignment.description && (
                        <Text className="font-tajawal text-xs text-muted-foreground mt-1" numberOfLines={2}>
                          {assignment.description}
                        </Text>
                      )}
                      <View className="flex-row items-center gap-3 mt-2">
                        <View className="flex-row items-center gap-1">
                          <Icon name="clock" size={12} color="#7A8E86" />
                          <Text className="font-tajawal text-[10px] text-muted-foreground">
                            {new Date(assignment.dueDate).toLocaleDateString('ar-SA', { day: 'numeric', month: 'long' })}
                          </Text>
                        </View>
                        {assignment.grade && (
                          <Text className="font-tajawal text-[10px] font-bold text-emerald-600
