import { useEffect, useState } from "react";
import {TodoProvider} from './TodoContext/Index'
import "./App.css";
import {TodoItem,TodoForm} from "./components/index";

function App() {
  const [todos,setTodos] = useState([])
  const addTodo = (todo) =>{
    setTodos((prevTodo) => [{id:Date.now(),...todo},...prevTodo])
  }
  const updateTodo = (id,todo)=>{
    setTodos((prevTodo) => prevTodo.map((prev) =>(prev.id === id ? todo : prev )))
  }
  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id))
  }
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo)=>prevTodo.id === id ? {...prevTodo, completed : !prevTodo.completed}: prev ))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if(todos && todos.length > 0)
      setTodos(todos)
  },[])
  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))
  },[todos])
  return (
    <TodoProvider value={{todos,addTodo,updateTodo,deleteTodo,toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4"><TodoForm /></div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
