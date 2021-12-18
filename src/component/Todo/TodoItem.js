import React from "react";

const TodoItem = ({ completed, name, id, onTodoComplete }) => {
  return (
    <div className="toto-list">
      <input
        type="checkbox"
        onChange={(e) => onTodoComplete(e, id)}
        checked={completed}
      />

      <span className={completed ? "todo-completed" : "todo-incompleted"}>
        {name}
      </span>
    </div>
  );
};

export default TodoItem;
