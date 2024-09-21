import React, { useState, useEffect } from 'react';
import { Modal, TextInput, ScrollView, Switch, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import ThemedButton from './ThemedButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getData, putData } from '@/hooks/useStorage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { schedulePushNotification } from '@/hooks/useNotification';

const ThemedModal = ({ ...props }) => {
  const [showTime, setShowTime] = useState(false);
  const [Todo, setTodo] = useState({});
  const [Remind, setRemind] = useState<boolean>(false);
  const [Time, setTime] = useState(new Date());
  const [Today, setToday] = useState<boolean>(true);

  // Handle time change for task scheduling
  const HandleTimeChange = (e: any, selectedTime: any) => {
    let time = selectedTime.toLocaleString().split(',')[1];
    setTime(selectedTime);
    setTodo(prev => ({ ...prev, time }));
    setShowTime(false);
  };

const formatAMPM = (date) => {
let hours = date.getHours();
let minutes = date.getMinutes();    
const ampm = hours >= 12 ? 'PM' : 'AM';

hours %= 12;
hours = hours || 12;    
minutes = minutes < 10 ? `0${minutes}` : minutes;

const strTime = `${hours}:${minutes} ${ampm}`;

return strTime;
};
  // Function to schedule notification
  const scheduleNotification = async (task: string, time: Date) => {
    const trigger = new Date(time);
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Reminder",
        body: `It's time to complete: ${task}`,
        sound: true,
      },
      trigger:{
        seconds:5
      },
    });
  };

  // Handle task submission
  const handleDone = async () => {
    if (!Todo?.task) {
      Alert.alert("Please fill in the task!");
    } else {
      try {
        const rawVal = await AsyncStorage.getItem('@Todo');
        let todoList = JSON.parse(rawVal) || [];

        // Add new task to the list
        const newTask = {
          ...Todo,
          id: new Date().getTime(),
          completed: false,
          remind: Remind,
          today: Today,
          time: Time,
        };
        todoList.push(newTask);

        await putData('@Todo', todoList);
        

        // If "Remind Me" is enabled, schedule the notification
        if (Remind) {
            console.log("Reminder is set!");
            
          await schedulePushNotification("Reminder",`It's Time to complete "${Todo.task}"`,Time)
        }

        // Update UI and close modal
        props.refreshTodos();
        props.setShowModal(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    const askNotificationPermission = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission not granted for notifications.');
      }
    };

    askNotificationPermission();
  }, []);

  return (
    <Modal
      transparent={true}
      visible={props.showModal}
      animationType="slide"
    >
      <ScrollView style={styles.wrapper}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <ThemedText type="title">Add a Task</ThemedText>
            <TouchableOpacity onPress={() => props.setShowModal(false)}>
              <ThemedText type="link">Cancel</ThemedText>
            </TouchableOpacity>
          </View>

          <View style={styles.taskinputs}>
            <View style={styles.input}>
              <ThemedText style={styles.inputLabel} type="default">Task</ThemedText>
              <TextInput
                onChangeText={(txt) => setTodo(prev => ({ ...prev, task: txt }))}
                placeholder="Enter your task"
                placeholderTextColor="gray"
                style={styles.textInput}
              />
            </View>

            <View style={styles.input}>
              <ThemedText type="default" style={styles.inputLabel}>Time</ThemedText>
              <TouchableOpacity onPress={() => setShowTime(true)}>
                <View style={styles.timeBtn}>
                  <ThemedText type="link">{formatAMPM(Time)}</ThemedText>
                </View>
              </TouchableOpacity>
            </View>
            {showTime && (
              <DateTimePicker
                mode={'time'}
                is24Hour={false}
                onChange={HandleTimeChange}
                value={Time}
              />
            )}

            <View style={styles.input}>
              <View style={styles.inputWithdes}>
                <ThemedText type="default" style={styles.inputLabel}>Today</ThemedText>
                <Text style={styles.description}>If disabled, task will be considered for tomorrow.</Text>
              </View>
              <Switch value={Today} onChange={() => setToday(prev => !prev)} />
            </View>

            <View style={styles.input}>
              <View style={styles.inputWithdes}>
                <ThemedText type="default" style={styles.inputLabel}>Remind Me</ThemedText>
                <Text style={styles.description}>You'll be alerted at the specified time!</Text>
              </View>
              <Switch value={Remind} onChange={() => setRemind(prev => !prev)} />
            </View>
          </View>

          <ThemedButton onPress={handleDone} title={"Done"} />
        </ThemedView>
      </ScrollView>
    </Modal>
  );
};

export default ThemedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    paddingTop: 32,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    elevation: 4,
    paddingBottom:32,
    paddingHorizontal: 16,
  },
  wrapper:{
    paddingBottom:32,
      
  },
  header: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: 'center',
  },
  taskinputs: {
    padding: 16,
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    marginVertical: 16,
  },
  inputWithdes: {
    flexDirection: 'column',
  },
  inputLabel: {
    fontSize: 22,
  },
  timeBtn: {
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#d4d4d4',
  },
  description: {
    color: "gray",
    maxWidth: 250,
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    color: 'gray',
    textAlign: 'center',
    maxWidth: 250,
    fontSize: 18,
  },
});
