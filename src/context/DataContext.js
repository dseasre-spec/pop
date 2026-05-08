import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DataContext = createContext();

const INITIAL_DATA = {
  user: {
    id: '1',
    full_name: 'Asre Almutairi',
    email: 'asre@roafed.com'
  },
  subjects: [
    { id: '1', name: 'الرياضيات', teacher: 'أ. خالد', icon: '📐', progress: 75, totalLessons: 40, completedLessons: 30 },
    { id: '2', name: 'اللغة العربية', teacher: 'أ. نورا', icon: '📖', progress: 60, totalLessons: 35, completedLessons: 21 },
    { id: '3', name: 'العلوم', teacher: 'أ. منى', icon: '🔬', progress: 45, totalLessons: 38, completedLessons: 17 },
    { id: '4', name: 'اللغة الإنجليزية', teacher: 'أ. سارة', icon: '🌍', progress: 80, totalLessons: 30, completedLessons: 24 },
    { id: '5', name: 'الحاسب الآلي', teacher: 'أ. فهد', icon: '💻', progress: 30, totalLessons: 30, completedLessons: 9 },
    { id: '6', name: 'التربية الإسلامية', teacher: 'أ. عمر', icon: '📝', progress: 90, totalLessons: 20, completedLessons: 18 },
  ],
  assignments: [
    { id: '1', title: 'حل التمرين رقم 5', subject: 'الرياضيات', dueDate: '2024-12-20', description: 'حل جميع أسئلة التمرين رقم 5 من الكتاب المدرسي', status: 'pending', grade: null },
    { id: '2', title: 'تعبير عن الوطن', subject: 'اللغة العربية', dueDate: '2024-12-18', description: 'كتابة موضوع تعبير عن حب الوطن', status: 'pending', grade: null },
    { id: '3', title: 'تقرير عن البيئة', subject: 'العلوم', dueDate: '2024-12-15', description: 'إعداد تقرير عن البيئة وتلوثها', status: 'submitted', grade: null },
    { id: '4', title: 'اختبار قصير', subject: 'اللغة الإنجليزية', dueDate: '2024-12-10', description: 'اختبار في الوحدة الثالثة', status: 'graded', grade: 92 },
  ],
  schedule: [
    { id: '1', subject: 'الرياضيات', day: 'الأحد', startTime: '07:30', endTime: '08:15', teacher: 'أ. خالد', room: 'قاعة 1' },
    { id: '2', subject: 'اللغة العربية', day: 'الأحد', startTime: '08:15', endTime: '09:00', teacher: 'أ. نورا', room: 'قاعة 2' },
    { id: '3', subject: 'العلوم', day: 'الاثنين', startTime: '07:30', endTime: '08:15', teacher: 'أ. منى', room: 'مختبر العلوم' },
    { id: '4', subject: 'اللغة الإنجليزية', day: 'الثلاثاء', startTime: '08:15', endTime: '09:00', teacher: 'أ. سارة', room: 'قاعة 3' },
    { id: '5', subject: 'الحاسب الآلي', day: 'الأربعاء', startTime: '07:30', endTime: '08:15', teacher: 'أ. فهد', room: 'مختبر الحاسب' },
    { id: '6', subject: 'التربية الإسلامية', day: 'الخميس', startTime: '08:15', endTime: '09:00', teacher: 'أ. عمر', room: 'قاعة 1' },
  ]
};

export function DataProvider({ children }) {
  const [user, setUser] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('roafed_data');
      if (savedData) {
        const data = JSON.parse(savedData);
        setUser(data.user);
        setSubjects(data.subjects);
        setAssignments(data.assignments);
        setSchedule(data.schedule);
      } else {
        setUser(INITIAL_DATA.user);
        setSubjects(INITIAL_DATA.subjects);
        setAssignments(INITIAL_DATA.assignments);
        setSchedule(INITIAL_DATA.schedule);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newUser, newSubjects, newAssignments, newSchedule) => {
    try {
      const data = {
        user: newUser,
        subjects: newSubjects,
        assignments: newAssignments,
        schedule: newSchedule
      };
      await AsyncStorage.setItem('roafed_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const addSubject = (subject) => {
    const updatedSubjects = [...subjects, subject];
    setSubjects(updatedSubjects);
    saveData(user, updatedSubjects, assignments, schedule);
  };

  const updateSubjectProgress = (subjectId, completedLessons) => {
    const updatedSubjects = subjects.map(sub => {
      if (sub.id === subjectId) {
        const progress = Math.round((completedLessons / sub.totalLessons) * 100);
        return { ...sub, completedLessons, progress };
      }
      return sub;
    });
    setSubjects(updatedSubjects);
    saveData(user, updatedSubjects, assignments, schedule);
  };

  const addAssignment = (assignment) => {
    const updatedAssignments = [...assignments, assignment];
    setAssignments(updatedAssignments);
    saveData(user, subjects, updatedAssignments, schedule);
  };

  const updateAssignmentStatus = (assignmentId, status) => {
    const updatedAssignments = assignments.map(a => 
      a.id === assignmentId ? { ...a, status } : a
    );
    setAssignments(updatedAssignments);
    saveData(user, subjects, updatedAssignments, schedule);
  };

  const addScheduleItem = (item) => {
    const updatedSchedule = [...schedule, item];
    setSchedule(updatedSchedule);
    saveData(user, subjects, assignments, updatedSchedule);
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('roafed_data');
  };

  const stats = {
    totalSubjects: subjects.length,
    totalAssignments: assignments.length,
    pendingAssignments: assignments.filter(a => a.status === 'pending').length,
    completedAssignments: assignments.filter(a => a.status === 'graded').length,
    averageGrade: Math.round(assignments.filter(a => a.grade).reduce((sum, a) => sum + a.grade, 0) / assignments.filter(a => a.grade).length) || 0
  };

  return (
    <DataContext.Provider value={{
      user,
      subjects,
      assignments,
      schedule,
      stats,
      loading,
      addSubject,
      updateSubjectProgress,
      addAssignment,
      updateAssignmentStatus,
      addScheduleItem,
      logout
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
