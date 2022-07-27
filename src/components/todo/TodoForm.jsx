import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
const TodoForm = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [tempState, setTempState] = useState(false);
  let btnString = "اضافه";
  //handle edit btn
  if (props.mode === "edit") {
    btnString = "تعديل";
  }
  //handle edit form title
  if (props.mode === "edit" && !tempState) {
    setNewTitle(props.todos[0].title);
    setTempState(true);
  }

  const inputHandelar = (e) => {
    setNewTitle(e.target.value);
  };
  const handleWithClear = () => {
    let temp = newTitle;
    setNewTitle("");
    setTempState(false);
    return props.addTodo(temp);
  };
  return (
    <div className="todos-form">
      <div className="todos-form_icon" onClick={props.showUncompleteTodo}>
        <FeatherIcon icon="filter" strokeWidth=".5" />
      </div>
      <div className="todos-form_form">
        <input
          type="text"
          placeholder="...اضف مهمه جديده"
          value={newTitle}
          onChange={inputHandelar}
        />
      </div>
      <div className="todos-form_subit">
        <button
          className="btn"
          onClick={handleWithClear}
          disabled={newTitle.trim() ? false : true}
        >
          {btnString}
        </button>
      </div>
    </div>
  );
};

export default TodoForm;
