import { getData, putData } from "@/hooks/useStorage";
import React, { createContext, useEffect, useState } from "react";

// TODO: read the local task and serve it 


export const TodoContext = createContext({})

// Create the provider component
const TodoProvider = ({ children }) => {
    const [Todo, setTodo] = useState({});
    
    useEffect(()=>{

      getData('@Todo').then((val)=>{
        console.log(val)
      })

    },[])

    // Add a new todo
    const addTodo = (todo) => {
      // store the new todo 
      getData("@Todo").then((val)=>{
        // store the new todos 
        const oldTodo  = JSON.parse(val);
        const Todos = [...oldTodo,{Todo}]
        putData('@Todo',Todos)
      })
    };
  
    
  
    return (
      <TodoContext.Provider value={{ todos, addTodo, removeTodo, toggleTodo }}>
        {children}
      </TodoContext.Provider>
    );
  };
  
  export { TodoContext, TodoProvider };