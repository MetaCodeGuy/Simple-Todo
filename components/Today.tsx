import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import Task from './Task';
 
const Today = ({ todos = [], refreshTodos, ...props }) => {
  const [showCompleted, setShowCompleted] = useState<boolean>(true);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => todo.today && (showCompleted || !todo.completed));
  }, [todos, showCompleted]);

  const HandleShowCompleted = () => {
    setShowCompleted((prev) => !prev);
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          Today
        </ThemedText>
        <TouchableOpacity onPress={HandleShowCompleted}>
          <ThemedText type="link">
            {showCompleted ? 'Hide' : 'Show'} Completed
          </ThemedText>
        </TouchableOpacity>
      </View>

      {[...filteredTodos].reverse().map((todo) => (
        <Task
          key={todo.id}  // Always use a key for dynamic lists
          time={todo.time}
          task={todo.task}
          id={todo.id}
          refreshTodos={refreshTodos}
          completed={todo.completed}
        />
      ))}
    </ThemedView>
  );
};

export default Today;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:8
  },
  title: {
    // Additional styles for title
  },
});

