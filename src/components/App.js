/* eslint-disable jsx-a11y/no-redundant-roles */

import React, { useState } from "react";
import nanoid from "nanoid";

import Form from "./Form";
import FilterButton from "./FilterButton";
import Todo from "./Todo";

const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};

function App(props) {
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState(props.tasks);

  const filterList = Object.keys(FILTER_MAP).map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
      <Todo
        {...task}
        checkTask={checkTask}
        deleteTask={deleteTask}
        editTask={editTask}
        key={task.id}
      />
    ));

  function addTask(name) {
    const newTask = { id: nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function checkTask(id) {
    const updatedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // invert the task's "completed" prop
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(updatedTaskList);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => task.id !== id);
    setTasks(remainingTasks);
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // reassign the task's name
        task.name = newName;
      }
      return task;
    });
    setTasks(editedTaskList);
  }
  const tasksNoun = taskList.length > 1 ? "tasks" : "task";
  const headingText = `${taskList.length} ${tasksNoun} remaining`;
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading">{headingText}</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
