import React, { useState } from "react";
import logo from "./todo-logo.png";
import "./App.css";

function App() {
  const { list, setList } = useState([]);
  const { newItem, setNewItem } = useState("");

  const addItem = (todoValue) => {
    newItem = {
      id: Date.now(),
      value: todoValue,
      isDone: false,
    };
    const newList = [...list];
    newList.push(newItem);
    setList(newList);
    setNewItem("");
  };

  const deleteItem = (id) => {
    const updatedList = list.filter((item) => item.id !== id);
    setList(updatedList);
  };

  return (
    <div className="App-header">
      <img src={logo} className="App-logo"></img>
      <h3>ToDo App</h3>
      <div className="container">
        <h5>Add items...</h5>
        <br />
        <input type="text" className="input-text" placeholder="Write a ToDo" />
        <button className="add-btn">Add</button>
        <div className="list">
          <ul>
            <li>
              <input type="checkbox" />
              Exercise
              <button className="btn btn-danger btn-sm">Delete</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
