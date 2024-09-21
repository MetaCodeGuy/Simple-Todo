import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Checkbox from 'expo-checkbox';
import React ,{useState} from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { putData } from '@/hooks/useStorage' // Ensure this is correctly imported
import { ThemedText } from './ThemedText'

const Task = ({ task, completed, time, id, refreshTodos }) => {
  const [Checked, setChecked] = useState(completed)
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

let PolishedTime = (formatAMPM(new Date(time)));




  const HandleUpdate = async (id) => {
    try {
      // Fetch the tasks
      const val = await AsyncStorage.getItem("@Todo");
      if (val) {
        let jsondata = JSON.parse(val);

        // Update the task's completed status
        const updatedTodos = jsondata.map((data) => {
          if (data.id === id) {
            return { ...data, completed: !data.completed }
          }
          return data; // Return the task unchanged if it doesn't match the ID
        });

        // Store the updated tasks
        await putData("@Todo", updatedTodos);

        // Update the local state to re-render the UI
        setChecked(prev => !prev);
        refreshTodos();
      }
    } catch (e) {
      console.error("Error updating task:", e);
    }
  }

  const DeleteTask = async (id) => {
    try {
      const val = await AsyncStorage.getItem("@Todo");
      if (val) {
        let jsondata = JSON.parse(val);

        // Filter out the task with the matching ID
        const filteredVal = jsondata.filter((data) => data.id !== id);

        // Save the updated list
        await putData("@Todo", filteredVal);

        // Trigger re-render in parent component
        refreshTodos();
      }
    } catch (e) {
      console.error("Error deleting task:", e);
    }
  }

  return (
    <TouchableOpacity 
      onLongPress={() => {
        // Deleting the task confirmation
        Alert.alert(
          'Delete Task',
          'Are you sure you want to delete this task?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              onPress: () => DeleteTask(id)
            }
          ],
          { cancelable: true }
        );
      }}
      style={styles.task}
    >
      <Checkbox
        value={Checked}
        color={'black'}
        onValueChange={() => HandleUpdate(id)}
      />
      <View style={styles.content}>
        <ThemedText type="default" style={[styles.taskName, Checked && styles.completed]}>
          {task}
        </ThemedText>
        <ThemedText style={styles.time} type="default">
          {PolishedTime} 
        </ThemedText>
      </View>
    </TouchableOpacity>
  )
}

export default Task

const styles = StyleSheet.create({
  task: {
    padding: 8,
    marginVertical: 4,
    flexDirection: "row",
    justifyContent: 'flex-start',  // Changed 'start' to 'flex-start'
    alignItems: 'center'
  },
  content: {
    flexDirection: 'column',
    paddingLeft: 16,
  },
  taskName: {
    paddingRight: 32
  },
  time: { 
    color: 'gray' 
  },
  completed: { 
    textDecorationLine: 'line-through', 
    color: 'gray' 
  }
});

