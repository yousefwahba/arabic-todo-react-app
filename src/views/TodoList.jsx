import React, { useState } from "react";
import TodoForm from "../components/todo/TodoForm";
import Todos from "../components/todo/Todos";
const TodoList = () => {
  // const inialState = [
  //   { id: 1, title: "المهمه الاولي", done: false },
  //   { id: 2, title: "المهمه الثانيه", done: true },
  //   { id: 3, title: "المهمه الثالثه", done: false },
  // ];

  //get data from ls
  const inialState = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  //store data in ls
  const setToLocal = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  const [todos, setTodos] = useState(inialState);
  const [mode, setmode] = useState("add");
  const [activeTodo, setActiveTodo] = useState({});
  const changeTodoCompletion = (id) => {
    //clone
    let curtodos = [...todos];
    //edit
    let newTodos = curtodos.map((el) => {
      if (el.id === id) el.done = !el.done;
      return el; //try to remove it letter
    });
    //set state
    setToLocal(newTodos);
    setTodos(newTodos);
  };
  //delete
  const deleteTodo = (id) => {
    //clone
    let currantTodos = [...todos];
    //edit
    let newState = currantTodos.filter((el) => id !== el.id);
    //set state
    setToLocal(newState);
    setTodos(newState);
  };

  //add new todo
  const addTodo = (title) => {
    if (mode !== "edit") {
      const nowTodos = [...todos];
      //edit
      let newTodo = { id: Date.now(), title: title, done: false };
      nowTodos.push(newTodo); //new update return (render)
      setToLocal(nowTodos);
      setTodos(nowTodos);
    } else {
      const newTodos = [...todos];
      let new_Todos = newTodos.map((el) => {
        if (el.id === activeTodo.id) {
          el.title = title;
        }
        return el;
      });
      setToLocal(new_Todos);
      setTodos(new_Todos);
      setmode("add");
    }
  };
  //filter
  const showUncompleteTodo = () => {
    if (mode === "add") setmode("not-done");
    else setmode("add");
  };
  let currantTodos = [...todos];
  if (mode === "not-done") {
    currantTodos = currantTodos.filter((todo) => !todo.done);
  }

  //edit
  const editTodo = (todo) => {
    setmode("edit");
    setActiveTodo(todo);
  };

  return (
    <div className="main">
      <div className="container">
        <div className="todos">
          <TodoForm
            addTodo={addTodo}
            showUncompleteTodo={showUncompleteTodo}
            todos={mode !== "edit" ? currantTodos : [activeTodo]}
            mode={mode}
          />
          <Todos
            todos={mode !== "edit" ? currantTodos : [activeTodo]}
            changeTodoCompletion={changeTodoCompletion}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
