import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ThemedText } from './ThemedText'
import Task from './Task'
const Tomorrow = ({todos=[],refreshTodos}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <ThemedText
          type="title"
          style={styles.title}>
          Tomorrow
        </ThemedText>
 
      </View>
 {
todos.filter((todo)=>!todo.today?todo:null).map((todo)=>{
                      
                  return(
                      <Task
                       time={todo.time}
                       task={todo.task} 
                       id={todo.id}
                       refreshTodos={refreshTodos}
                   completed={todo.completed}  />
                  ) 
     })
      
 }
    </View>
  )
}

export default Tomorrow

const styles = StyleSheet.create({
  container: {
    padding: 16,
    minHeight:200
  },
  header: {
    flexDirection: 'row',
    marginBottom:8,
    justifyContent: 'space-between'
  },
  title: {

  }
})
