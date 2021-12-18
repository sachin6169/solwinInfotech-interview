import React, { useState } from "react";
import TodoItem from "./TodoItem";
import "./Todo.css";

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [mode, setMode] = useState("add");

  const onSubmitTodo = (e) => {
    e.preventDefault();
    if (mode === "add") {
      setTodos([
        ...todos,
        {
          completed: false,
          name: inputData,
          id: Date.now(),
        },
      ]);
      setInputData("");
    } else {
      setSearchText(inputData.trim());
    }
  };

  const getFilterTodos = () => {
    const filteredTodos =
      mode === "search" && searchText
        ? todos.filter(({ name }) => name.includes(searchText))
        : todos;
    if (filter === "completed") {
      return filteredTodos.filter(({ completed }) => completed);
    } else if (filter === "active") {
      return filteredTodos.filter(({ completed }) => !completed);
    } else {
      return filteredTodos;
    }
  };

  const onTodoComplete = (e, id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: e.target.checked };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const showAllTodos = () => {
    setFilter("all");
  };

  const showActiveTodos = () => {
    setFilter("active");
  };

  const showCompleteTodos = () => {
    setFilter("completed");
  };

  const onAddTodoClick = () => {
    setMode("add");
    setInputData("");
    setSearchText("");
  };

  const onSearchClick = () => {
    setMode("search");
    setInputData("");
    setSearchText("");
  };

  return (
    <div className="main_div">
      <div className="todo_div">
        <header>
          <h1>THINGS TO DO</h1>
        </header>
        <div className="todo-main-content-wrapper">
          <form onSubmit={onSubmitTodo}>
            <input
              type="text"
              placeholder={mode === "add" ? "Add New" : "Search todo"}
              className="text_box"
              value={inputData}
              onChange={(e) => {
                setInputData(e.target.value);
              }}
            />
          </form>

          {getFilterTodos().map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                onTodoComplete={onTodoComplete}
              />
            );
          })}
        </div>
        <footer className="footer_section">
          <div>
            <span className="todo-icons-wrapper">
              <i
                onClick={onAddTodoClick}
                className="fa fa-plus icon-padded"
              ></i>
              <i
                onClick={onSearchClick}
                className="fa fa-search icon-padded footer_section-search-btn"
              ></i>
            </span>

            <span>{getFilterTodos().length} items left</span>
          </div>

          <div>
            <button className="footer-btn" onClick={showAllTodos}>
              All
            </button>
            <button className="footer-btn" onClick={showActiveTodos}>
              Active
            </button>
            <button className="footer-btn" onClick={showCompleteTodos}>
              Completed
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Todo;
